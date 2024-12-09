// Based on Vitepress 
// https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/outline.ts
// MIT Licensed

import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

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
  const tocLinks = ref<TocItem[]>(links)
  const flatLinks = computed(() => 
    tocLinks.value
      .flatMap(link => [link, ...(link.children || [])])
      .filter(Boolean)
  )

  watch(() => links, (newLinks) => {
    tocLinks.value = newLinks
  }, { immediate: true, deep: true })

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
    else if (isBottom && flatLinks.value.length) {
      active = flatLinks.value[flatLinks.value.length - 1]
    }
    else {
      for (let i = flatLinks.value.length - 1; i >= 0; i--) {
        const link = flatLinks.value[i]
        if (!link) continue
        
        const element = document.getElementById(link.id)
        if (element && element.offsetTop <= scrollY + 200) {
          active = link
          break
        }
      }
    }

    updateActiveLink(active)
  }

  const updateActiveLink = (active: TocItem | undefined) => {
    if (!active) {
      activeLink.value = null
      return
    }

    const selector = `a[href="#${active.id}"], a[href$="#${active.id}"], a[href="#${encodeURIComponent(active.id)}"], a[href$="${encodeURIComponent(active.id)}"]`

    const newActiveLink = container.value?.querySelector(selector) as HTMLAnchorElement | null

    if (newActiveLink) {
      activeLink.value = active
      container.value?.querySelectorAll('a').forEach(a => a.classList.remove('active'))
      newActiveLink.classList.add('active')
      updateMarker(newActiveLink)
    }
    else {
      activeLink.value = null
    }
  }

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

    for (const link of flatLinks.value) {
      if (!link) continue
      const element = document.getElementById(link.id)
      if (element && element.offsetTop > scrollY) {
        const currentIndex = flatLinks.value.indexOf(link)
        active = flatLinks.value[Math.max(0, currentIndex - 1)]
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

