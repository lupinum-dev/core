<script setup lang="ts">
import { AccordionRoot, type AccordionRootEmits, type AccordionRootProps, useForwardPropsEmits } from 'radix-vue'
import { type AccordionVariants, accordionVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props extends AccordionRootProps {
  variant?: AccordionVariants['variant']
  size?: AccordionVariants['size']
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn(accordionVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </AccordionRoot>
</template>