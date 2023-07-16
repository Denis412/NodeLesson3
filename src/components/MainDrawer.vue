<template>
  <q-drawer show-if-above bordered>
    <q-list>
      <q-item-label header class="text-h5 text-center">
        Список чатов
      </q-item-label>

      <socket-chat-link
        v-for="room in rooms"
        :id="room.id"
        :name="room.name"
        @select="toggleChat"
        :selected="chatStore.getCurrentChat()"
      />

      <div class="controls__wrapper">
        <q-input v-model="chatName" placeholder="Введите название" />
        <q-btn
          class="btn"
          no-caps
          flat
          label="Создать чат"
          @click="createRoom"
        />
      </div>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import SocketChatLink from "src/components/SocketChatLink.vue";
import socket from "src/lib/socketIO";

const { rooms } = defineProps({
  rooms: Array,
});

const currentChat = ref(1);
const chatName = ref("");
const chatStore = inject("chatStore");
const emit = defineEmits(["toggleChat"]);

const toggleChat = (chatId) => {
  emit("toggleChat", chatId);

  socket.emit("leaveRoom", { room_id: currentChat.value });
  socket.emit("joinRoom", { room_id: chatId });

  currentChat.value = chatId;
};
const createRoom = () => {
  socket.emit("createRoom", { name: chatName.value });
};
</script>

<style scoped lang="scss">
.controls__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  border-radius: 16px;
  font-size: 16px;
}
</style>
