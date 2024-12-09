import { computed } from 'vue'
import { useScroll } from '@vueuse/core'

const useSharedAdBannerVisible = () => useState('adBannerVisible', () => true)
const useSharedHideOnScroll = () => useState('hideOnScroll', () => true)

export function useAdBannerVisibility() {
  const isAdBannerVisible = useSharedAdBannerVisible()
  const hideOnScroll = useSharedHideOnScroll()

  // Use a computed for scrollY to ensure it's only accessed on the client-side
  const scrollY = computed(() => {
    if (process.client) {
      const { y } = useScroll(window)
      return y.value
    }
    return 0
  })

  const threshold = 50



  const isVisible = computed(() => {
    if (hideOnScroll.value) {
      return isAdBannerVisible.value && scrollY.value <= threshold
    }
    return isAdBannerVisible.value
  })



  const setHideOnScroll = (value: boolean) => {
    hideOnScroll.value = value
  }


  return {
    isVisible,
    setHideOnScroll,
  }
}
