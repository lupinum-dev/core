<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Danger',
  },
})
</script>

<template>
  <UiCallout :title="props.title" type="danger">
    <slot />
  </UiCallout>
</template>
