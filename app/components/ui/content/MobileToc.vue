<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 0)

const delayedIsScrolled = ref(false)

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

const { activeLink, tocItems } = useSharedTocState()

// Find the parent heading when a child heading is active
const activeParentHeading = computed(() => {
  if (!activeLink.value) return null
  console.log(activeLink.value)
  
  // First check if activeLink is already a parent (depth 2)
  const parentHeading = tocItems.value.find(item => item.text === activeLink.value)
  console.log(parentHeading)
  if (parentHeading) return parentHeading.text

  // If not, find the parent of the active child heading
  for (const item of tocItems.value) {
    if (item.children?.some(child => child.text === activeLink.value)) {
      return item.text
    }
  }
  
  return null
})

const appConfig = useAppConfig()
</script>

<template>
  <UiPopover v-if="tocItems.length > 0">
    <UiPopoverTrigger>
      <UiButton
        variant="ghost"
        class="flex size-full cursor-pointer items-center gap-2 text-nowrap p-2 text-left text-xs transition-all duration-300 hover:bg-muted md:px-3"
        aria-label="Table of Contents"
      >
        <Icon :name="appConfig.header.toc.icon" class="size-[15px] shrink-0" />
        <span
          class="font-heading-med max-w-[28ch] truncate text-xs transition-all duration-300"
        >
          <template v-if="activeParentHeading">
            {{ activeParentHeading }}
          </template>
          <div v-else class="flex items-center gap-2">
            On this page
            <Icon name="heroicons:chevron-down" class="size-4" />
          </div>
        </span>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="ml-6 mt-0.5">
      <UiContentTocDesktop :links="tocItems" class="px-3" />
    </UiPopoverContent>
  </UiPopover>
</template>
