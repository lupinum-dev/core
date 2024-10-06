<script setup lang="ts">
import { useScroll, useScrollLock } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { ConfigProvider } from 'radix-vue'
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

const headerState = ref(false)
provide('headerState', headerState)

const lockScroll = ref(null)

onMounted(() => {
  lockScroll.value = useScrollLock(document.body)
})

watch(headerState, (newState) => {
  if (lockScroll.value)
    lockScroll.value.value = newState
})

const useIdFunction = () => useId()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
provide('navigation', navigation)
// TODO: Move folder definition to a separate file
const wikiFolder = '/wiki'
const navigationWiki = computed(() => {
  return navigation.value?.find(item => item._path === wikiFolder)?.children?.map(item => ({
    ...item,
    firstLink: item.children?.[0]?._path ?? item._path,
  }))
})

provide('navigation-wiki', navigationWiki)
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
