<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { navigationMenuTriggerStyle } from './variants'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const appConfig = useAppConfig()
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group flex items-center', props.class)"
  >
    <slot />
    <Icon
      :name="appConfig.navigation.chevronIcon"
      class="relative  ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
