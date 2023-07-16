<template>
  <q-item
    clickable
    class="flex items-center item"
    :class="{ active: id === currentChat }"
    @click="selectChat"
  >
    {{ name }}
  </q-item>
</template>

<script setup>
import { inject } from "vue";

const { id, name, selected } = defineProps({
  id: Number,
  name: String,
  selected: Object,
});

const currentChat = inject("currentChat");

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
