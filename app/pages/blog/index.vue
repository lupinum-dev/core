<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

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

const route = useRoute()
const router = useRouter()

const blogPosts = ref<BlogPost[]>([])
const currentPage = ref(Number(route.query.page) || 1)
const totalPages = ref(1)
const totalPosts = ref(0)
const loading = ref(false)

const categories = ref<string[]>([])
const selectedCategory = ref(route.query.category as string || '')

const searchQuery = ref('')

const allTags = ref<string[]>([])

const filteredPosts = computed(() => {
  return blogPosts.value.filter((post) => {
    const categoryMatch = !selectedCategory.value || post.category === selectedCategory.value
    const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      || post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    return categoryMatch && searchMatch
  })
})

const isHome = computed(() => !selectedCategory.value)

async function fetchPosts() {
  loading.value = true
  try {
    const { data } = await useFetch('/api/blog/overview', {
      params: {
        page: currentPage.value,
        category: selectedCategory.value,
      },
    })

    if (data.value) {
      blogPosts.value.push(...data.value.posts)
      totalPages.value = data.value.totalPages
      currentPage.value = data.value.currentPage
      totalPosts.value = data.value.totalPosts
      categories.value = data.value.allCategories
      allTags.value = data.value.allTags
    }
  }
  catch (error) {
    console.error('Error fetching posts:', error)
  }
  finally {
    loading.value = false
  }
}

watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1
  blogPosts.value = []
  fetchPosts()
})

// Initial fetch
fetchPosts()

function updateCategory(category: string) {
  selectedCategory.value = category
  updateQueryParams()
}

function updateQueryParams() {
  const query: Record<string, string> = {}
  if (selectedCategory.value)
    query.category = selectedCategory.value

  router.push({ query })
}

function handleScroll() {
  if (loading.value || currentPage.value >= totalPages.value)
    return

  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.body.offsetHeight - 500

  if (scrollPosition >= threshold) {
    currentPage.value += 1
    fetchPosts()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Apply filter from URL on initial load
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
    fetchPosts()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const { locale } = useI18n()

const { data: posts } = await useAsyncData('posts', () => queryContent(locale.value, 'blog')
  .find())

console.log(posts.value)


</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-gray-b-0">
    <UiBlogSideNav
      :selected-category="selectedCategory"
      :search-query="searchQuery"
      :categories="categories"
      :all-tags="allTags"
      @update:selected-category="updateCategory"
      @update:search-query="searchQuery = $event"
    />
    <div class="mx-auto flex w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
      <div v-if="isHome">
        <UiBlogIndexPage />
      </div>
      <div v-else class="mx-auto flex w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto px-4 py-8">
          <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <aside v-for="post in filteredPosts" :key="post.id" class="group relative flex w-full flex-col gap-y-6">
              <div class="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-gray-o-1">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="size-full transform object-cover object-top transition-transform duration-200 group-hover:scale-105"
                >
              </div>
              <div class="flex flex-1 flex-col justify-between">
                <div class="flex-1">
                  <div class="mb-3">
                    <a href="/" class="z-30 flex space-x-1">
                      <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-prime-c-1 ring-1 ring-inset ring-prime-c-1 hover:scale-[102%]">
                        {{ post.category }}
                      </span>
                    </a>
                  </div>
                  <router-link :to="`/posts/${post.id}`" class="focus:outline-none" :aria-label="post.title" tabindex="-1">
                    <div class="group">
                      <div class="flex flex-row space-x-2">
                        <h2 class="font-heading text-xl text-gray-t-1 transition-colors duration-200 group-hover:text-gray-t-2 group-hover:underline">
                          {{ post.title }}
                        </h2>
                        <div class="flex flex-col justify-center">
                          <span class="iconify i-scribbles-arrow-right h-3 w-4 group-hover:rotate-2 group-hover:scale-105" aria-hidden="true" />
                        </div>
                      </div>
                      <p class="mt-1 line-clamp-4 text-base text-gray-t-3">
                        {{ post.excerpt }}
                      </p>
                    </div>
                  </router-link>
                </div>
                <div class="relative mt-4 flex items-center gap-x-3">
                  <div class="inline-flex flex-row-reverse justify-end">
                    <span class="relative -me-1.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full text-xs ring-1 ring-gray-b-0 transition-transform first:me-0 lg:hover:scale-105 lg:hover:ring-prime-c-1">
                      <img class="size-6 rounded-full text-xs" :alt="post.author" src="/logo_icon.svg">
                    </span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <time :datetime="post.date" class="relative text-sm font-medium text-gray-t-3 after:absolute after:ml-1.5 after:text-gray-t-3 after:content-['•']">
                      {{ post.date }}
                    </time>
                    <span class="text-[15px] font-medium text-gray-t-3">{{ post.readTime }}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div v-if="loading" class="mt-8 flex justify-center">
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
