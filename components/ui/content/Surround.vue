<script setup lang="ts">
import type { PropType } from 'vue'
import type { ParsedContent } from '@nuxt/content'

const props = defineProps({
  surround: {
    type: Array as PropType<Pick<ParsedContent, 'url' | 'title' | '_path'>[]>,
    default: () => [],
  },
})

const prev = computed(() => props.surround[0] || null)
const next = computed(() => props.surround[1] || null)
</script>

<template>
  <div class="not-prose grid-cols-2 flex-col gap-4 space-y-3 pb-6 sm:grid sm:space-y-0">
    <UiSurroundLink
      :link="prev"
      :is-next="false"
    />

    <UiSurroundLink
      :link="next"
      :is-next="true"
    />
  </div>
</template>
