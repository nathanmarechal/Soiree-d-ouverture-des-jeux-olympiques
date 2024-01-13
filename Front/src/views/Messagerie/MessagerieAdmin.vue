<template>
  <div>
    <div v-if="currentUserHasRight('messages_admin')" class="main">
      <conversations-list></conversations-list>
    </div>
    <div v-else>
      {{ error404() }}
    </div>
  </div>
</template>

<script>
import {currentUserHasRight} from "@/droits/droitUtil";
import ConversationsList from "@/components/Messagerie/conversations-list-admin.vue";
import {translate} from "@/lang/translationService";

export default {
  components: {
    ConversationsList,
  },
  methods: {
    currentUserHasRight,
    translate,
    error404() {
      this.$router.push("/404");
    },
  }
}
</script>

<style scoped>
.main{
  margin-top: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>