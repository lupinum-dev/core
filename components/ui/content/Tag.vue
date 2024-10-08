<script setup lang="ts">
const props = defineProps<{
  type: 'updated' | 'wip' | 'outdated' | 'new'
}>()

const tagStyles = computed(() => {
  switch (props.type) {
    case 'updated':
      return 'bg-blue-50 text-blue-500 dark:bg-blue-950'
    case 'wip':
      return 'bg-yellow-50 text-yellow-500 dark:bg-yellow-950 '
    case 'outdated':
      return 'bg-red-50 text-red-500 dark:bg-red-950 '
    case 'new':
      return 'bg-green-50 text-green-500 dark:bg-green-950 '
    default:
      return ''
  }
})
</script>

<template>
  <span :class="`relative inline-flex px-[0.1875rem] text-[0.625rem]/[0.875rem] font-medium ${tagStyles}  `">
    {{ props.type }}
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
  </span>
</template>
