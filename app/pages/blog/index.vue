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
  image?: string
  readTime?: string
}

const route = useRoute()
const router = useRouter()

const selectedCategory = ref(route.query.category as string || '')
const searchQuery = ref('')

const { locale } = useI18n()

const { data: posts } = await useAsyncData('posts', () =>
  queryContent(locale.value, 'blog')
    .where({ _partial: false, _draft: false })
    .sort({ date_published: -1 })
    .find())

console.log(posts.value)

const blogPosts = computed(() => posts.value as BlogPost[])

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
      <template v-if="blogPosts">
        <div v-if="isHome">
          <UiBlogIndexPage :posts="blogPosts" />
        </div>
        <div v-else class="container mx-auto px-4 py-8">
          <h2 class="mb-6 text-2xl font-bold">
            {{ selectedCategory }} Posts
          </h2>
          <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <aside v-for="post in filteredPosts" :key="post._path" class="group relative flex w-full flex-col gap-y-6">
              <div class="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-gray-o-1">
                <NuxtImg
                  :src="post.hero_image || '/default-blog-image.jpg'"
                  :alt="post.title"
                  class="size-full transform object-cover object-top transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div class="flex flex-1 flex-col justify-between">
                <div class="flex-1">
                  <div class="mb-3">
                    <span v-for="cat in post.category" :key="cat" class="mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-prime-c-1 ring-1 ring-inset ring-prime-c-1 hover:scale-[102%]">
                      {{ cat }}
                    </span>
                  </div>
                  <NuxtLink :to="post._path" class="focus:outline-none" :aria-label="post.title" tabindex="-1">
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
                        {{ post.description }}
                      </p>
                    </div>
                  </NuxtLink>
                </div>
                <div class="relative mt-4 flex items-center gap-x-3">
                  <div class="flex items-center space-x-4">
                    <time :datetime="post.date_published" class="relative text-sm font-medium text-gray-t-3 after:absolute after:ml-1.5 after:text-gray-t-3 after:content-['•']">
                      {{ new Date(post.date_published).toLocaleDateString() }}
                    </time>
                    <span class="text-[15px] font-medium text-gray-t-3">{{ post.readTime || '5 min read' }}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
