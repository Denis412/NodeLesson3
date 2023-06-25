<template>
  <q-list>
    <div v-for="message in messages">
      <message-item :message="message" />
    </div>
  </q-list>
</template>

<script setup>
import { inject } from "vue";
import socket from "src/lib/socketIO";

import MessageItem from "./MessageItem.vue";

const chatStore = inject("chatStore");
const messages = chatStore.getCurrentMessages();

socket.on("sendedMessage", (data) => {
  console.log("hi", data);
  chatStore.pushSendingMessages(data);
});
</script>

<style scoped lang="scss"></style>
