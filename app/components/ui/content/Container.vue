<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: '3xl',
})

const maxWidthClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-screen-sm'
    case 'md': return 'max-w-screen-md'
    case 'lg': return 'max-w-screen-lg'
    case 'xl': return 'max-w-screen-xl'
    case '2xl': return 'max-w-screen-2xl'
    case '3xl': return 'max-w-[1440px]'
    case '4xl': return 'max-w-[1920px]'
    case 'full': return 'max-w-full'
    default: return 'max-w-[1440px]'
  }
})
</script>

<template>
  <div :class="cn('container px-0 mx-auto  min-h-screen', maxWidthClass, props.class)">
    <slot />
  </div>
</template>
