import { watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function useExpandedItems(route: RouteLocationNormalizedLoaded, router: any) {
  const expandedItems = useLocalStorage<string[]>('tree-expanded-items', ['components'])

  const updateExpandedItems = (path: string) => {
    const pathParts = path.split('/').filter(Boolean)
    let currentPath = ''
    const newExpandedItems = new Set(expandedItems.value)

    for (const part of pathParts) {
      currentPath += `/${part}`
      if (!newExpandedItems.has(currentPath)) {
        newExpandedItems.add(currentPath)
      }
    }

    expandedItems.value = Array.from(newExpandedItems)
  }

  watch(() => route.path, (newPath) => {
    updateExpandedItems(newPath)
  }, { immediate: true })

  const handleExpand = (expandedKeys: string[]) => {
    expandedItems.value = expandedKeys
  }

  const handleNavigate = (to: string, hasChildren: boolean) => {
    if (!hasChildren) {
      router.push(to)
    }
    else {
      const currentExpanded = new Set(expandedItems.value)
      if (currentExpanded.has(to)) {
        currentExpanded.delete(to)
      }
      else {
        currentExpanded.add(to)
      }
      expandedItems.value = Array.from(currentExpanded)
    }
  }

  const expandAll = (items: any[]) => {
    const allPaths = new Set<string>(['components'])
    const traverse = (item: any) => {
      allPaths.add(item.to)
      if (item.children) {
        item.children.forEach(traverse)
      }
    }
    items.forEach(traverse)
    expandedItems.value = Array.from(allPaths)
  }

  const closeAll = () => {
    expandedItems.value = ['components']
  }

  return {
    expandedItems,
    handleExpand,
    handleNavigate,
    updateExpandedItems,
    expandAll,
    closeAll,
  }
}
