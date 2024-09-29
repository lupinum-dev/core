<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { useScrollLock } from '@vueuse/core' // unlock

import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
})
const el = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(el)

isLocked.value = true // lock
isLocked.value = false

interface Props {
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
  variant?: 'default' | 'bar'
}

const { isVisible } = useAdBannerVisibility()

const isExpanded = ref(false)
const headerAdHeight = 32

const headerHeight = computed(() =>
  isExpanded.value ? `calc(95vh - ${headerAdHeight}px)` : '50px',
)

const headerState = inject('headerState', false)

function toggleHeaderHeight() {
  isExpanded.value = !isExpanded.value
  headerState.value = !headerState.value
}

const headerStyle = computed(() => ({
  '--header-height': headerHeight.value,
  'height': headerHeight.value,
  'transition': 'height 0.3s ease-in-out',
}))

const topStyle = computed(() => ({
  top: isVisible.value ? 'var(--header-ad-height)' : '0',
}))

function toggleHeaderExpansion() {
  isExpanded.value = !isExpanded.value
}

provide('toggleHeaderExpansion', toggleHeaderExpansion)
</script>

<template>
  <header
    :class="[
      props.variant === 'default'
        ? cn('bg-background isolate fixed z-50 w-full border-b transition-all duration-300', props.class)
        : 'fixed isolate z-30 w-full transition-all duration-300',
    ]"
    :style="topStyle"
  >
    <div
      :class="[
        props.variant === 'default'
          ? 'container flex items-center justify-between'
          : 'mx-auto mt-2 max-w-6xl px-3 md:mt-3 lg:px-6',
      ]"
    >
      <div
        class="flex size-full flex-col" :class="[
          { 'relative rounded-2xl border bg-background/90 px-2 shadow-lg backdrop-blur-sm': props.variant !== 'default' },
        ]"
        :style="headerStyle"
      >
        <div class="flex items-start justify-between py-1">
          <div class="flex h-full items-center">
            <slot name="left" />
          </div>

          <div class="hidden h-full items-center lg:flex">
            <slot name="center" />
          </div>

          <div class="flex h-full items-center">
            <div class="hidden lg:block">
              <slot name="right" />
            </div>

            <UiButton variant="ghost" class="flex ">
              <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
              <span class="ml-2 hidden text-xs text-gray-400 sm:block lg:hidden">Search ..</span>
              <span class="ml-2 hidden text-xs text-gray-400 lg:inline-block">Search Site  ⌘ + K</span>
            </UiButton>
            <UiButton variant="link" class="hidden xl:block">
              <Icon name="heroicons:sun-20-solid" class="size-5" />
            </UiButton>
            <UiButton variant="link" class="hidden xl:block">
              <Icon name="heroicons:language-20-solid" class="size-5" />
            </UiButton>

            <UiButton variant="ghost" size="icon" class="lg:hidden" @click="toggleHeaderExpansion">
              <Icon
                :name="isExpanded ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-3-bottom-right-20-solid'"
                class="size-5"
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
          <nav v-if="isExpanded" class="flex-grow overflow-y-auto">
            <div class="h-px w-full bg-border" />
            <slot name="mobile" />
          </nav>
        </Transition>
      </div>
    </div>
  </header>
</template>
