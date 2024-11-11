<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { ConfigProvider } from 'radix-vue'
import { configure } from 'vee-validate'
import { removeLocalePrefix } from '~/utils/content'

const i18nHead = useLocaleHead()
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },

})
const headerState = ref(false)
provide('headerState', headerState)

const lockScroll = ref<ReturnType<typeof useScrollLock> | null>(null)

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

const localizedNavigation = computed(() => {
  const localeNavigation = navigation.value?.find(item => item._path === `/${locale.value}`)?.children
  return localeNavigation ? localeNavigation.map(item => removeLocalePrefix(item, locale)) : []
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

const crisp = useScriptCrisp({
  id: '8c02513f-167b-41ac-9612-a40d88a7c0ee'
})
crisp.set('user:nickname', 'Matthias')

</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SectionsFooter />
    <!-- <ClientOnly>
      <UiSearchModal />
    </ClientOnly> -->
  </ConfigProvider>
</template>

<style>

</style>
