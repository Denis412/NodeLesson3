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
import { provide, ref } from "vue";

import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import MainFooter from "src/components/MainFooter.vue";

const leftDrawerOpen = ref(false);
const currentChat = ref(1);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleChat = (chatId) => {
  currentChat.value = chatId;
};

provide("currentChat", currentChat);
provide("toggleLeftDrawer", toggleLeftDrawer);
</script>
