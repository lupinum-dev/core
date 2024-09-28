<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
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

const { isAdBannerVisible } = useAdBannerVisibility()
</script>

<template>
  <header v-if="props.variant === 'default'" :class="cn('bg-white isolate fixed z-50 w-full border-b border-gray-o-1', props.class)" :style="{ top: isAdBannerVisible ? 'var(--header-ad-height)' : '' }">
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

  <header v-else class="fixed isolate z-30 w-full" :style="{ top: isAdBannerVisible ? 'var(--header-ad-height)' : '' }">
    <div class="mx-auto mt-2 max-w-6xl px-3 md:mt-3 lg:px-6">
      <div class="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
        <div class="container flex h-[var(--header-height)] items-center justify-between">
          <div class="flex items-center">
            <slot name="left" />
          </div>

          <div class="hidden lg:block">
            <slot name="center" />
          </div>

          <slot name="right" />
        </div>
      </div>
    </div>
  </header>
</template>
