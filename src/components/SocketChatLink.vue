<template>
  <q-item
    clickable
    class="flex items-center item"
    :class="{ active: id === selected.value }"
    @click="selectChat"
  >
    Чат {{ id }}
  </q-item>
</template>

<script setup>
const { id, name, selected } = defineProps({
  id: Number,
  name: String,
  selected: Object,
});

const emit = defineEmits(["select"]);
const selectChat = () => emit("select", id);
</script>

<style scoped lang="scss">
.item {
  margin-right: 8px;
  border-radius: 8px;
}
.active {
  background-color: lightgray;
}
</style>
