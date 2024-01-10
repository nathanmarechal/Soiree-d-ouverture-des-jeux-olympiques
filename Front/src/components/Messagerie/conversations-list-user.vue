<template>
  <div class="user-list">
    <table>
      <thead>
      <tr>
        <th>titre de la conversation</th>
        <th>nombre de messages</th>
        <th>résolu</th>
        <th>actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(conversation, index) in getConversations" :key="index">
        <td>{{ conversation.titre }}</td>
        <td style="text-align: center">{{ conversation.nb_messages }}</td>
        <td>{{ conversation.resolu }}</td>
        <td>
          <router-link :to="{ name: 'MessagesConversationUser', params: { selected_conversation: conversation } }" class="btn btn-primary">voir</router-link>
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
    ...mapGetters(['getConversations','getCurrentUser'])
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