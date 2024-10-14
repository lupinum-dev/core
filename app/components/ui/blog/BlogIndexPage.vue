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
const todaysPicks = computed(() => props.posts.slice(0, 3))
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
      <!-- Featured Post -->
      <aside v-if="mostRecentPost" class="lg:col-span-2">
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          Latest Post
        </h2>
        <div class="group relative flex w-full flex-col gap-y-6">
          <div class="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-border">
            <NuxtImg
              :src="mostRecentPost.hero_image || '/default-blog-image.jpg'"
              :alt="mostRecentPost.title"
              class="size-full transform object-cover object-top transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div class="flex flex-1 flex-col justify-between">
            <div class="flex-1">
              <div class="mb-3">
                <span v-for="cat in mostRecentPost.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground">
                  {{ cat }}
                </span>
              </div>
              <NuxtLink :to="mostRecentPost._path" class="focus:outline-none" :aria-label="mostRecentPost.title" tabindex="-1">
                <div class="group">
                  <div class="flex flex-row space-x-2">
                    <h3 class="font-heading text-2xl text-foreground transition-colors duration-200 group-hover:text-primary group-hover:underline">
                      {{ mostRecentPost.title }}
                    </h3>
                    <div class="flex flex-col justify-center">
                      <span class="iconify i-scribbles-arrow-right h-3 w-4 text-muted-foreground group-hover:rotate-2 group-hover:scale-105" aria-hidden="true" />
                    </div>
                  </div>
                  <p class="mt-1 line-clamp-4 text-base text-muted-foreground">
                    {{ mostRecentPost.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
            <div class="relative mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <time :datetime="mostRecentPost.date_published" class="relative text-sm font-medium text-muted-foreground after:absolute after:ml-1.5 after:text-muted-foreground after:content-['•']">
                  {{ new Date(mostRecentPost.date_published).toLocaleDateString() }}
                </time>
                <span class="text-[15px] font-medium text-muted-foreground">{{ mostRecentPost.readTime || '5 min read' }}</span>
              </div>
              <NuxtLink :to="mostRecentPost._path" class="text-primary hover:text-primary/80">
                Read More
                <Icon name="mdi:chevron-right" class="ml-1 size-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>

      <!-- Today's Picks -->
      <aside>
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          Highlights
        </h2>
        <div class="space-y-4">
          <div
            v-for="item in todaysPicks"
            :key="item._path"
            class="flex items-center space-x-4 p-4"
          >
            <div class="image-container group relative size-20 flex-shrink-0 overflow-hidden rounded-lg">
              <NuxtImg
                :src="item.hero_image || '/default-blog-image.jpg'"
                :alt="item.title"
                class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div class="flex-grow">
              <div class="mb-1">
                <span v-for="cat in item.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground">
                  {{ cat }}
                </span>
              </div>
              <h3 class="mb-1 text-sm font-semibold text-foreground">
                <NuxtLink :to="item._path" class="hover:text-primary hover:underline">
                  {{ item.title }}
                </NuxtLink>
              </h3>
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>{{ new Date(item.date_published).toLocaleDateString() }}</span>
                <span>{{ item.readTime || '5 min read' }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Recent Posts -->
    <div class="mt-12">
      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <aside v-for="post in posts" :key="post._path" class="group relative flex w-full flex-col gap-y-6">
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
                  <p class="mt-1 line-clamp-4 text-base text-muted-foreground">
                    {{ post.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
            <div class="relative mt-4 flex items-center gap-x-3">
              <div class="flex items-center space-x-4">
                <time :datetime="post.date_published" class="relative text-sm font-medium text-muted-foreground after:absolute after:ml-1.5 after:text-muted-foreground after:content-['•']">
                  {{ new Date(post.date_published).toLocaleDateString() }}
                </time>
                <span class="text-[15px] font-medium text-muted-foreground">{{ post.readTime || '5 min read' }}</span>
              </div>
            </div>
          </div>
        </aside>
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
