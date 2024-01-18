<template>
  <div class="user-list">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>{{translate("conversationsList_titre")}}</th>
        <th>{{translate("conversationsList_email")}}</th>
        <th>{{translate("conversationsList_nbMessages")}}</th>
        <th>{{translate("conversationsList_resolu")}}</th>
        <th>{{translate("conversationsList_actions")}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conversation, index) in getConversations" :key="index">
        <td>{{ conversation.titre }}</td>
        <td>{{ conversation.email_creator }}</td>
        <td style="text-align: center">{{ conversation.nb_messages }}</td>
        <td>{{ conversation.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesAdminConversation', params: { selected_conversation: conversation } }" class="btn btn-primary">{{translate("conversationsList_voir")}}</router-link>
          <button v-if="!conversation.resolu" class="btn btn-danger" @click="toggleResolved(conversation.id_conversation)">{{translate("conversationsList_marquerResolu")}}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {toggleResolvedConversation} from "@/services/messagerie.service";
import {translate} from "@/lang/translationService";

export default({
  computed: {
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('messagerie', ['getConversations'])
  },

  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },

  methods: {
    ...mapActions('messagerie', ['getConversationsAdminStore']),
    async loadData() {
      try {
        if (this.getConversations.length === 0) {
          await this.getConversationsAdminStore();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async toggleResolved(id_conversation) {
      let body = {id_conversation: id_conversation}
      await toggleResolvedConversation(body, this.getCurrentUser.session_id);
      this.updateLocalConversationStatus(id_conversation);
    },
    translate,
    updateLocalConversationStatus(id_conversation) {
      const conversation = this.getConversations.find(conversation => conversation.id_conversation === id_conversation);
      if (conversation) {
        conversation.resolu = !conversation.resolu;
      }
    }
  }
})
</script>

<style scoped>

</style>