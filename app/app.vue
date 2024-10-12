<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { ConfigProvider } from 'radix-vue'

import { configure } from 'vee-validate'

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
const { locale } = useI18n()

function removeLocalePrefix(item: any): any {
  const newItem = { ...item }
  if (newItem._path) {
    newItem._path = newItem._path.replace(new RegExp(`^/${locale.value}`), '')
  }
  if (newItem.children) {
    newItem.children = newItem.children.map(removeLocalePrefix)
  }
  return newItem
}

const localizedNavigation = computed(() => {
  const localeNavigation = navigation.value?.find(item => item._path === `/${locale.value}`)?.children
  return localeNavigation ? localeNavigation.map(removeLocalePrefix) : []
})

provide('navigation', navigation)
// TODO: Move folder definition to a separate file
const wikiFolder = '/wiki'
const navigationWiki = computed(() => {
  return localizedNavigation.value?.find(item => item._path === wikiFolder)?.children?.map(item => ({
    ...item,
    firstLink: item.children?.[0]?._path ?? item._path,
  }))
})

provide('navigation-wiki', navigationWiki)

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SectionsFooter />
    <ClientOnly>
      <UiSearchModal />
    </ClientOnly>
  </ConfigProvider>
</template>
