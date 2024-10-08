<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 0)

const delayedIsScrolled = ref(false)

const currentText = computed(() => {
  if (y.value === 0)
    return 'On this page'
  if (y.value >= 300 && y.value < 2000)
    return 'Why not packaged as a dependency?'
  if (y.value >= 2000 && y.value < 4000)
    return 'Which frameworks are supported?'
  if (y.value >= 4000)
    return 'Can I use this in my project?'
  return 'On this page'
})

watch(isScrolled, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      delayedIsScrolled.value = true
    }, 100)
  }
  else {
    delayedIsScrolled.value = false
  }
})

const { activeLink } = useSharedTocState()
</script>

<template>
  <UiButton
    variant="ghost"
    class="flex size-full cursor-pointer items-center gap-2 text-nowrap p-2 text-left text-xs transition-all duration-300 hover:bg-muted md:px-3"
    aria-label="Table of Contents"
  >
    <Icon name="lucide:book-open" class="size-[15px] shrink-0" />
    <span
      class="font-heading-med max-w-[28ch] truncate text-xs transition-all duration-300"
    >
      <template v-if="activeLink">
        {{ activeLink }}
      </template>
      <div v-else class="flex items-center gap-2">
        On this page
        <Icon name="heroicons:chevron-down" class=" size-4" />
      </div>
    </span>
  </UiButton>
</template>
