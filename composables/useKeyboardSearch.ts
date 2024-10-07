import { ref } from 'vue'

export function useKeyboardSearch() {
  const isKeyboardNavigation = ref(false)

  const enableKeyboardNavigation = () => {
    isKeyboardNavigation.value = true
  }

  const disableKeyboardNavigation = () => {
    isKeyboardNavigation.value = false
  }

  return {
    isKeyboardNavigation,
    enableKeyboardNavigation,
    disableKeyboardNavigation,
  }
}
