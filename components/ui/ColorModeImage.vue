<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  dark: {
    type: String,
    required: true,
  },
  light: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div v-bind="$attrs">
    <NuxtImg :src="light" class="dark:hidden" />
    <NuxtImg :src="dark" class="hidden dark:block" />
  </div>
</template>
