import { useScrollLock } from '@vueuse/core'

export default defineNuxtPlugin(() => {
  const lockScroll = useScrollLock(document.body)

  return {
    provide: {
      scrollLock: (state: boolean) => {
        lockScroll.value = state
      }
    }
  }
})