import { defineStore } from "pinia";
import { computed, ref } from "vue";

import socket from "src/lib/socketIO";

export const useChatStore = defineStore("chat", () => {
  const currentUserId = ref(null);

  const currentChat = ref(1);
  const sendingMessages = ref([]);
  const sendedMessages = ref({});
  const currentMessages = computed(() =>
    sendedMessages.value[currentChat.value]
      ?.map((message) => ({
        message: message.message,
        sender_id: message.sender_id,
      }))
      .filter((message) => message.message)
  );

  const pushSendingMessages = (message, is_server) => {
    if (!message.message && !message) return;

    console.log("message", message);
    if (is_server) {
      socket.emit("message", {
        message,
        sender_id: currentUserId.value,
        room_id: currentChat.value,
      });
    }

    if (!sendedMessages.value[`${currentChat.value}`])
      sendedMessages.value[`${currentChat.value}`] = [];

    sendedMessages.value[`${currentChat.value}`].push({
      message: message.message,
      sender_id: message.sender_id,
      room_id: currentChat.value,
    });
  };

  const selectChat = (chatId) => {
    socket.emit("roomDisconnect", currentChat.value);

    currentChat.value = chatId;

    socket.emit("roomConnect", chatId);
  };

  const setUserId = (id) => {
    currentUserId.value = id;
  };

  const getUserID = () => currentUserId;
  const getCurrentChat = () => currentChat;
  const getSendingMessages = () => sendingMessages;
  const getSendedeMessages = () => sendedMessages;
  const getCurrentMessages = () => {
    return currentMessages;
  };

  function $reset() {
    currentChat.value = 0;
    sendingMessages.value = [];
  }

  return {
    currentChat,
    sendingMessages,
    pushSendingMessages,
    selectChat,
    setUserId,
    getCurrentChat,
    getSendingMessages,
    getSendedeMessages,
    getCurrentMessages,
    getUserID,
    $reset,
  };
});
