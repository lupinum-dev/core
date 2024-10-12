// Function to convert kebab-case to Title Case
import type { Ref } from 'vue'

export function toTitleCase(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

interface NavigationItem {
  _path?: string
  children?: NavigationItem[]
  [key: string]: any
}

export function removeLocalePrefix(item: NavigationItem, locale: Ref<string>): NavigationItem {
  const newItem = { ...item }
  if (newItem._path) {
    newItem._path = newItem._path.replace(new RegExp(`^/${locale.value}`), '')
  }
  if (newItem.children) {
    newItem.children = newItem.children.map(child => removeLocalePrefix(child, locale))
  }
  return newItem
}
