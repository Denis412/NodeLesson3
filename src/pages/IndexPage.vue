<template>
  <q-page class="main-page">
    <socket-chat />
  </q-page>
</template>

<script setup>
import SocketChat from "src/components/SocketChat.vue";
</script>

<style scoped lang="scss">
.main-page {
  position: relative;
  min-height: 100vh;
}
</style>
