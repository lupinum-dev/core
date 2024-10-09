<script setup lang="ts">
import { useSearchModal } from '@/composables/useSearchModal'

defineProps({
  label: {
    type: String,
    default: 'Search...',
  },
})

const { openDialog } = useSearchModal()
const appConfig = useAppConfig()
</script>

<template>
  <UiButton variant="ghost" class=" items-center sm:flex" @click="openDialog">
    <Icon :name="appConfig.header.searchIcon" class="size-5" />
    <span class="ml-1 hidden text-xs text-gray-400 sm:block lg:hidden">Search ..</span>
    <span class="ml-1 hidden text-xs text-gray-400 lg:inline-block">Search Site ⌘ + K</span>
  </UiButton>
</template>
