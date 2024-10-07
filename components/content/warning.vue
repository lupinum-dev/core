<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Warning',
  },
})
</script>

<template>
  <UiCallout :title="props.title" type="warning">
    <slot />
  </UiCallout>
</template>
