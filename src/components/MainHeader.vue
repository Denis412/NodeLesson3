<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Чат на сокетах </q-toolbar-title>

      <div>Онлайн: {{ currentOnline }}</div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import socket from "src/lib/socketIO";

const toggleLeftDrawer = inject("toggleLeftDrawer");

const currentOnline = ref(0);

onMounted(() => {
  socket.on("refreshOnline", (data) => {
    console.log("data", data);
    currentOnline.value = data;
  });
});
</script>

<style scoped lang="scss"></style>
