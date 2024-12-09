<script setup lang="ts">
const router = useRouter()
const blogStore = useBlogPosts()

// Initialize store if needed
if (!blogStore.currentPosts.length) {
  await blogStore.init()
}

function updateCategory(category: string) {
  blogStore.updateCategory(category)
  updateQueryParams()
}

function updateQueryParams() {
  const query: Record<string, string> = {}
  if (blogStore.selectedCategory)
    query.category = blogStore.selectedCategory
  router.push({ query })
}
</script>

<template>
  <div class="bg-svg dark:bg-svg-dark">
    <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-background">
      <UiBlogSideNav
        :selected-category="blogStore.selectedCategory"
        :search-query="blogStore.searchQuery"
        :categories="blogStore.categories"
        :all-tags="blogStore.categories"
        class="hidden lg:block"
        @update:selected-category="updateCategory"
        @update:search-query="blogStore.updateSearchQuery"
      />

      <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between sm:px-6 lg:px-8">
        <div v-if="blogStore.isLoading" class="flex justify-center items-center min-h-[400px]">
          <Icon name="lucide:loader" class="animate-spin" />
        </div>

        <div v-else-if="blogStore.error" class="text-center text-red-500 py-8">
          {{ blogStore.error.message }}
        </div>

        <template v-else>
          <div v-if="blogStore.isHome">
            <UiBlogIndexPage :posts="blogStore.currentPosts" type="blog" />
          </div>
          <div v-else class="container mx-auto px-4 py-8">
            <h2 class="mb-6 font-heading text-3xl text-foreground">
              {{ blogStore.selectedCategory }} Posts
            </h2>
            <div class="mt-12">
              <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <UiBlogPostCard 
                  v-for="post in blogStore.filteredPosts" 
                  :key="post._path" 
                  :post="post" 
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
