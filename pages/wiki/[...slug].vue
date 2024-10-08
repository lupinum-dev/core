<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
// import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// import type { NavItem } from '@/types/navigation'
// import { useUserTextConfig } from '~/composables/useUserTextConfig'

definePageMeta({
  layout: 'wiki',
})

const route = useRoute()

const { data: page } = await useAsyncData<ParsedContent | null>(route.path, () => queryContent(route.path).findOne())

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('wiki')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)))

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

// const isSidebarOpen = inject<Ref<boolean>>('isSidebarOpen')
</script>

<template>
  <div class="container relative flex w-full flex-grow px-0">
    <div id="content" class="container left-0 top-0 mx-auto mt-36 min-w-0  lg:max-w-[600px] lg:px-6 xl:max-w-[700px] xl:px-12 2xl:max-w-[800px]">
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

      <UiContentSurround :surround="surround ?? []" />
      <div class="mt-2 flex justify-center">
        <UiElementsFeedback />
      </div>
      <!-- Spacer -->
      <div class="h-56" />
    </div>

    <!-- TOC on the right side, sticky -->
    <div id="toc" class="sticky top-20 mr-auto hidden h-[calc(100vh-5rem)] w-[300px] overflow-y-auto px-3 py-6 lg:block xl:max-w-[420px] ">
      <ClientOnly>
        <UiContentTocDesktop :links="tocLinks" />
      </ClientOnly>
    </div>
  </div>
</template>

<style>

</style>
