<script setup lang="ts">
import { useScroll, useScrollLock } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { ConfigProvider } from 'radix-vue'
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

const headerState = ref(false)
provide('headerState', headerState)

let lockScroll: ReturnType<typeof useScrollLock>

onMounted(() => {
  lockScroll = useScrollLock(document.body)
  lockScroll.value = false
})

watch(headerState, (newState) => {
  lockScroll.value = newState
})

const useIdFunction = () => useId()
const { isVisible } = useAdBannerVisibility()

const { y: scrollY } = useScroll(window)
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="mt-20 text-7xl">
      Is visible: {{ isVisible }}
      Scroll position: {{ Math.round(scrollY) }}px
    </div>
  </ConfigProvider>
</template>
