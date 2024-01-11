<template>
  <div style="width: 50%">
    <div class="title-line"></div>
    <h2 class="conversation-title">{{ conversation.titre }}</h2>
    <div class="title-line"></div>


    <div  class="box" v-for="(message, index) in messages" :key="index" >
      <div v-if="message.id_sender === getCurrentUser.id_user" class="message-container-own">
        <div class="message-header">
          <p>{{ message.name }} - {{ message.email }}</p>
        </div>
        <div class="message-body">
          <p style="word-wrap: break-word; max-width: 100%;">{{ message.message }}</p>
        </div>
        <div class="message-footer">
          <p>{{ message.temps_emmission }}</p>
        </div>
      </div>

      <div v-else class="message-container">
        <div class="message-header">
          <p>{{ message.name }} - {{ message.email }}</p>
        </div>
        <div class="message-body">
          <p style="word-wrap: break-word; max-width: 100%;">{{ message.message }}</p>
        </div>
        <div class="message-footer">
          <p>{{ message.temps_emmission }}</p>
        </div>
      </div>

    </div>


    <div class="mb-3">
      <textarea class="form-control" maxlength="1024" v-model="newMessage" name="newMessage" id="newMessage" rows="3" :placeholder="translate('conversationMessages_5')"></textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="send">{{translate("conversationMessages_6")}}</button>

  </div>
</template>

<script>
import {getMessagesByConversation, sendMessage} from "@/services/messagerie.service";
import {mapGetters} from "vuex";
import {translate} from "@/lang/translationService";


export default {
  props: ['selected_conversation'],
  data() {
    return {
      newMessage:'',
      conversation: {},
      messages: [],
    };
  },
  computed:{
    ...mapGetters('user', ['getCurrentUser'])
  },
  methods:{
    translate,
    async send() {
      const body = {
        id_conversation : this.conversation.id_conversation,
        session_id : this.getCurrentUser['session_id'],
        message : this.newMessage
      }
      let response = await sendMessage(body)
      this.messages.push(response);
      console.log(response)
      this.newMessage='';
    },

  },
  async mounted() {
    this.conversation = this.$route.params.selected_conversation;
    this.messages = await getMessagesByConversation(this.conversation.id_conversation);

  },
};
</script>

<style scoped>
.message-container {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid yellow;
  border-radius: 5px;
}
.message-container-own {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid green;
  border-radius: 5px;
}

.message-header {
  font-weight: bold;
}

.message-body {
  margin-top: 5px;
  margin-bottom: 10px;
}

.message-footer {
  font-size: 12px;
  color: rgb(128, 128, 128);
}
 .title-line {
   border-top: 2px solid rgb(128, 128, 128);
   width: 100%;
   margin: 10px 0;
 }

.conversation-title {
  text-align: center;
  margin: 10px 0;
}
</style>
