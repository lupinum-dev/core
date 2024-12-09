<script setup lang="ts">
import { useBlogPosts } from '~/composables/useBlogPosts'

const route = useRoute()
const blogStore = useBlogPosts()
const { locale } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  layout: 'blog',
})

const pageId = computed(() => {
  const lastSlug = route.params.slug?.[route.params.slug.length - 1] ?? ''
  return lastSlug.split('-').pop() ?? ''
})

// Initialize store if needed
if (!blogStore.currentPosts.length) {
  await blogStore.init()
}

const page = computed(() => blogStore.getPostById(pageId.value))

// Add error handling for non-existent pages
if (!page.value) {
  throw createError({
    statusCode: 404,
    message: `Blog post with ID ${pageId.value} not found`
  })
}

type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
  target: Ref<HTMLElement | null>
}

const tocLinks = ref<TocLink[]>([])

onMounted(() => {
  tocLinks.value = page.value?.body?.toc?.links?.map((link: any) => ({
    ...link,
    depth: link.depth || 1,
    target: ref(document.getElementById(link.id)),
  })) ?? []
})
</script>

<template>
  <div class="relative flex w-full flex-grow">
    <div v-if="blogStore.error" class="w-full px-4 py-12 text-center">
      <p class="text-red-500">{{ blogStore.error.message }}</p>
      <NuxtLink :to="localePath('/blog')" class="mt-4 text-primary hover:underline">
        Back to Blog
      </NuxtLink>
    </div>

    <!-- Left sidebar - Back button -->
    <div class="hidden w-[200px] xl:w-[450px]  lg:block">
      <div class="sticky top-40 flex justify-end pr-8">
        <NuxtLink :to="localePath('/blog')"
          class="group flex size-10 items-center justify-center rounded-full bg-background shadow-md shadow-secondary/5 ring-1 ring-border transition dark:border dark:border-border/50 dark:bg-secondary dark:ring-0 dark:ring-ring/10 dark:hover:border-border dark:hover:ring-ring/20"
          aria-label="Go back to articles">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"
            class="size-4 stroke-muted-foreground transition group-hover:stroke-foreground dark:stroke-muted-foreground dark:group-hover:stroke-foreground">
            <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Main content -->
    <div class="mx-auto flex min-w-0 max-w-[850px] flex-col px-4 bg-svg dark:bg-svg-dark ">
      <div class="prose-primary prose mt-24 sm:mt-36 w-full sm:px-12 rounded-lg text-gray-t-2 dark:prose-invert">
        <UiContentHeader :title="page?.title ?? ''" :description="page?.description ?? ''" />

        <UiContentCTA />

        <ContentRenderer v-if="page?.body" :value="page" class="mt-16" />
        <!-- divider: -->
        <div class="border-t-2 mt-12 w-full border-border"></div>
        <div class=" mt-12 flex justify-center">
          <UiElementsFeedback />
        </div>
        <div class="py-24">
          <UiContentCTA />
        </div>


      </div>
    </div>

    <!-- Right sidebar - TOC -->
    <div class="hidden w-[350px] xl:w-[450px]  lg:block">
      <div class="sticky top-32 pl-8">
        <ClientOnly>
          <UiContentTocDesktop :links="tocLinks" />
        </ClientOnly>
      </div>
    </div>
  </div>

  <!-- <UiBlogReadMore v-if="currentPost && allPosts" :current-post="currentPost" :all-posts="allPosts" /> -->
</template>

<style>
.content-text {
  font-family: inherit !important;
}
</style>
