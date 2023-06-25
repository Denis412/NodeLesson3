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
import { ref } from "vue";
import socket from "src/lib/socketIO";

const message = ref("");

const sendMessage = () => {
  socket.emit("message", message.value);
};
</script>

<style scoped lang="scss">
.main-footer {
  background-color: #fff;
}
</style>
