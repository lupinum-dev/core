// Based on Vitepress 
// https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/outline.ts
// MIT Licensed

import type { Ref } from 'vue'
import { computed, ref } from 'vue'

interface TocItem {
  id: string
  depth: number
  text: string
  children?: TocItem[]
}

export function useActiveAnchor(
  container: Ref<HTMLElement | null>,
  marker: Ref<HTMLElement | null>,
  links: TocItem[],
) {
  const activeLink = ref<TocItem | null>(null)
  const flatLinks = computed(() => links.flatMap(link => [link, ...(link.children || [])]))

  // Add debug function
  const debugTocState = () => {
    console.group('TOC Debug Info')
    console.log('Available TOC IDs:', flatLinks.value.map(link => link?.id))
    console.log('Current Active Link:', activeLink.value)
    
    // Check if elements exist for each ID
    flatLinks.value.forEach(link => {
      const element = document.getElementById(link?.id)
      console.log(`Element for ID "${link?.id}":`, element ? 'Found' : 'Not Found')
    })
    console.groupEnd()
  }

  /**
   * Determines the active link based on the current scroll position
   * and updates the marker position accordingly.
   */
  const setActiveLink = () => {
    if (!container.value || !marker.value)
      return

    const { scrollY, innerHeight } = window
    const { offsetHeight } = document.body
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

    let active: TocItem | undefined

    if (scrollY === 0) {
      active = undefined
    }
    else if (isBottom) {
      active = flatLinks.value[flatLinks.value.length - 1]
    }
    else {
      // Add debugging for scroll position
      console.log('Current scroll position:', scrollY)
      
      for (let i = flatLinks.value.length - 1; i >= 0; i--) {
        const link = flatLinks.value[i]
        if (!link) continue
        
        const element = document.getElementById(link.id)
        if (element) {
          console.log(`Element "${link.id}" offsetTop:`, element.offsetTop)
          if (element.offsetTop <= scrollY + 200) {
            active = link
            break
          }
        }
      }
    }

    updateActiveLink(active)
    // Debug after update
    debugTocState()
  }

  /**
   * Updates the active link's class and calls updateMarker
   * @param active - The currently active TocItem
   */
  const updateActiveLink = (active: TocItem | undefined) => {
    const newActiveLink = active
      ? container.value?.querySelector(`a[href="#${active.id}"], a[href$="#${active.id}"]`) as HTMLAnchorElement | null
      : null

    if (newActiveLink) {
      activeLink.value = active || null
      container.value?.querySelectorAll('a').forEach(a => a.classList.remove('active'))
      newActiveLink.classList.add('active')
      updateMarker(newActiveLink)
    }
    else {
      activeLink.value = null
    }
  }

  /**
   * Updates the marker's position and visibility
   * @param link - The active HTMLAnchorElement
   */
  const updateMarker = (link: HTMLAnchorElement | null) => {
    if (!marker.value)
      return

    if (link) {
      const { offsetTop, offsetHeight } = link
      marker.value.style.top = `${offsetTop + offsetHeight / 2 - 9}px`
      marker.value.style.opacity = '1'
    }
    else {
      marker.value.style.opacity = '0'
    }
  }

  const initializeActiveLink = () => {
    const { scrollY } = window
    let active: TocItem | undefined

    for (let i = 0; i < flatLinks.value.length; i++) {
      const link = flatLinks.value[i]
      const element = document.getElementById(link.id)
      if (element && element.offsetTop > scrollY) {
        active = flatLinks.value[Math.max(0, i - 1)]
        break
      }
    }

    if (!active && flatLinks.value.length > 0) {
      active = flatLinks.value[0]
    }

    updateActiveLink(active)
  }

  return { setActiveLink, activeLink, initializeActiveLink }
}
