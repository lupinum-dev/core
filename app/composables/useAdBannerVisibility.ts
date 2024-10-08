import { computed } from 'vue'
import { useScroll } from '@vueuse/core'

const useSharedAdBannerVisible = () => useState('adBannerVisible', () => true)
const useSharedHideOnScroll = () => useState('hideOnScroll', () => true)
const useSharedCookieKey = () => useState('adBannerCookieKey', () => 'header-ad')

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

  const adDismissed = useCookie<boolean>(cookieKey.value, {
    maxAge: 60 * 60 * 24 * 30,
  })

  const isVisible = computed(() => {
    if (adDismissed.value) {
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
      adDismissed.value = true
    }
  }

  const setHideOnScroll = (value: boolean) => {
    hideOnScroll.value = value
  }

  const setCookieKey = (value: string) => {
    cookieKey.value = value
    adDismissed.value = useCookie<boolean>(value, {
      maxAge: 60 * 60 * 24 * 30,
    }).value
  }

  return {
    isVisible,
    setAdBannerVisibility,
    setHideOnScroll,
    setCookieKey,
  }
}
