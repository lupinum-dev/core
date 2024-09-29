<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import { type HeaderVariants, headerVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
  variant?: 'default' | 'alternative'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
})

const { isVisible } = useAdBannerVisibility()

const isExpanded = ref(false)
const headerAdHeight = 32 // This should match the --header-ad-height in your CSS

const headerHeight = computed(() => {
  if (isExpanded.value) {
    return `calc(95vh - ${headerAdHeight}px)`
  }
  return '50px'
})

function toggleHeaderHeight() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <header
    v-if="props.variant === 'default'"
    :class="cn('bg-white isolate fixed z-50 w-full border-b border-gray-o-1 transition-all duration-300', props.class)"
    :style="{ top: isVisible ? 'var(--header-ad-height)' : '0' }"
  >
    <div class="container flex h-[var(--header-height)] items-center justify-between">
      <div class="flex items-center">
        <slot name="left" />
      </div>

      <div class="hidden lg:block">
        <slot name="center" />
      </div>

      <slot name="right" />
    </div>
  </header>

  <header
    v-else
    class="fixed isolate z-30 w-full transition-all duration-300"
    :style="{ top: isVisible ? 'var(--header-ad-height)' : '0' }"
  >
    <div class="mx-auto mt-2 max-w-6xl px-3 md:mt-3 lg:px-6">
      <div
        class="relative flex flex-col justify-between gap-3 rounded-2xl bg-white/90 px-2 shadow-lg backdrop-blur-sm"
        :style="{
          '--header-height': headerHeight,
          'height': headerHeight,
          'transition': 'height 0.3s ease-in-out',
        }"
      >
        <div class=" flex h-full flex-col">
          <div class="flex items-start justify-between py-1">
            <div class="flex items-center">
              <slot name="left" />
            </div>

            <div class="hidden lg:block">
              <slot name="center" />
            </div>

            <div class="flex items-center">
              <div class="hidden lg:block">
                <slot name="right" />
              </div>
              <UiButton variant="ghost">
                <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
                <span class="ml-2 text-xs text-gray-400 lg:inline-block">Search ..</span>
              </UiButton>
              <UiButton v-if="props.variant === 'alternative'" variant="ghost" size="icon" class="lg:hidden" @click="toggleHeaderHeight">
                <Icon
                  :name="isExpanded ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-3-bottom-right-20-solid'"
                  class="size-7"
                />
              </UiButton>
            </div>
          </div>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <!-- DIVIDER -->

            <nav v-if="isExpanded" class="flex-grow overflow-y-auto">
              <div class="h-px w-full bg-gray-o-1" />
              <ul class="mt-6 space-y-4 px-3 [&>*]:py-2 [&>*]:text-5xl">
                <li><a href="#" class="hover:text-primary-600 block  ">Home</a></li>
                <li><a href="#" class="hover:text-primary-600 block  ">About</a></li>
                <li><a href="#" class="hover:text-primary-600 block  ">Services</a></li>
                <li><a href="#" class="hover:text-primary-600 block  ">Contact</a></li>
                <li><a href="#" class="hover:text-primary-600 block  ">Home</a></li>
              </ul>
            </nav>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>
