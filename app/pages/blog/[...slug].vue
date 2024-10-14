<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { NavItem } from '@/types/navigation'
import { useUserTextConfig } from '~/composables/useUserTextConfig'

const route = useRoute()

definePageMeta({
  layout: 'blog',
})

const { locale } = useI18n()

// Query with the page ID
// route: en/blog/example2-543c74c0, take the last part of the route: f45a32e2
// use this as the query parameter

const pageId = computed(() => {
  const lastSlug = route.params.slug?.[route.params.slug.length - 1] ?? ''
  return lastSlug.split('-').pop() ?? ''
})

const { data: page } = await useAsyncData<ParsedContent | null>('page', () => queryContent(locale.value, 'blog')
  .where({ _path: { $contains: pageId.value } })
  .findOne())

const tocLinks = ref<Array<{ id: string, text: string, target: Ref<HTMLElement | null> }>>([])

const userConfig = useUserTextConfig()

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
        class="prose-primary prose w-full rounded-lg text-gray-t-2 dark:prose-invert" :class="[
          userConfig.font,
          userConfig.size,
          userConfig.lineHeight,
        ]"
      >
        <ContentRenderer v-if="page?.body" :value="page" />
      </div>
    </div>
  </div>
</template>

<style>
.content-text {
  font-family: inherit !important;
}
</style>
