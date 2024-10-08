import { ref } from 'vue'

const activeLink = ref<string | null>(null)
const tocItems = ref([])
export function useSharedTocState() {
  const setActiveLink = (link: string | null) => {
    activeLink.value = link
  }

  const setTocItems = (items) => {
    tocItems.value = items
  }

  return {
    setActiveLink,
    activeLink,
    setTocItems,
    tocItems,

  }
}
