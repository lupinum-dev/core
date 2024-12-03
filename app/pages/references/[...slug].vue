<script setup lang="ts">
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

const { data: page } = await useAsyncData('page-references', () => queryContent(locale.value, 'references')
  .where({ _path: { $contains: pageId.value } })
  .findOne())

const { data } = await useAsyncData('posts-references', () => queryContent(locale.value, 'references')
  .where({ _partial: false, _draft: false })
  .only(['title', 'description', '_path', 'category_references', 'date_published', 'date_modified', 'readTime', 'hero_image', 'highlight'])
  .sort({ date_published: -1 })
  .find())

const allPosts = computed(() => {
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

const currentPost = computed(() => {
  if (page.value) {
    return {
      _path: page.value._path,
      title: page.value.title,
      description: page.value.description,
      date_published: page.value.date_published,
      date_modified: page.value.date_modified,
      category_references: page.value.category_references,
      highlight: page.value.highlight,
      readTime: page.value.readTime,
      hero_image: page.value.hero_image,
    }
  }
  return null
})

const tocLinks = ref<Array<{ id: string, text: string, target: Ref<HTMLElement | null> }>>([])

onMounted(() => {
  tocLinks.value = page.value?.body?.toc?.links?.map((link: any) => ({
    ...link,
    target: ref(document.getElementById(link.id)),
  })) ?? []
})
</script>

<template>
  <div class="container relative flex w-full flex-grow px-0">
    <div id="content" class="container left-0 top-0 mx-auto min-w-0 max-w-[700px] px-3 2xl:max-w-[800px]">
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
  </div>

</template>

<style>
.content-text {
  font-family: inherit !important;
}
</style>
