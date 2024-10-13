<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
}

const featuredPost = ref<BlogPost | null>(null)
const recentPosts = ref<BlogPost[]>([])
const todaysPicks = ref<BlogPost[]>([])

const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)

async function fetchIndexPageData() {
  try {
    const { data } = await useFetch('/api/blog/overview')
    if (data.value) {
      featuredPost.value = data.value.featuredPost
      recentPosts.value = data.value.recentPosts
      todaysPicks.value = data.value.todaysPicks
    }
  }
  catch (error) {
    console.error('Error fetching index page data:', error)
  }
}

async function fetchMorePosts() {
  if (loading.value || !hasMore.value)
    return

  loading.value = true
  try {
    const { data } = await useFetch('/api/blog/overview', {
      params: { page: currentPage.value + 1 },
    })
    if (data.value && data.value.posts.length > 0) {
      recentPosts.value.push(...data.value.posts)
      currentPage.value++
    }
    else {
      hasMore.value = false
    }
  }
  catch (error) {
    console.error('Error fetching more posts:', error)
  }
  finally {
    loading.value = false
  }
}

function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.body.offsetHeight - 500

  if (scrollPosition >= threshold) {
    fetchMorePosts()
  }
}

onMounted(() => {
  fetchIndexPageData()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
      <!-- Featured Post -->
      <Card v-if="featuredPost" class="lg:col-span-2">
        <CardHeader>
          <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
            Most Recent
          </h2>
        </CardHeader>
        <CardContent>
          <div class="image-container group relative h-64 overflow-hidden sm:h-80">
            <img
              :src="featuredPost.image"
              :alt="featuredPost.title"
              class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            >
          </div>
          <div class="pt-6">
            <p class="mb-2 text-sm text-primary">
              {{ featuredPost.category }}
            </p>
            <CardTitle class="mb-3 text-2xl font-semibold leading-tight">
              {{ featuredPost.title }}
            </CardTitle>
            <p class="mb-4 text-muted-foreground">
              {{ featuredPost.excerpt }}
            </p>
            <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>{{ featuredPost.author }}</span>
              <span>{{ featuredPost.date }}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">{{ featuredPost.readTime }}</span>
          <Button variant="link" class="text-primary hover:text-primary/80">
            Read More
            <Icon name="mdi:chevron-right" class="ml-1 size-4" />
          </Button>
        </CardFooter>
      </Card>

      <!-- Today's Picks -->
      <Card>
        <CardHeader>
          <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
            Today's Picks
          </h2>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="item in todaysPicks"
              :key="item.id"
              class="flex items-center space-x-4 p-4"
            >
              <div class="image-container group relative size-20 flex-shrink-0 overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                >
              </div>
              <div class="flex-grow">
                <p class="mb-1 text-xs text-primary">
                  {{ item.category }}
                </p>
                <h3 class="mb-1 text-sm font-semibold text-foreground">
                  {{ item.title }}
                </h3>
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{{ item.author }}</span>
                  <span>{{ item.readTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Posts -->
    <div class="mt-12">
      <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
        Recent Posts
      </h2>
      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="post in recentPosts"
          :key="post.id"
          class="flex flex-col"
        >
          <CardHeader class="p-0">
            <div class="image-container group relative h-48 overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              >
            </div>
          </CardHeader>
          <CardContent class="flex flex-grow flex-col justify-between pt-6">
            <div>
              <p class="mb-2 text-sm text-primary">
                {{ post.category }}
              </p>
              <CardTitle class="mb-2 text-xl font-semibold leading-tight">
                {{ post.title }}
              </CardTitle>
            </div>
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <span>{{ post.author }}</span>
                <span>{{ post.date }}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">{{ post.readTime }}</span>
            <Button variant="link" class="text-primary hover:text-primary/80">
              Read More
              <Icon name="mdi:chevron-right" class="ml-1 size-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div v-if="loading" class="mt-8 flex justify-center">
        <span class="text-muted-foreground">Loading more posts...</span>
      </div>
      <div v-if="!hasMore" class="mt-8 text-center text-muted-foreground">
        No more posts to load
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
