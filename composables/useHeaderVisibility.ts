import { onMounted, onUnmounted, ref } from 'vue'
import { useAdBannerVisibility } from './useAdBannerVisibility'

export function useHeaderVisibility() {
  const isHeaderVisible = ref(true)
  const { isAdBannerVisible } = useAdBannerVisibility()
  const lastScrollPosition = ref(0)

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition < lastScrollPosition.value) {
      isHeaderVisible.value = true
    }
    else if (currentScrollPosition > 50) {
      isHeaderVisible.value = false
    }
    
    lastScrollPosition.value = currentScrollPosition
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isHeaderVisible, isAdBannerVisible }
}
