<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Info',
  },
})
</script>

<template>
  <UiContentCallout :title="props.title" type="info">
    <slot />
  </UiContentCallout>
</template>
