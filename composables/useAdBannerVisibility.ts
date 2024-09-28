import { computed, ref } from 'vue'
import { useScroll } from '@vueuse/core'

const isAdBannerVisible = ref(true)
const { y: scrollY } = useScroll(window)
const threshold = 50 // Adjust this value to change when the banner hides

export function useAdBannerVisibility(hideOnScroll = false, cookieKey = 'ad-banner') {
  const adDismissed = cookieKey
    ? useCookie(cookieKey, {
      default: () => false,
      watch: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    : ref(false)

  let isVisible = ref(true)

  if (hideOnScroll) {
    isVisible = computed(() => {
      return isAdBannerVisible.value && !adDismissed.value && scrollY.value <= threshold
    })
  }
  else {
    isVisible = computed(() => {
      return isAdBannerVisible.value && !adDismissed.value
    })
  }

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
