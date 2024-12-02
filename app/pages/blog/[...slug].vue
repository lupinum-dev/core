<script setup lang="ts">
import { useUserTextConfig } from '~/composables/useUserTextConfig'
import type { BlogPost } from '~/types/blog'

const route = useRoute()

definePageMeta({
  layout: 'blog',
})

const { locale } = useI18n()

const localePath = useLocalePath()

const pageId = computed(() => {
  const lastSlug = route.params.slug?.[route.params.slug.length - 1] ?? ''
  return lastSlug.split('-').pop() ?? ''
})

const { data: page } = await useAsyncData<BlogPost>('page', () => queryContent(locale.value, 'blog')
  .where({ _path: { $contains: pageId.value } })
  .findOne())

const { data } = await useAsyncData<BlogPost[]>('allPosts', () => queryContent(locale.value, 'blog')
  .where({ _partial: false, _draft: false })
  .only(['title', 'description', '_path', 'category_blog', 'date_published', 'date_modified'])
  .sort({ date_published: -1 })
  .find())

const allPosts = computed((): BlogPost[] => {
  return (data.value?.map((post) => {
    const pathParts = post._path?.split('/').filter(Boolean) ?? []
    if (pathParts[0] === 'en') {
      pathParts.shift()
    }
    const newPath = localePath(`/${pathParts.join('/')}`)
    return {
      ...post,
      _path: newPath,
    }
  }) ?? [])
})

const currentPost = computed((): BlogPost | null => {
  if (page.value) {
    return {
      _path: page.value._path,
      title: page.value.title,
      description: page.value.description,
      date_published: page.value.date_published,
      date_modified: page.value.date_modified,
      category_blog: page.value.category_blog,
      published: page.value.published,
      body: page.value.body,
    }
  }
  return null
})

const tocLinks = ref<Array<{ id: string; text: string; depth: number; target: Ref<HTMLElement | null> }>>([])

onMounted(() => {
  tocLinks.value = page.value?.body?.toc?.links?.map((link) => ({
    ...link,
    target: ref(document.getElementById(link.id)),
  })) ?? []
})
</script>

<template>
  <div class="relative flex w-full flex-grow  px-0">
    <div class="bg-svg dark:bg-svg-dark  hidden w-[75px] lg:block 2xl:w-[420px]">
      <div class="sticky top-40">
        <NuxtLink
          :to="localePath('/blog')"
          class="group sticky ml-auto mr-3  flex size-10 items-center justify-center rounded-full bg-background shadow-md shadow-secondary/5 ring-1 ring-border transition dark:border dark:border-border/50 dark:bg-secondary dark:ring-0 dark:ring-ring/10 dark:hover:border-border dark:hover:ring-ring/20  "
          aria-label="Go back to articles"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            class="size-4 stroke-muted-foreground transition group-hover:stroke-foreground dark:stroke-muted-foreground dark:group-hover:stroke-foreground"
          >
            <path
              d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
    <div id="content" class="container left-0 top-0 mx-auto min-w-0 max-w-[700px] bg-background px-3 2xl:max-w-[800px]">
      <div
        class="prose-primary prose mt-24 w-full rounded-lg text-gray-t-2 dark:prose-invert"
      >
        <UiContentHeader :title="page?.title ?? ''" :description="page?.description ?? ''" />

        <UiContentCTA />

        <ContentRenderer v-if="page?.body" :value="page" />
        <div class="mt-12">
          <UiContentCTA />
        </div>

        <div class="mb-24 mt-4 flex justify-center">
          <UiElementsFeedback />
        </div>
      </div>
    </div>
    <div class="bg-svg dark:bg-svg-dark hidden lg:block lg:w-[260px] 2xl:w-[420px]">
      <div class="sticky top-32">
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
