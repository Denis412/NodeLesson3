<template>
  <q-page class="flex flex-center">
    <q-input outlined v-model="message" placeholder="Введите сообщение">
      <template #append>
        <q-icon name="send" class="cursor-pointer" @click="sendMessage" />
      </template>
    </q-input>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const message = ref("");

const sendMessage = () => {
  socket.emit("message", message.value);
};
</script>
