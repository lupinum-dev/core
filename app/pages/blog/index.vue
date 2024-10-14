<script setup lang="ts">
import { computed, ref } from 'vue'

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

const route = useRoute()
const router = useRouter()

const selectedCategory = ref(route.query.category as string || '')
const searchQuery = ref('')

const { locale } = useI18n()

const localePath = useLocalePath()

const { data: posts } = await useAsyncData('posts', () =>
  queryContent(locale.value, 'blog')
    .where({ _partial: false, _draft: false })
    .only(['title', 'description', '_path', 'category', 'date_published', 'date_modified', 'readTime', 'hero_image'])
    .sort({ date_published: -1 })
    .find())

// remove locale prefix from _path
const blogPosts = computed(() => {
  return (posts.value?.map((post) => {
    const pathParts = post._path?.split('/').filter(Boolean) ?? []
    if (pathParts[0] === 'en') {
      pathParts.shift()
    }
    const newPath = localePath(`/${pathParts.join('/')}`)
    return {
      ...post,
      _path: newPath,
    }
  }) ?? []) as BlogPost[]
})

const categories = computed(() => [...new Set(blogPosts.value.flatMap(post => post.category))])
const allTags = computed(() => [...new Set(blogPosts.value.flatMap(post => post.category))])

const filteredPosts = computed(() => {
  return blogPosts.value.filter((post) => {
    const categoryMatch = !selectedCategory.value || post.category.includes(selectedCategory.value)
    const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      || post.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return categoryMatch && searchMatch
  })
})

const isHome = computed(() => !selectedCategory.value)

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
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-background">
    <UiBlogSideNav
      :selected-category="selectedCategory"
      :search-query="searchQuery"
      :categories="categories"
      :all-tags="allTags"
      @update:selected-category="updateCategory"
      @update:search-query="searchQuery = $event"
    />
    <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
      <template v-if="blogPosts">
        <div v-if="isHome">
          <UiBlogIndexPage :posts="blogPosts" />
        </div>
        <div v-else class="container mx-auto px-4 py-8">
          <h2 class="mb-6 font-heading text-3xl text-foreground">
            {{ selectedCategory }} Posts
          </h2>
          <div class="mt-12">
            <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <UiBlogPostCard v-for="post in blogPosts" :key="post._path" :post="post" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
