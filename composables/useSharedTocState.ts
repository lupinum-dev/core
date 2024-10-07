import { ref } from 'vue'

const activeLink = ref<string | null>(null)

export function useSharedTocState() {
  const setActiveLink = (link: string | null) => {
    activeLink.value = link
  }

  return {
    activeLink,
    setActiveLink
  }
}