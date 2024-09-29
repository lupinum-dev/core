<script setup lang="ts">
import { computed, ref } from 'vue'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
  variant?: 'default' | 'bar'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
})

const { isVisible } = useAdBannerVisibility()

const isExpanded = ref(false)
const headerAdHeight = 32

const headerHeight = computed(() =>
  isExpanded.value ? `calc(95vh - ${headerAdHeight}px)` : '50px',
)

function toggleHeaderHeight() {
  isExpanded.value = !isExpanded.value
}

const headerStyle = computed(() => ({
  '--header-height': headerHeight.value,
  'height': headerHeight.value,
  'transition': 'height 0.3s ease-in-out',
}))

const topStyle = computed(() => ({
  top: isVisible.value ? 'var(--header-ad-height)' : '0',
}))
</script>

<template>
  <header

    :class="[
      props.variant === 'default'
        ? cn('bg-white isolate fixed z-50 w-full border-b border-gray-o-1 transition-all duration-300', props.class)
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
          { 'relative rounded-2xl border border-border bg-white/90 px-2 shadow-lg backdrop-blur-sm': props.variant !== 'default' },
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
            <UiButton variant="ghost" class="flex lg:hidden">
              <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
              <span class="ml-2 text-xs text-gray-400 lg:inline-block">Search ..</span>
            </UiButton>
            <UiButton variant="ghost" size="icon" class="lg:hidden" @click="toggleHeaderHeight">
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
          <nav v-if="isExpanded" class="flex-grow overflow-y-auto">
            <div class="h-px w-full bg-gray-o-1" />
            <ul class="mt-6 space-y-4 px-3 [&>*]:py-2 [&>*]:text-5xl">
              <li v-for="item in ['Home', 'About', 'Services', 'Contact']" :key="item">
                <a :href="`#${item.toLowerCase()}`" class="hover:text-primary-600 block">{{ item }}</a>
              </li>
            </ul>
          </nav>
        </Transition>
      </div>
    </div>
  </header>
</template>
