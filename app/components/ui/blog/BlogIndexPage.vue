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
  image?: string
  readTime?: string
}

interface Props {
  posts: BlogPost[]
}

const props = defineProps<Props>()

const featuredPost = computed(() => props.posts.find(post => post.highlight) || props.posts[0])
const recentPosts = computed(() => props.posts.slice(0, 6))
const todaysPicks = computed(() => props.posts.slice(0, 3))
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
      <!-- Featured Post -->
      <UiCard v-if="featuredPost" class="lg:col-span-2">
        <UiCardHeader>
          <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
            Featured Post
          </h2>
        </UiCardHeader>
        <UiCardContent>
          <div class="image-container group relative h-64 overflow-hidden sm:h-80">
            <img
              :src="featuredPost.hero_image || '/default-blog-image.jpg'"
              :alt="featuredPost.title"
              class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            >
          </div>
          <div class="pt-6">
            <div class="mb-3">
              <span v-for="cat in featuredPost.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-prime-c-1 ring-1 ring-inset ring-prime-c-1 hover:scale-[102%]">
                {{ cat }}
              </span>
            </div>
            <UiCardTitle class="mb-3 text-2xl font-semibold leading-tight">
              {{ featuredPost.title }}
            </UiCardTitle>
            <p class="mb-4 text-muted-foreground">
              {{ featuredPost.description }}
            </p>
            <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>{{ new Date(featuredPost.date_published).toLocaleDateString() }}</span>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">{{ featuredPost.readTime || '5 min read' }}</span>
          <UiButton variant="link" class="text-primary hover:text-primary/80" as-child>
            <NuxtLink :to="featuredPost._path">
              Read More
              <Icon name="mdi:chevron-right" class="ml-1 size-4" />
            </NuxtLink>
          </UiButton>
        </UiCardFooter>
      </UiCard>

      <!-- Today's Picks -->
      <UiCard>
        <UiCardHeader>
          <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
            Today's Picks
          </h2>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div
              v-for="item in todaysPicks"
              :key="item._path"
              class="flex items-center space-x-4 p-4"
            >
              <div class="image-container group relative size-20 flex-shrink-0 overflow-hidden">
                <img
                  :src="item.hero_image || '/default-blog-image.jpg'"
                  :alt="item.title"
                  class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                >
              </div>
              <div class="flex-grow">
                <div class="mb-1">
                  <span v-for="cat in item.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-prime-c-1 ring-1 ring-inset ring-prime-c-1 hover:scale-[102%]">
                    {{ cat }}
                  </span>
                </div>
                <h3 class="mb-1 text-sm font-semibold text-foreground">
                  {{ item.title }}
                </h3>
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{{ new Date(item.date_published).toLocaleDateString() }}</span>
                  <span>{{ item.readTime || '5 min read' }}</span>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Recent Posts -->
    <div class="mt-12">
      <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
        Recent Posts
      </h2>
      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiCard
          v-for="post in recentPosts"
          :key="post._path"
          class="flex flex-col"
        >
          <UiCardHeader class="p-0">
            <div class="image-container group relative h-48 overflow-hidden">
              <img
                :src="post.hero_image || '/default-blog-image.jpg'"
                :alt="post.title"
                class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              >
            </div>
          </UiCardHeader>
          <UiCardContent class="flex flex-grow flex-col justify-between pt-6">
            <div>
              <div class="mb-2">
                <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-prime-c-1 ring-1 ring-inset ring-prime-c-1 hover:scale-[102%]">
                  {{ cat }}
                </span>
              </div>
              <UiCardTitle class="mb-2 text-xl font-semibold leading-tight">
                {{ post.title }}
              </UiCardTitle>
              <p class="mb-4 text-muted-foreground">
                {{ post.description }}
              </p>
            </div>
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <span>{{ new Date(post.date_published).toLocaleDateString() }}</span>
              </div>
            </div>
          </UiCardContent>
          <UiCardFooter class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">{{ post.readTime || '5 min read' }}</span>
            <UiButton variant="link" class="text-primary hover:text-primary/80" as-child>
              <NuxtLink :to="post._path">
                Read More
                <Icon name="mdi:chevron-right" class="ml-1 size-4" />
              </NuxtLink>
            </UiButton>
          </UiCardFooter>
        </UiCard>
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
