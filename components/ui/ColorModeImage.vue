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
  <NuxtImg :src="light" class="dark:hidden" v-bind="$attrs" />
  <NuxtImg :src="dark" class="hidden dark:block" v-bind="$attrs" />
</template>
