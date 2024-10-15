<script setup lang="ts">
const images = [
  {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    alt: 'Snow-capped mountains with a cloudy sky',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc',
    alt: 'Mountain landscape with a lake in the foreground',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc',
    alt: 'Scenic view of mountains with a winding road',
  },
]
</script>

<template>
  <UiContentBleed>
    <div class="grid grid-cols-3 gap-4 ">
      <div v-for="(image, index) in images" :key="index" class="aspect-square">
        <img :src="image.src" :alt="image.alt" class="size-full rounded-lg object-cover">
      </div>
    </div>
  </UiContentBleed>
</template>
