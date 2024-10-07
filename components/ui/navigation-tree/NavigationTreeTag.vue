<script setup lang="ts">
const props = defineProps<{
  type: 'updated' | 'wip' | 'outdated' | 'new' | 'draft'
  variant: 'dashed' | 'rounded'
}>()

const tagStyles = computed(() => {
  const baseStyles = {
    updated: 'bg-blue-50 text-blue-600 dark:text-blue-500 dark:bg-blue-950',
    wip: 'bg-yellow-50 text-yellow-600 darktext-yellow-500 dark:bg-yellow-950',
    outdated: 'bg-red-50 text-red-600 dark:text-red-500 dark:bg-red-950',
    new: 'bg-green-50 text-green-600 dark:text-green-500 dark:bg-green-950',
    draft: 'bg-fuchsia-50 text-fuchsia-600 dark:text-fuchsia-500 dark:bg-fuchsia-950',
  }[props.type]

  const variantStyles = props.variant === 'rounded'
    ? 'rounded-sm px-1.5 py-0.5 ring-1 ring-inset'
    : 'px-[0.1875rem]'

  const ringColor = props.variant === 'rounded'
    ? {
        updated: 'ring-blue-500/20 dark:ring-blue-500/30',
        wip: 'ring-yellow-500/20 dark:ring-yellow-500/30',
        outdated: 'ring-red-500/20 dark:ring-red-500/30',
        new: 'ring-green-500/20 dark:ring-green-500/30',
        draft: 'ring-fuchsia-500/20 dark:ring-fuchsia-500/30',
      }[props.type]
    : ''

  return `${baseStyles} ${variantStyles} ${ringColor}`
})
</script>

<template>
  <span :class="`relative inline-flex items-center text-xs font-medium ${tagStyles}`">
    {{ props.type }}
    <template v-if="variant === 'dashed'">
      <span class="absolute inset-x-[-0.1875rem] -top-px block transform-gpu text-current">
        <svg width="100%" height="1" stroke="currentColor" stroke-dasharray="3.3 1" aria-hidden="true">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" />
        </svg>
      </span>
      <span class="absolute inset-x-[-0.1875rem] -bottom-px block transform-gpu text-current">
        <svg width="100%" height="1" stroke="currentColor" stroke-dasharray="3.3 1" aria-hidden="true">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" />
        </svg>
      </span>
      <span class="absolute inset-y-[-0.1875rem] -left-px block transform-gpu text-current">
        <svg width="1" height="100%" stroke="currentColor" stroke-dasharray="3.3 1" aria-hidden="true">
          <line x1="0.5" y1="0" x2="0.5" y2="100%" />
        </svg>
      </span>
      <span class="absolute inset-y-[-0.1875rem] -right-px block transform-gpu text-current">
        <svg width="1" height="100%" stroke="currentColor" stroke-dasharray="3.3 1" aria-hidden="true">
          <line x1="0.5" y1="0" x2="0.5" y2="100%" />
        </svg>
      </span>
    </template>
  </span>
</template>
