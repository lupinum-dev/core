<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Warning',
  },
})
</script>

<template>
  <UiContentCallout :title="props.title" type="warning">
    <slot />
  </UiContentCallout>
</template>
