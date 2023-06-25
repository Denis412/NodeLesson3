<template>
  <q-chat-message :text="[message.message]" :sent="isSent" />
</template>

<script setup>
import { computed, inject } from "vue";

const { message } = defineProps({
  message: Object,
});

const chatStore = inject("chatStore");
const userId = chatStore.getUserID();

const isSent = computed(() => message.sender_id === userId.value);
</script>

<style scoped lang="scss"></style>
