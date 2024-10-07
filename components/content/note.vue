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
  <UiCallout :title="props.title" type="note">
    <slot />
  </UiCallout>
</template>
