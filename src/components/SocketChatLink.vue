<template>
  <q-item clickable class="flex items-center" @click="selectChat">
    Чат {{ id }}
  </q-item>
</template>

<script setup>
const { id, name } = defineProps({
  id: Number,
  name: String,
});

const emit = defineEmits(["select"]);
const selectChat = () => emit("select", id);
</script>

<style scoped lang="scss"></style>
