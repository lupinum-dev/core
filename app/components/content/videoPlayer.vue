<script setup lang="ts">
interface VideoPlayerProps {
  src: string
  label?: string
}

const props = defineProps<VideoPlayerProps>()
</script>

<template>
  <div class="mb-4 max-w-full ">
    <video controls class="h-auto w-full overflow-hidden rounded-md">
      <source :src="props.src" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p v-if="props.label" class="mt-2 text-sm text-muted-foreground">
      {{ props.label }}
    </p>
  </div>
</template>
