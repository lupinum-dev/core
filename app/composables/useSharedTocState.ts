import { ref } from 'vue'

interface TocItem {
  id: string
  depth: number
  text: string
  children?: TocItem[]
}

const activeLink = ref<string | null>(null)
const tocItems = ref<TocItem[]>([])

export function useSharedTocState() {
  const setActiveLink = (link: string | null) => {
    activeLink.value = link
  }

  const setTocItems = (items: TocItem[]) => {
    tocItems.value = items
  }

  return {
    setActiveLink,
    activeLink,
    setTocItems,
    tocItems,
  }
}
