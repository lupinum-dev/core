<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { ConfigProvider } from 'radix-vue'

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
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <SectionsHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
