<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { dialogContentVariants } from './variants'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<DialogContentProps & {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'large' | 'full' | 'search'
  closeButton?: boolean
}>(), {
  closeButton: true,
})

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant, closeButton, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="cn(dialogContentVariants({ variant: props.variant }), props.class)"
    >
      <slot />

      <DialogClose
        v-if="props.closeButton"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <Icon name="i-heroicons-x-mark-20-solid" class="size-4 text-muted-foreground" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
