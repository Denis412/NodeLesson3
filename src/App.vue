<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

socket.on("connected", (arg) => {
  console.log(arg);
});
</script>
