<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Any props or logic here
</script>

<style scoped>
.card {
  @apply transition-all duration-300;
}
</style>
