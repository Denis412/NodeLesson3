<template>
  <q-drawer show-if-above bordered>
    <q-list>
      <q-item-label header class="text-h5 text-center">
        Список чатов
      </q-item-label>

      <socket-chat-link
        v-for="n in 5"
        :id="n"
        name="чат"
        @select="toggleChat"
        :selected="chatStore.getCurrentChat()"
      />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { inject } from "vue";
import SocketChatLink from "src/components/SocketChatLink.vue";

const chatStore = inject("chatStore");
const emit = defineEmits(["toggleChat"]);

const toggleChat = (chatId) => {
  emit("toggleChat", chatId);
};
</script>

<style scoped lang="scss"></style>
