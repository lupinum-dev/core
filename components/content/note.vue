<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Note',
  },
})
</script>

<template>
  Test
  <UiContentCallout :title="props.title" type="note">
    <slot />
  </UiContentCallout>
</template>
