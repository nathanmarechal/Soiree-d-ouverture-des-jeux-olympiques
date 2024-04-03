<template>
  <div class="container py-4">
    <div class="mb-4">
      <h2 class="text-center">{{ conversation.titre }}</h2>
      <h4 class="text-center text-muted">{{ conversation.email_creator }}</h4>
    </div>

    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="card mb-3" :class="{'border-success': message.id_sender === getCurrentUser.id_user, 'border-warning': message.id_sender !== getCurrentUser.id_user}">
        <div class="card-header text-primary">
          {{ message.name }} - {{ message.email }}
        </div>
        <div class="card-body">
          <p class="card-text" style="word-wrap: break-word;">{{ message.message }}</p>
        </div>
        <div class="card-footer text-muted">
          {{ message.temps_emmission }}
        </div>
      </div>
    </div>

    <div class="input-group mb-3">
      <textarea class="form-control" maxlength="1024" v-model="newMessage" name="newMessage" id="newMessage" rows="3" placeholder="Type your message here..." aria-label="New message"></textarea>
      <button class="btn btn-outline-secondary" type="button" id="button-addonEmoji" data-bs-toggle="dropdown" aria-expanded="false">
        😊
      </button>
      <ul class="dropdown-menu dropdown-menu-end p-2" style="width: 300px;" aria-labelledby="button-addonEmoji">
        <emoji-picker class="emoji-picker" @emoji-click="addEmoji"></emoji-picker>
      </ul>
      <button class="btn btn-primary" type="button" @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import { connectSocket, sendMessageSocket, onMessageReceived, disconnectSocket } from "@/services/socket.service";
import { getMessagesByConversation,sendMessage } from "@/services/messagerie.service";
import { mapGetters } from "vuex";
import { translate } from "@/lang/translationService";

import { EmojiPickerElement } from 'emoji-picker-element';


export default {
  props: ['selected_conversation'],
  data() {
    return {
      newMessage: '',
      conversation: {},
      messages: [],
    };
  },
  components: {
    EmojiPicker: EmojiPickerElement
  },

  computed: {
    ...mapGetters('user', ['getCurrentUser'])
  },
  methods: {
    addEmoji(event) {
      this.newMessage += event.detail.unicode;
    },

    translate,
    async send() {
      const body = {
        id_conversation: this.conversation.id_conversation,
        message: this.newMessage

      };
      let response = await sendMessage(body); // Assurez-vous que cela correspond à l'appel API pour envoyer un message
      await sendMessageSocket(response);
      this.newMessage = '';
    },
  },
  async mounted() {
    this.conversation = this.$route.params.selected_conversation;
    this.messages = await getMessagesByConversation(this.conversation.id_conversation);

    connectSocket();

    onMessageReceived((newMessage) => {
      this.messages.push(newMessage);
    });
  },
  beforeDestroy() {
    disconnectSocket();
  }
};
</script>
