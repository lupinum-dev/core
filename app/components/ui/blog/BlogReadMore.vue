<script setup lang="ts">
import { computed } from 'vue'

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

const props = defineProps<{
  currentPost: BlogPost
  allPosts: BlogPost[]
}>()

const relatedPosts = computed(() =>
  props.allPosts
    .filter(post => post._path !== props.currentPost._path && post.category.some(cat => props.currentPost.category.includes(cat)))
    .slice(0, 2),
)

const recentPosts = computed(() => {
  const additionalPosts = relatedPosts.value.length < 2
    ? props.allPosts
      .filter(post => post._path !== props.currentPost._path && !relatedPosts.value.includes(post))
      .slice(0, 2 - relatedPosts.value.length)
    : []
  return [...relatedPosts.value, ...additionalPosts]
})

const highlightedPosts = computed(() =>
  props.allPosts
    .filter(post => post.highlight && post._path !== props.currentPost._path)
    .slice(0, 3),
)
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12">
    <h2 class="mb-6 font-heading text-xl font-bold text-foreground">
      Related Posts
    </h2>
    <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
      <UiBlogPostCard
        v-for="post in recentPosts"
        :key="post._path"
        :post="post"
      />
    </div>

    <h2 class="mb-6 mt-12 font-heading text-xl font-bold text-foreground">
      Highlights
    </h2>
    <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <UiBlogPostCardHighlight
        v-for="post in highlightedPosts"
        :key="post._path"
        :post="post"
      />
    </div>
  </div>
</template>
