<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 0)

const delayedIsScrolled = ref(false)
const maxWidth = ref('16ch')

watch(isScrolled, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      delayedIsScrolled.value = true
    }, 25)
  }
  else {
    delayedIsScrolled.value = false
  }
})

watch(delayedIsScrolled, (newValue) => {
  if (newValue) {
    maxWidth.value = '29ch'
  }
  else {
    setTimeout(() => {
      maxWidth.value = '16ch'
    }, 100)
  }
}, { immediate: true })
</script>

<template>
  <UiButton
    variant="ghost"
    class="inline-flex size-full items-center gap-2 text-nowrap p-2 text-left text-xs  transition-all duration-300 sm:ml-4 md:px-3"
    aria-label="Table of Contents"
    :class="{ 'sm:ml-0': isScrolled }"
  >
    <Icon name="lucide:text" class="size-4 shrink-0" />
    <span
      class="font-heading-med overflow-hidden truncate text-xs transition-all duration-300"
      :style="{ maxWidth }"
    >
      On this page
    </span>
  </UiButton>
</template>
