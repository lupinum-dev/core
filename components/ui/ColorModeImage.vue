<script setup lang="ts">
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  dark: string
  light: string
  class?: string
}

const props = defineProps<Props>()

const lightClasses = computed(() => cn(props.class, 'dark:hidden'))
const darkClasses = computed(() => cn(props.class, 'hidden dark:block'))
</script>

<template>
  <NuxtImg :src="light" :class="lightClasses" v-bind="$attrs" />
  <NuxtImg :src="dark" :class="darkClasses" v-bind="$attrs" />
</template>
