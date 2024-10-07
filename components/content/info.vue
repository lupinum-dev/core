<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Info',
  },
})
</script>

<template>
  <UiCallout :title="props.title" type="info">
    <slot />
  </UiCallout>
</template>
