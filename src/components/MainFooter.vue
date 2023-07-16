<template>
  <q-footer class="main-footer">
    <q-input
      outlined
      v-model="message"
      placeholder="Введите сообщение"
      class="sender-input"
    >
      <template #append>
        <q-icon name="send" class="cursor-pointer" @click="sendMessage" />
      </template>
    </q-input>
  </q-footer>
</template>

<script setup>
import { ref, inject } from "vue";

import socket from "src/lib/socketIO";

const currentChat = inject("currentChat");
const message = ref("");

const sendMessage = () => {
  // chatStore.pushSendingMessages(message.value, true);

  console.log("m", {
    room_id: currentChat.value,
    name: "Denis",
    message: message.value,
  });
  socket.emit("message", {
    room_id: currentChat.value,
    name: "Denis",
    message: message.value,
  });
};
</script>

<style scoped lang="scss">
.main-footer {
  background-color: #fff;
}
</style>
