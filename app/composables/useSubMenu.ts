import { ref } from 'vue'

const currentSubmenuRoute = ref<string | null>(null)
const isSubmenuShown = ref(false)

export function useSubMenu() {
  const openSubmenu = (href: string) => {
    currentSubmenuRoute.value = href
    isSubmenuShown.value = true
  }

  const closeSubmenu = () => {
    currentSubmenuRoute.value = null
    isSubmenuShown.value = false
  }

  return {
    currentSubmenuRoute,
    isSubmenuShown,
    openSubmenu,
    closeSubmenu,
  }
}
