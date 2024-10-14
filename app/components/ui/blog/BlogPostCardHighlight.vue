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
  <div class="flex items-center space-x-4 p-4">
    <div class="image-container group relative size-20 flex-shrink-0 overflow-hidden rounded-lg">
      <NuxtImg
        :src="post.hero_image || '/default-blog-image.jpg'"
        :alt="post.title"
        class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
    <div class="flex-grow">
      <div class="mb-1">
        <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground">
          {{ cat }}
        </span>
      </div>
      <h3 class="mb-1 text-sm font-semibold text-foreground">
        <NuxtLink :to="post._path" class="hover:text-primary hover:underline">
          {{ post.title }}
        </NuxtLink>
      </h3>
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <ClientOnly>
          <span>{{ new Date(post.date_published).toLocaleDateString() }}</span>
        </ClientOnly>
        <span>{{ post.readTime || '5 min read' }}</span>
      </div>
    </div>
  </div>
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
