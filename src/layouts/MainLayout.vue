<template>
  <q-layout view="hHh Lpr lFf">
    <main-header />
    <main-drawer
      v-model="leftDrawerOpen"
      @toggle-chat="toggleChat"
      :rooms="rooms"
    />

    <q-page-container>
      <router-view />
    </q-page-container>

    <main-footer />
  </q-layout>
</template>

<script setup>
import { onMounted, provide, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import { useChatStore } from "src/stores/chat";
import { topNegativeNotify } from "src/helpers/notifications";

import socket from "src/lib/socketIO";

import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import MainFooter from "src/components/MainFooter.vue";

const chatStore = useChatStore();
const leftDrawerOpen = ref(false);
const currentChat = ref(1);
const rooms = ref([]);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleChat = (chatId) => (currentChat.value = chatId);

provide("chatStore", chatStore);
provide("currentChat", currentChat);
provide("toggleLeftDrawer", toggleLeftDrawer);

onMounted(() => {
  socket.on("get-rooms", (data) => {
    console.log("data", data);
    rooms.value = data;
  });

  socket.on("rooms_list_changed", (data) => {
    rooms.value.push(data);
  });
});
</script>
