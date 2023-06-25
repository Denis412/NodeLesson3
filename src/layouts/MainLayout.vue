<template>
  <q-layout view="hHh Lpr lFf">
    <main-header />
    <main-drawer v-model="leftDrawerOpen" @toggle-chat="toggleChat" />

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

import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import MainFooter from "src/components/MainFooter.vue";

const chatStore = useChatStore();
const leftDrawerOpen = ref(false);
const currentChat = ref(1);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleChat = (chatId) => {
  currentChat.value = chatId;

  chatStore.selectChat(chatId);
};

provide("chatStore", chatStore);
provide("currentChat", currentChat);
provide("toggleLeftDrawer", toggleLeftDrawer);

onMounted(() => {
  chatStore.setUserId(uuidv4());
});
</script>
