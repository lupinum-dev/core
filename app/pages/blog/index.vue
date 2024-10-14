<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBlogStore } from '~/stores/blog'
import { useBlogPosts } from '~/composables/useBlogPosts'

const blogStore = useBlogStore()
const route = useRoute()
const router = useRouter()

const { blogPosts, categories } = useBlogPosts()

const filteredPosts = computed(() => {
  return blogPosts.value.filter((post) => {
    const categoryMatch = !blogStore.selectedCategory || post.category.includes(blogStore.selectedCategory)
    const searchMatch = post.title.toLowerCase().includes(blogStore.searchQuery.toLowerCase())
      || post.description.toLowerCase().includes(blogStore.searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })
})

const isHome = computed(() => !blogStore.selectedCategory)

function updateCategory(category: string) {
  blogStore.setSelectedCategory(category)
  updateQueryParams()
}

function updateQueryParams() {
  const query: Record<string, string> = {}
  if (blogStore.selectedCategory)
    query.category = blogStore.selectedCategory
  router.push({ query })
}

// Initialize the store with the route query
if (route.query.category) {
  blogStore.setSelectedCategory(route.query.category as string)
}
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-background">
    <UiBlogSideNav
      :selected-category="blogStore.selectedCategory"
      :search-query="blogStore.searchQuery"
      :categories="categories"
      class="hidden lg:block"
      @update:selected-category="updateCategory"
      @update:search-query="blogStore.setSearchQuery"
    />

    <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between  sm:px-6 lg:px-8">
      <template v-if="blogPosts">
        <div v-if="isHome">
          <UiBlogIndexPage :posts="filteredPosts" />
        </div>
        <div v-else class="container mx-auto px-4 py-8">
          <h2 class="mb-6 font-heading text-3xl text-foreground">
            {{ blogStore.selectedCategory }} Posts
          </h2>
          <div class="mt-12">
            <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <UiBlogPostCard v-for="post in filteredPosts" :key="post._path" :post="post" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
