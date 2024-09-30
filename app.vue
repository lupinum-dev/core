<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
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

// Debug information
const { isVisible } = useAdBannerVisibility()
const debugInfo = ref({
  adBannerVisible: isVisible.value,
  screenWidth: 0,
  screenHeight: 0,
  userAgent: '',
})

onMounted(() => {
  debugInfo.value.screenWidth = window.innerWidth
  debugInfo.value.screenHeight = window.innerHeight
  debugInfo.value.userAgent = navigator.userAgent
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Debug information -->
    <div class="fixed inset-x-0 bottom-0 z-50 bg-gray-800 p-4 text-sm text-white">
      <h3 class="mb-2 font-bold">
        Debug Info:
      </h3>
      <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
    </div>
  </ConfigProvider>
</template>
