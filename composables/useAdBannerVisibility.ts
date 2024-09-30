import { computed } from 'vue'
import { useScroll } from '@vueuse/core'

const useSharedAdBannerVisible = () => useState('adBannerVisible', () => true)
const useSharedHideOnScroll = () => useState('hideOnScroll', () => true)
const useSharedCookieKey = () => useState('adBannerCookieKey', () => 'ad-banner')

export function useAdBannerVisibility() {
  const isAdBannerVisible = useSharedAdBannerVisible()
  const hideOnScroll = useSharedHideOnScroll()
  const cookieKey = useSharedCookieKey()

  // Use a computed for scrollY to ensure it's only accessed on the client-side
  const scrollY = computed(() => {
    if (process.client) {
      const { y } = useScroll(window)
      return y.value
    }
    return 0
  })

  const threshold = 50

  // Use a computed to create the cookie with the current cookieKey
  const adDismissed = computed(() => useCookie<boolean>(cookieKey.value, {
    maxAge: 60 * 60 * 24 * 30,
  }))

  const isVisible = computed(() => {
    if (adDismissed.value.value) {
      isAdBannerVisible.value = false
      return false
    }
    if (hideOnScroll.value) {
      return isAdBannerVisible.value && scrollY.value <= threshold
    }
    return isAdBannerVisible.value
  })

  const setAdBannerVisibility = (value: boolean) => {
    isAdBannerVisible.value = value
    if (!value) {
      adDismissed.value.value = true
    }
  }

  const setHideOnScroll = (value: boolean) => {
    hideOnScroll.value = value
  }

  const setCookieKey = (value: string) => {
    cookieKey.value = value
  }

  return {
    isVisible,
    setAdBannerVisibility,
    setHideOnScroll,
    setCookieKey,
    cookieKey, // Add this line to export cookieKey
  }
}
