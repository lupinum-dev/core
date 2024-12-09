import { computed, ref } from 'vue'
import { useScroll } from '@vueuse/core'

const useSharedAdBannerVisible = () => useState('adBannerVisible', () => true)
const useSharedHideOnScroll = () => useState('hideOnScroll', () => true)

export function useAdBannerVisibility() {
  const isAdBannerVisible = useSharedAdBannerVisible()
  const hideOnScroll = useSharedHideOnScroll()

  // Initialize with null for SSG compatibility
  const scrollY = ref(0)

  // Only setup scroll watching on client-side
  if (process.client) {
    const { y } = useScroll(window, { 
      throttle: 300,
    })
    
    watch(y, (newY) => {
      scrollY.value = newY
    }, { immediate: true })
  }

  const threshold = 50

  const isVisible = computed(() => {
    // For SSG/SSR, default to visible if no scroll handling
    if (!process.client)
      return isAdBannerVisible.value

    // Client-side scroll handling
    if (hideOnScroll.value)
      return isAdBannerVisible.value && scrollY.value <= threshold

    return isAdBannerVisible.value
  })

  const setAdBannerVisibility = (value: boolean) => {
    isAdBannerVisible.value = value
  }

  const setHideOnScroll = (value: boolean) => {
    hideOnScroll.value = value
  }

  return {
    isVisible,
    setAdBannerVisibility,
    setHideOnScroll,
  }
}
