<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'], showIcon?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, showIcon, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between pb-0.5 font-medium transition-all [&[data-state=open]_.rotate-icon]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <slot v-if="props.showIcon !== false" name="icon">
        <div class="flex size-5 items-center justify-center px-1">
          <Icon
            id="icon"
            name="heroicons:chevron-down"
            class="rotate-icon size-4 shrink-0 transition-transform duration-200"
          />
        </div>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
