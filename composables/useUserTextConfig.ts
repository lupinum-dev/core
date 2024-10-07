import { useLocalStorage } from '@vueuse/core'

export function useUserTextConfig() {
  return useLocalStorage('userTextConfig', {
    font: 'font-sans',
    size: 'text-base',
    lineHeight: 'leading-normal',
  })
}