<template>
  <div class="chat-wrapper">
    <div class="chat-header">
      <h4 class="q-ma-none text-center">Чат №{{ id }}</h4>
    </div>

    <div class="chat-messages-area">
      <div class="chat-messages-area-inner">
        <!-- <div style="min-height: 100vh"></div> -->
        <messages-list />
      </div>
    </div>
  </div>
</template>

<script setup>
import MessagesList from "src/components/MessagesList.vue";

const { id } = defineProps({
  id: Number,
});
</script>

<style scoped lang="scss">
.chat {
  $header-height: 50px;

  &-wrapper {
    display: flex;
    flex-direction: column;
    min-height: inherit;
  }

  &-header {
    display: flex;
    align-items: center;

    position: sticky;
    top: 0;

    padding: 8px 12px;

    height: $header-height;

    background-color: lightgray;
  }

  &-messages-area {
    position: relative;
    flex: 1;
    padding: 16px 12px;

    &-inner {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow-y: auto;
    }
  }
}
</style>
