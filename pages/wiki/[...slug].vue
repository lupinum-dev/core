<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
// import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// import type { NavItem } from '@/types/navigation'
// import { useUserTextConfig } from '~/composables/useUserTextConfig'

const route = useRoute()

const { data: page } = await useAsyncData<ParsedContent | null>(route.path, () => queryContent(route.path).findOne())

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('wiki')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)))

// const userConfig = useUserTextConfig()

// defineOgImage({
//   component: 'Docs',
//   title: page.value?.title ?? 'Default Title',
//   description: page.value?.description ?? 'Default Description',
// })

// const tocLinks = ref<Array<{ id: string, text: string, target: Ref<HTMLElement | null> }>>([])

// onMounted(() => {
//   tocLinks.value = page.value?.body?.toc?.links?.map((link: any) => ({
//     ...link,
//     target: ref(document.getElementById(link.id)),
//   })) ?? []
// })

// const isSidebarOpen = inject<Ref<boolean>>('isSidebarOpen')
</script>

<template>
  <div
    class="text-desc-1 prose-primary prose font-desc dark:prose-invert w-full rounded-lg text-gray-t-2"
  >
    <ContentRenderer v-if="page?.body" :value="page" />
    <hr v-if="surround?.length">
  </div>
</template>

<style>

</style>
