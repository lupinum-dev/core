<script setup lang="ts">
import { computed } from 'vue'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: string }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="cn(
        'flex flex-1 items-center justify-between py-3 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        props.class,
      )"
    >
      <slot />
      <slot name="icon">
        <Icon name="lucide:chevron-down" class="size-4 shrink-0 transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
