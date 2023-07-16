<template>
  <q-list>
    <!-- <pre>{{ messages }}</pre> -->
    <div v-for="message in messages">
      <message-item :message="message" />
    </div>
  </q-list>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import socket from "src/lib/socketIO";

import MessageItem from "./MessageItem.vue";

const chatStore = inject("chatStore");
const messages = ref([]);

onMounted(() => {
  socket.on("history", (data) => {
    messages.value = data;
    console.log("his", data);
  });
});
</script>

<style scoped lang="scss"></style>
