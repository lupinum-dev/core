<script setup lang="ts">
interface BlogPost {
  _path: string
  title: string
  description: string
  date_published: string
  date_modified: string
  category: string[]
  highlight?: boolean
  readTime?: string
  hero_image?: string
}

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <NuxtLink :to="post._path" class="flex items-center space-x-4 rounded-lg p-4 hover:bg-secondary">
    <div class="image-container group relative size-20 flex-shrink-0 overflow-hidden rounded-lg">
      <NuxtImg
        :src="post.hero_image || '/default-blog-image.jpg'"
        :alt="post.title"
        class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
    <div class="flex-grow">
      <div class="mb-1">
        <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary">
          {{ cat }}
        </span>
      </div>
      <h3 class="mb-1 text-sm font-semibold text-foreground">
        {{ post.title }}
      </h3>
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <NuxtTime 
            :datetime="post.date_published"
            :month="'short'"
            :year="'numeric'"
            :locale="useNuxtApp().$i18n.locale.value"
          />
        <!-- <span>{{ post.readTime || '5 min read' }}</span> -->
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.image-container {
  overflow: hidden;
}

.image-container img {
  transition: transform 0.3s ease-in-out;
}

.image-container:hover img {
  transform: scale(1.1);
}
</style>
