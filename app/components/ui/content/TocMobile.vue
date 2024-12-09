    <script setup lang="ts">
    import { computed } from 'vue'
    import { useHeaderVisibility } from '@/composables/useHeaderVisibility'
    import { useSharedTocState } from '@/composables/useSharedTocState'

    const props = defineProps<{
      links: TocItem[]
    }>()

    interface TocItem {
      id: string
      depth: number
      text: string
      children?: TocItem[]
    }

    const { activeLink } = useSharedTocState()
    const { isHeaderVisible, isAdBannerVisible } = useHeaderVisibility()

    const topPosition = computed(() => {
      if (isHeaderVisible.value && isAdBannerVisible.value) {
        return 'calc(var(--header-height) + var(--header-banner))'
      }
      else if (isHeaderVisible.value) {
        return 'var(--header-height)'
      }
      else {
        return '0'
      }
    })
</script>

<template>
  <div
    class="sticky isolate z-10 overflow-hidden border-b border-border bg-background text-sm transition-all duration-300 xl:hidden"
    :style="{ top: topPosition }">
    {{ props.links }}
    <UiPopover>
      <UiPopoverTrigger
        class="inline-flex size-full items-center gap-2 text-nowrap px-4 py-2 text-left text-muted-foreground md:px-3"
        aria-label="Table of Contents">
        <Icon name="lucide:text" class="size-4 shrink-0" />
        <span class="font-pressura">On this page</span>

        <Icon name="lucide:chevron-right" class="-mx-1.5 size-4 shrink-0" />
        <span class="font-heading-med truncate text-[13px]">{{ activeLink || (props.links[0]?.text ?? '') }}</span>
      </UiPopoverTrigger>
      <UiPopoverContent align="start" class="ml-6 mt-0.5">
        <UiContentTocDesktop :links="props.links" class="px-3" />
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
