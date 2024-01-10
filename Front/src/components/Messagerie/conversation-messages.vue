<template>
  <div>
    <h2>Conversation {{ conversation.titre }}</h2>

    <table class="table">
      <thead>
      <tr>
        <th>{{translate("conversationMessages_1")}}</th>
        <th>{{translate("conversationMessages_2")}}</th>
        <th>{{translate("conversationMessages_3")}}</th>
        <th>{{translate("conversationMessages_4")}}</th>
        <th>{{translate("conversationMessages_5")}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(message, index) in messages" :key="index">
        <td>{{ message.id_sender }}</td>
        <td>{{ message.message }}</td>
        <td>{{ message.temps_emmission }}</td>
        <td>{{ message.name }}</td>
        <td>{{ message.email }}</td>
      </tr>
      </tbody>
    </table>

    <div class="mb-3">
      <textarea class="form-control" v-model="newMessage" name="newMessage" id="newMessage" rows="3" :placeholder="translate('conversationMessages_5')"></textarea>
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
    ...mapGetters(['getCurrentUser'])
  },
  methods:{
    translate,
    async send() {
      console.log("dans le send mon petit thomas")
      const body = {
        id_conversation : this.conversation.id_conversation,
        id_user : this.getCurrentUser.id_user,
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
/* Add any custom styles here if needed */
</style>
