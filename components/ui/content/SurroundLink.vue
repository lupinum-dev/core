<script setup lang="ts">
import type { PropType } from 'vue'
import type { ParsedContent } from '@nuxt/content'

const props = defineProps({
  link: {
    type: Object as PropType<Pick<ParsedContent, 'url' | 'title' | '_path'> | null>,
    default: null,
  },
  isNext: {
    type: Boolean,
    default: false,
  },
})

const containerClasses = computed(() => [
  'flex w-full h-full flex-col gap-2 rounded-lg text-md transition-colors',
  { 'col-start-2 text-end': props.isNext },
  { group: props.link !== null },
])

const linkClasses = computed(() => [
  'flex w-full h-full flex-col gap-2 rounded-lg ring-1 ring-gray-o-1 p-4 shadow-sm dark:shadow-white/10 transition-all duration-300 text-md transition-colors bg-gray-b-1',
  {
    'col-start-2 text-end': props.isNext,
    'group-hover:ring-2 group-hover:ring-gray-o-2 group-hover:bg-gray-b-2': props.link !== null,
  },
])

const iconContainerClasses = computed(() => [
  'inline-flex items-center gap-0.5',
  { 'flex-row-reverse': props.isNext },
])

const iconName = computed(() => props.isNext ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left')
</script>

<template>
  <div :class="containerClasses">
    <NuxtLink v-if="link" :to="link._path" :class="linkClasses">
      <div :class="iconContainerClasses">
        <Icon :name="iconName" class="size-4 text-gray-t-2" />
        <p class="font-heading-med text-md text-gray-t-3">
          {{ isNext ? 'Next' : 'Previous' }}
        </p>
      </div>
      <p class="font-heading text-lg text-gray-t-1">
        {{ link.title }}
      </p>
    </NuxtLink>
    <div v-else :class="linkClasses" class="opacity-75">
      <!-- Empty placeholder to maintain layout -->
    </div>
  </div>
</template>
