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
const { isVisible, setAdBannerVisibility, cookieKey } = useAdBannerVisibility()
const debugInfo = ref({
  adBannerVisible: isVisible.value,
  screenWidth: 0,
  screenHeight: 0,
  userAgent: '',
  cookieValue: '',
  cookieKey: cookieKey.value,
})

const updateDebugInfo = () => {
  const cookie = useCookie(cookieKey.value)
  debugInfo.value = {
    adBannerVisible: isVisible.value,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    userAgent: navigator.userAgent,
    cookieValue: cookie.value?.toString() ?? 'not set',
    cookieKey: cookieKey.value,
  }
}

onMounted(() => {
  updateDebugInfo()
  window.addEventListener('resize', updateDebugInfo)
})

const deleteCookie = () => {
  const cookie = useCookie(cookieKey.value)
  cookie.value = null
  setAdBannerVisibility(true)
  updateDebugInfo()
}

const toggleAdBanner = () => {
  setAdBannerVisibility(!isVisible.value)
  updateDebugInfo()
}
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
      <div class="mt-4 flex space-x-4">
        <button
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          @click="deleteCookie"
        >
          Delete Cookie
        </button>
        <button
          class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          @click="toggleAdBanner"
        >
          Toggle Ad Banner
        </button>
      </div>
    </div>
  </ConfigProvider>
</template>
