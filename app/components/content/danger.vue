<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Danger',
  },
})
</script>

<template>
  <UiContentCallout :title="props.title" type="danger">
    <slot />
  </UiContentCallout>
</template>
