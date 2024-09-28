import { computed, ref } from 'vue'
import { useScroll } from '@vueuse/core'

const useSharedAdBannerVisible = () => useState('adBannerVisible', () => true)

export function useAdBannerVisibility(hideOnScroll = true, cookieKey = 'ad-banner') {
  console.log('hideOnScroll', hideOnScroll)
  const isAdBannerVisible = useSharedAdBannerVisible()
  const { y: scrollY } = useScroll(window)
  const threshold = 50

  const instances = new Map<string, { hideOnScroll: boolean, cookieKey: string }>()

  if (!instances.has(cookieKey)) {
    instances.set(cookieKey, { hideOnScroll, cookieKey })
  }

  const adDismissed = useCookie<boolean>(cookieKey, {
    maxAge: 60 * 60 * 24 * 30,
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
