<script setup lang="ts">
import { useSearchModal } from '@/composables/useSearchModal'

const { isOpen, openDialog } = useSearchModal()

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: openDialog,
  },
})
</script>

<template>
  <UiDialog :open="isOpen" @update:open="isOpen = $event">
    <UiDialogContent variant="search" :close-button="false">
      <UiDialogTitle class="sr-only">
        Search Dialog
      </UiDialogTitle>
      <UiSearchDialog />
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>

</style>
