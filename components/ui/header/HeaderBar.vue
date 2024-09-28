<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type HeaderVariants, headerVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  variant?: HeaderVariants['variant']
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
})
</script>

<template>
  <header :class="cn('bg-gray-b-0 top-0 z-50 w-full border-b border-gray-o-1', props.class)">
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
</template>
