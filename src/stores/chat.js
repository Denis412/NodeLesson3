import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    currentChat: 1,
  }),

  getters: {
    getCurrentChat() {
      return this.currentChat;
    },
  },

  actions: {
    connectSocketChat() {},

    selectChat(chatId) {
      this.currentChat = chatId;
    },
  },
});
