<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { onMounted, ref } from 'vue'

let lockScroll: ReturnType<typeof useScrollLock>

onMounted(() => {
  lockScroll = useScrollLock(document.body)
  lockScroll.value = false
})

const headerState = ref(false)
provide('headerState', headerState)

watch(headerState, (newState) => {
  lockScroll.value = newState
})
</script>

<template>
  <SectionsHeader />
  <div class="bg-gray-500 ">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
