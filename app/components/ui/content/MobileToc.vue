<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import type { UiContentTocDesktop } from '#build/components'

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
const appConfig = useAppConfig()
</script>

<template>
  <UiPopover>
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
          <template v-if="activeLink">
            {{ activeLink }}
          </template>
          <div v-else class="flex items-center gap-2">
            On this page
            <Icon name="heroicons:chevron-down" class=" size-4" />
          </div>
        </span>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="ml-6 mt-0.5">
      <UiContentTocDesktop :links="tocItems" class="px-3" />
    </UiPopoverContent>
  </UiPopover>
</template>
