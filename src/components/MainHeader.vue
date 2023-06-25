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
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { inject } from "vue";

const toggleLeftDrawer = inject("toggleLeftDrawer");
</script>

<style scoped lang="scss"></style>
