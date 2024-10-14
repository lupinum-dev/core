<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { removeLocalePrefix } from '~/utils/content'

// const isSidebarOpen = inject<Ref<boolean>>('isSidebarOpen')

// Add this import if not already present
// import UiElementsDiscussion from '~/components/ui/elements/Discussion.vue'
// import type { NavItem } from '@/types/navigation'
// import { useUserTextConfig } from '~/composables/useUserTextConfig'

definePageMeta({
  layout: 'wiki',
})

const route = useRoute()

const { locale } = useI18n()

// Query with the page ID
// route: /wiki/fundamentals/world-of-bees/overview-f45a32e2, take the last part of the route: f45a32e2
// use this as the query parameter

const pageId = computed(() => {
  const lastSlug = route.params.slug?.[route.params.slug.length - 1] ?? ''
  return lastSlug.split('-').pop() ?? ''
})

const { data: page } = await useAsyncData<ParsedContent | null>('page', () => queryContent(locale.value, 'wiki')
  .where({ _path: { $contains: pageId.value } })
  .findOne())

// Fetch the surrounding content for context
const { data: surround } = await useAsyncData(`${page.value?._path}-surround`, () => queryContent(locale.value, 'wiki')
  .where({
    _extension: 'md',
    navigation: { $ne: false },
    _file: { $not: { $regex: '/_dir\.md$' } }, // Exclude _dir.md files
  })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(page.value?._path ?? '')))

const surroundWithoutLocale = computed(() => surround.value?.map(item => item ? removeLocalePrefix(item, locale) : null))

const isContentSite = inject<Ref<boolean>>('isContentSite', ref(false))
isContentSite.value = true

// const userConfig = useUserTextConfig()

// defineOgImage({
//   component: 'Docs',
//   title: page.value?.title ?? 'Default Title',
//   description: page.value?.description ?? 'Default Description',
// })

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
    <div id="content" class="container left-0 top-0 mx-auto mt-24 min-w-0 lg:max-w-[600px] lg:px-6  xl:mt-32 xl:max-w-[700px] xl:px-12 2xl:mt-36 2xl:max-w-[800px]">
      <UiContentHeader :title="page?.title ?? ''" :description="page?.description ?? ''" />

      <ClientOnly>
        <UiContentCTA />
      </ClientOnly>

      <div class="text-desc-1 prose w-full rounded-lg font-desc text-muted-foreground dark:prose-invert">
        <ContentRenderer v-if="page?.body" :value="page" />
        <hr v-if="surround?.length">
      </div>

      <ClientOnly>
        <UiContentCTA2 />
      </ClientOnly>

      <UiContentSurround :surround="surroundWithoutLocale ?? []" />
      <div class="mt-2 flex justify-center">
        <UiElementsFeedback />
      </div>

      <!-- Spacer -->
      <div class="h-56" />
    </div>

    <!-- TOC on the right side, sticky -->
    <div id="toc" class="sticky top-20 mr-auto hidden h-[calc(100vh-5rem)] w-[260px] translate-x-3 overflow-y-auto px-3 py-6 lg:block 2xl:w-[420px] 2xl:translate-x-32 ">
      <ClientOnly>
        <UiContentTocDesktop :links="tocLinks" />
      </ClientOnly>
    </div>
  </div>
</template>

<style>

</style>
