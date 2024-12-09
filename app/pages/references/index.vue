<script setup lang="ts">
const router = useRouter()
const referencesStore = useReferences()

// Initialize store if needed
if (!referencesStore.currentReferences.length) {
  await referencesStore.init()
}

function updateCategory(category: string) {
  referencesStore.updateCategory(category)
  updateQueryParams()
}

function updateQueryParams() {
  const query: Record<string, string> = {}
  if (referencesStore.selectedCategory)
    query.category = referencesStore.selectedCategory
  router.push({ query })
}
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-background">
    <UiBlogSideNav 
      :selected-category="referencesStore.selectedCategory"
      :search-query="referencesStore.searchQuery"
      :categories="referencesStore.categories"
      :all-tags="referencesStore.categories"
      @update:selected-category="updateCategory"
      @update:search-query="referencesStore.updateSearchQuery"
    />

    <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
      <div v-if="referencesStore.isLoading" class="flex justify-center items-center min-h-[400px]">
        <Icon name="lucide:loader" class="animate-spin" />
      </div>

      <div v-else-if="referencesStore.error" class="text-center text-red-500 py-8">
        {{ referencesStore.error.message }}
      </div>

      <template v-else>
        <div v-if="referencesStore.isHome">
          <UiBlogIndexPage :posts="referencesStore.currentReferences" type="references" />
        </div>
        <div v-else class="container mx-auto px-4 py-8">
          <h2 class="mb-6 font-heading text-3xl text-foreground">
            {{ referencesStore.selectedCategory }} Posts
            
          </h2>
          <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <UiBlogPostCard
              v-for="post in referencesStore.filteredPosts"
              :key="post._path"
              :post="post"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
