<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { watch } from 'vue'
import { type HeaderVariants, headerVariants } from './variants'
import { cn } from '@/lib/utils'
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

interface Props {
  variant?: HeaderVariants['variant']
  class?: HTMLAttributes['class']
  showAdBanner?: boolean
  adKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showAdBanner: true,
  adKey: 'banner',
})

const adDismissed = useCookie(`banner-${props.adKey}`, {
  default: () => false,
  watch: true,
  maxAge: 60 * 60 * 24 * 30, 
})

const { isAdBannerVisible, setAdBannerVisibility } = useAdBannerVisibility()

watch(() => props.showAdBanner, (newValue) => {
  setAdBannerVisibility(newValue && !adDismissed.value)
})

function closeAdBanner() {
  setAdBannerVisibility(false)
  adDismissed.value = true
}
</script>

<template>
  <header :class="cn('bg-gray-b-0 top-0 z-50 w-full border-b border-gray-o-1', props.class)">
    <Transition name="fade">
      <div v-if="isAdBannerVisible" class="relative flex h-10 w-full items-center justify-center bg-accent">
        <p class="font-sub text-sm text-prime-b-0">
          Agency Opening Deal:
          <NuxtLink to="/waitlist" class="ml-2 text-prime-b-0">
            Get 30% off until end of year for your next project
          </NuxtLink>
        </p>
        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 text-prime-t-1 hover:text-prime-t-2"
          aria-label="Close banner"
          @click="closeAdBanner"
        >
          <Icon name="heroicons:x-mark-20-solid" class="size-5" />
        </button>
      </div>
    </Transition>
    <div class="container flex h-[var(--header-height)] items-center justify-between">
      <div class="flex items-center">
        <slot name="left" />
      </div>

      <div class="hidden lg:block">
        <slot name="center" />
      </div>

      <slot name="right" />
    </div>
  </header>
</template>
