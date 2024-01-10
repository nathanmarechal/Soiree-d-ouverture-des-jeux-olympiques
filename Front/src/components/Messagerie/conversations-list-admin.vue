<template>
  <div class="user-list">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>Titre de la conversation</th>
        <th>Email du créateur</th>
        <th>Nombre de messages</th>
        <th>Résolu</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conversation, index) in getConversations" :key="index">
        <td>{{ conversation.titre }}</td>
        <td>{{ conversation.email_creator }}</td>
        <td style="text-align: center">{{ conversation.nb_messages }}</td>
        <td>{{ conversation.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesAdminConversation', params: { selected_conversation: conversation } }" class="btn btn-primary">Voir</router-link>
          <button v-if="!conversation.resolu" class="btn btn-danger" @click="toggleResolved(conversation.id_conversation)">Marquer résolu</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {toggleResolvedConversation} from "@/services/messagerie.service";

export default({
  computed: {
    ...mapGetters(['getConversations','getCurrentUser'])
  },

  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },

  methods: {
    ...mapActions(['getConversationsAdminStore']),
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