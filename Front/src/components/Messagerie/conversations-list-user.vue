<template>
  <div class="user-list">

    <div class="create-conversation-form">
      <input type="text" v-model="newConversationMessage" placeholder="Entrez le message de la conversation" class="form-control">
      <button @click="createConversation" class="btn btn-success">Créer Conversation</button>
    </div>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>Titre de la conversation</th>
        <th>Nombre de messages</th>
        <th>Résolu</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conv, index) in conversation" :key="index">
        <td>{{ conv.titre }}</td>
        <td style="text-align: center">{{ conv.nb_messages }}</td>
        <td>{{ conv.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesConversationUser', params: { selected_conversation: conv } }" class="btn btn-primary">Voir</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>


import {mapActions, mapGetters} from "vuex";
import {createConversation} from "@/services/messagerie.service";

export default({
  computed: {
    ...mapGetters(['getConversations','getCurrentUser'])
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
    ...mapActions(['getConversationsUserStore']),
    async loadData() {
      try {
        if (this.getConversations.length === 0) {
          await this.getConversationsUserStore();
          this.conversation =this.getConversations;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async createConversation() {
      try {
        const body = {
          message: this.newConversationMessage,
          id_user: this.getCurrentUser.id_user
        };

        let response = await createConversation(body);
        console.log(response);

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
  margin-bottom: 20px;
}

.create-conversation-form input {
  margin-right: 10px;
}
</style>