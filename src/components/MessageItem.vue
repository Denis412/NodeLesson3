<template>
  <!-- <q-chat-message :text="[message.message]" :sent="isSent" /> -->
  <div class="message-area">
    <div>{{ message.name }}</div>
    <div>{{ message.message }}</div>
  </div>
</template>

<script setup>
// import { computed, inject } from "vue";

const { message } = defineProps({ message: Object });

// const chatStore = inject("chatStore");
// const userId = chatStore.getUserID();

// const isSent = computed(() => message.sender_id === userId.value);
</script>

<style scoped lang="scss">
.message-area {
  border: 1px solid black;
  padding: 8px;
}
</style>
