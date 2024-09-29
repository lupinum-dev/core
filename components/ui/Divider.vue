<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  className: '',
})

const dividerClass = computed(() => [
  'shrink-0 bg-border',
  props.orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
  props.className,
])
</script>

<template>
  <div :class="dividerClass" role="separator" />
</template>
