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
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
