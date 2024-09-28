import { ref } from 'vue'

const isAdBannerVisible = ref(true)
// TODO: Make so that this is saved in a cookie and not in local storage

export function useAdBannerVisibility() {
  const setAdBannerVisibility = (value: boolean) => {
    isAdBannerVisible.value = value
  }

  return {
    isAdBannerVisible,
    setAdBannerVisibility
  }
}