<template>
  <div class="user-list">
    <table>
      <thead>
      <tr>
        <th>titre de la conversation</th>
        <th>email du créateur</th>
        <th>nombre de messages</th>
        <th>résolu</th>
        <th>actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conversation, index) in getConversations" :key="index">
        <td>{{ conversation.titre }}</td>
        <td>{{ conversation.email_creator }}</td>
        <td style="text-align: center">{{ conversation.nb_messages }}</td>
        <td>{{ conversation.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesAdminConversation', params: { selected_conversation: conversation } }" class="btn btn-primary">voir</router-link>
          <button class="red-button" @click="toggleResolved(conversation.id_conversation)">marquer résolu</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>


import {mapActions, mapGetters} from "vuex";

export default({
  computed: {
    ...mapGetters(['getConversations'])
  },

  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },

  methods:{
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
    async toggleResolved(id_conversation)
    {
      console.log("toggling "+id_conversation+" resolved.")
    }
  }
})

</script>

<style scoped>

</style>