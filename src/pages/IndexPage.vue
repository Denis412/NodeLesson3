<template>
  <q-page class="main-page">
    <socket-chat :id="currentChat" />
  </q-page>
</template>

<script setup>
import { inject, onMounted } from "vue";
import socket from "src/lib/socketIO";

import SocketChat from "src/components/SocketChat.vue";

const currentChat = inject("currentChat");

onMounted(() => {
  socket.on("ping", (arg) => {
    console.log("ping", arg);
  });
});
</script>

<style scoped lang="scss">
.main-page {
  position: relative;
  min-height: 100vh;
}
</style>
