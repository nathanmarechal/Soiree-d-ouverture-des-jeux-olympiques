<template>
  <div class="main" v-if="currentUserHasRight('messages_user')">
    <conversation-messages></conversation-messages>
  </div>
  <div v-else>
    {{ error404() }}
  </div>
</template>

<script>

import ConversationMessages from "@/components/Messagerie/conversation-messages.vue";
import {currentUserHasRight} from "@/droits/droitUtil";

export default {
  data() {
    return {
      conversation : {},
    };
  },
  components: {
    ConversationMessages,
  },
  methods: {
    currentUserHasRight,
    error404() {
      this.$router.push("/404");
    }
  },
  async mounted() {
    this.conversation = this.$route.params.selected_conversation;
  }
}

</script>

<style scoped>
.main{
  display: flex;

  justify-content: center;
  margin-top: 15vh;
  margin-bottom: 5vh;
}
</style>