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

interface Props {
  posts: BlogPost[]
}

const props = defineProps<Props>()

const mostRecentPost = computed(() => props.posts.find(post => post.highlight) || props.posts[0])
const highlights = computed(() => props.posts.slice(0, 3))
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
      <!-- Featured Post -->
      <aside v-if="mostRecentPost" class="lg:col-span-2">
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          Latest Post
        </h2>
        <UiBlogPostCard :post="mostRecentPost" />
      </aside>

      <!-- Highlights -->
      <aside>
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          Highlights
        </h2>
        <div class="space-y-4">
          <UiBlogPostCardHighlight
            v-for="post in highlights"
            :key="post._path"
            :post="post"
          />
        </div>
      </aside>
    </div>

    <!-- Recent Posts -->
    <div class="mt-12">
      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlogPostCard v-for="post in posts" :key="post._path" :post="post" />
      </div>
    </div>
  </div>
</template>
