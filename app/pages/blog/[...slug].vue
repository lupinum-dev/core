<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { NavItem } from '@/types/navigation'
import { useUserTextConfig } from '~/composables/useUserTextConfig'

const route = useRoute()

definePageMeta({
  layout: 'blog',
})

const { data: page } = await useAsyncData<ParsedContent | null>(route.path, () => queryContent(route.path).findOne())

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('blog')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)))

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
    <div class="flex-grow">
      <UiWikiTocMobile :links="tocLinks" class="w-full px-0" />

      <div id="content" class="container left-0 top-0 mx-auto min-w-0 max-w-[700px] px-3 2xl:max-w-[800px]">
        <UiWikiHeader :title="page?.title ?? ''" :description="page?.description ?? ''" />
        
        <ClientOnly>
          <LayoutCTA />
        </ClientOnly>
        <div
          class="prose-primary prose w-full rounded-lg text-gray-t-2 dark:prose-invert" :class="[
            userConfig.font,
            userConfig.size,
            userConfig.lineHeight,
          ]"
        >
          <ContentRenderer v-if="page?.body" :value="page" />
          <hr v-if="surround?.length">
        </div>

        <ClientOnly>
          <LayoutCTA2 />
        </ClientOnly>

        <UiSurround :surround="surround ?? []" />
        <div class="mt-2 flex justify-center">
          <UiFeedback />
        </div>

        <div class="h-56" />
      </div>
    </div>

    <div id="toc" class="bg-gray-b-1/75 hidden p-6 xl:block xl:w-[370px]">
      <ClientOnly>
        <UiWikiTocDesktop :links="tocLinks" class="sticky top-20" />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.content-text {
  font-family: inherit !important;
}
</style>
