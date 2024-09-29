<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'

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
</script>

<template>
  <SectionsHeader />
  <Transition
    enter-active-class="transition-opacity duration-300 ease-in-out"
    leave-active-class="transition-opacity duration-300 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="headerState"
      class="fixed inset-0 bg-black bg-opacity-50 z-20"
    />
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
