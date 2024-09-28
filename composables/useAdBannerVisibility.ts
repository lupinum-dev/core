import { computed, ref } from 'vue'
import { useScroll } from '@vueuse/core'

const isAdBannerVisible = ref(true)
const { y: scrollY } = useScroll(window)
const threshold = 50 // Adjust this value to change when the banner hides

export function useAdBannerVisibility(hideOnScroll = true, cookieKey = 'ad-banner') {
  console.log('useAdBannerVisibility', cookieKey)

  const adDismissed = useCookie<boolean>(cookieKey, {
    watch: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  const isVisible = computed(() => {
    if (adDismissed.value) {
      isAdBannerVisible.value = false
      return false
    }
    if (hideOnScroll) {
      return isAdBannerVisible.value && scrollY.value <= threshold
    }
    return isAdBannerVisible.value
  })

  const setAdBannerVisibility = (value: boolean) => {
    isAdBannerVisible.value = value
    if (!value) {
      adDismissed.value = true
    }
  }

  return {
    isVisible,
    setAdBannerVisibility,
  }
}
