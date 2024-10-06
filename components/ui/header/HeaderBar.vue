<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
  rounded: '2xl',
})

interface Props {
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
  variant?: 'default' | 'bar'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none'
}

const { isVisible } = useAdBannerVisibility()

const isExpanded = ref(false)

// TODO Make Header Variable in CSS and Nuxt Config
// When using the var(--header-height), the opening animation is croggy
const headerHeight = computed(() =>
  isExpanded.value
    ? props.variant === 'default'
      ? `calc(100dvh)`
      : `calc(100dvh - 16px)`
    : '50px',
)

const headerState = inject('headerState', ref(false))

const headerStyle = computed(() => ({
  '--header-height': headerHeight.value,
  'height': headerHeight.value,
  'transition': 'height 0.3s ease-in-out',
}))

const topStyle = computed(() => ({
  top: isVisible.value ? 'var(--header-ad-height)' : '0',
}))
const roundedClass = computed(() => {
  if (props.variant === 'default')
    return ''

  const roundedMap = {
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    'full': 'rounded-full',
    'none': '',
  }

  return roundedMap[props.rounded] || ''
})

function toggleHeaderExpansion() {
  isExpanded.value = !isExpanded.value
  headerState.value = isExpanded.value
}

provide('toggleHeaderExpansion', toggleHeaderExpansion)
</script>

<template>
  <header
    :class="cn(
      'isolate fixed w-dvw transition-all duration-300 ',
      props.variant === 'default' ? 'bg-background z-50 border-b' : 'z-30',
      props.class,
    )"
    :style="topStyle"
  >
    <div
      class="mx-auto transition-all duration-300" :class="[
        props.variant === 'default'
          ? 'flex items-center justify-between sm:container'
          : 'mt-2 max-w-6xl md:mt-3 lg:px-6',
        isExpanded ? 'sm:px-0' : 'px-3',
      ]"
    >
      <div
        class="flex size-full flex-col"
        :class="[
          roundedClass,
          { 'relative border bg-background/95 px-2 shadow-lg backdrop-blur-sm': props.variant !== 'default' },
        ]"
        :style="headerStyle"
      >
        <div class="flex items-center justify-between py-1">
          <div class="flex h-full items-center">
            <slot name="left" />
          </div>

          <div class="hidden h-full items-center lg:flex">
            <slot name="center" />
          </div>

          <div class="flex h-full items-center space-x-2">
            <div class="hidden lg:block">
              <slot name="right" />
            </div>

            <UiButton variant="ghost" class="flex items-center">
              <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
              <span class="ml-1 hidden text-xs text-gray-400 sm:block lg:hidden">Search ..</span>
              <span class="ml-1 hidden text-xs text-gray-400 lg:inline-block">Search Site ⌘ + K</span>
            </UiButton>

            <UiColorModeDropdown variant="ghost" size="sm" />

            <UiButton variant="ghost" class="hidden xl:flex">
              <Icon name="heroicons:language-20-solid" class="size-5" />
            </UiButton>

            <UiButton variant="ghost" class="lg:hidden" @click="toggleHeaderExpansion">
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
