import { ref } from 'vue'

const isOpen = ref(false)

export function useSearchModal() {
  function openDialog() {
    isOpen.value = true
  }

  function closeDialog() {
    isOpen.value = false
  }

  return {
    isOpen,
    openDialog,
    closeDialog
  }
}
