<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Important',
  },
})
</script>

<template>
  <UiContentCallout :title="props.title" type="important">
    <slot />
  </UiContentCallout>
</template>
