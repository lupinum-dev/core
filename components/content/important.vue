<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Important',
  },
})
</script>

<template>
  <UiCallout :title="props.title" type="important">
    <slot />
  </UiCallout>
</template>
