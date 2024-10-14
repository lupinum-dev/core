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

const formatDate = (date: string) => new Date(date).toLocaleDateString()
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12">
    <h2 class="mb-6 font-heading text-xl font-bold text-foreground">
      Related Posts
    </h2>
    <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
      <aside v-for="post in recentPosts" :key="post._path" class="group relative flex w-full flex-col gap-y-6">
        <div class="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-border">
          <NuxtImg :src="post.hero_image || '/default-blog-image.jpg'" :alt="post.title" class="size-full transform object-cover object-top transition-transform duration-200 group-hover:scale-105" />
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex-1">
            <div class="mb-3">
              <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground">{{ cat }}</span>
            </div>
            <NuxtLink :to="post._path" class="focus:outline-none" :aria-label="post.title" tabindex="-1">
              <div class="group">
                <div class="flex flex-row space-x-2">
                  <h3 class="font-heading text-xl text-foreground transition-colors duration-200 group-hover:text-primary group-hover:underline">
                    {{ post.title }}
                  </h3>
                  <div class="flex flex-col justify-center">
                    <span class="iconify i-scribbles-arrow-right h-3 w-4 text-muted-foreground group-hover:rotate-2 group-hover:scale-105" aria-hidden="true" />
                  </div>
                </div>
                <p class="mt-1 line-clamp-3 text-base text-muted-foreground">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
          <div class="relative mt-4 flex items-center gap-x-3">
            <div class="flex items-center space-x-4">
              <time :datetime="post.date_published" class="relative text-sm font-medium text-muted-foreground after:absolute after:ml-1.5 after:text-muted-foreground after:content-['•']">
                {{ formatDate(post.date_published) }}
              </time>
              <span class="text-[15px] font-medium text-muted-foreground">{{ post.readTime || '5 min read' }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <h2 class="mb-6 mt-12 font-heading text-xl font-bold text-foreground">
      Highlights
    </h2>
    <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <aside v-for="post in highlightedPosts" :key="post._path" class="group relative flex w-full flex-col gap-y-6">
        <div class="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-border">
          <NuxtImg
            :src="post.hero_image || '/default-blog-image.jpg'"
            :alt="post.title"
            class="size-full transform object-cover object-top transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex-1">
            <div class="mb-3">
              <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground">
                {{ cat }}
              </span>
            </div>
            <NuxtLink :to="post._path" class="focus:outline-none" :aria-label="post.title" tabindex="-1">
              <div class="group">
                <div class="flex flex-row space-x-2">
                  <h3 class="font-heading text-xl text-foreground transition-colors duration-200 group-hover:text-primary group-hover:underline">
                    {{ post.title }}
                  </h3>
                  <div class="flex flex-col justify-center">
                    <span class="iconify i-scribbles-arrow-right h-3 w-4 text-muted-foreground group-hover:rotate-2 group-hover:scale-105" aria-hidden="true" />
                  </div>
                </div>
                <p class="mt-1 line-clamp-3 text-base text-muted-foreground">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
          <div class="relative mt-4 flex items-center gap-x-3">
            <div class="flex items-center space-x-4">
              <time :datetime="post.date_published" class="relative text-sm font-medium text-muted-foreground after:absolute after:ml-1.5 after:text-muted-foreground after:content-['•']">
                {{ formatDate(post.date_published) }}
              </time>
              <span class="text-[15px] font-medium text-muted-foreground">{{ post.readTime || '5 min read' }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
