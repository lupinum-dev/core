<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type HeaderVariants, headerVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  variant?: HeaderVariants['variant']
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
  style?: 'default' | 'alternative'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
  style: 'default',
})
</script>

<template>
  <header v-if="props.style === 'default'" :class="cn('bg-gray-b-0 top-0 z-50 w-full border-b border-gray-o-1', props.class)">
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

  <header v-else class="fixed top-2 z-30 w-full md:top-6">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
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
