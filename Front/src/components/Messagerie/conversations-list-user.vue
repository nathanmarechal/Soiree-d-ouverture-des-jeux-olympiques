<template>
  <div class="user-list">

    <div class="create-conversation-form">
      <input type="text" v-model="newConversationMessage" :placeholder="translate('conversationsList_creerConvoPlaceholder')" class="form-control">
      <button @click="createConversation" class="btn btn-success">{{translate("conversationsList_creerConvo")}}</button>
    </div>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>{{ translate("conversationsList_titre") }}</th>
        <th>{{ translate("conversationsList_nbMessages") }}</th>
        <th>{{ translate("conversationsList_resolu") }}</th>
        <th>{{ translate("conversationsList_actions") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conv, index) in conversation" :key="index">
        <td>{{ conv.titre }}</td>
        <td style="text-align: center">{{ conv.nb_messages }}</td>
        <td>{{ conv.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesConversationUser', params: { selected_conversation: conv } }" class="btn btn-primary">
            {{ translate("conversationsList_voir") }}</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>


import {mapActions, mapGetters} from "vuex";
import {createConversation} from "@/services/messagerie.service";
import {translate} from "@/lang/translationService";

export default({
  computed: {
    //...mapGetters(['getConversations','getCurrentUser']),
    ...mapGetters('messagerie', ['getConversations']),
    ...mapGetters('user', ['getCurrentUser'])
  },
  data() {
    return {
      newConversationMessage: '',
      conversation: [] // Initialisez comme un tableau vide
    };
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },

  methods:{
    //...mapActions(['getConversationsUserStore']),
    ...mapActions('messagerie', ['getConversationsUserStore']),
    async loadData() {
      try {
          await this.getConversationsUserStore();
          this.conversation =this.getConversations;
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    translate,
    async createConversation() {
      try {
        const body = {
          message: this.newConversationMessage,
        };

        let response = await createConversation(body, this.getCurrentUser.session_id);

        // Vérifiez si la réponse contient des données et extrayez la conversation de la réponse
        if (response && response.length > 0) {
          this.conversation.push(response[0]);
        }

        this.newConversationMessage = '';
      } catch (error) {
        console.error('Erreur lors de la création de la conversation :', error);
      }
    }

  }
})

</script>

<style scoped>
.create-conversation-form {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.create-conversation-form input {
  margin-right: 10px;
}
</style>