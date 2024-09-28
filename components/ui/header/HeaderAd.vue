<script setup lang="ts">
import { watch } from 'vue'
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

interface Props {
  adKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  adKey: 'banner',
})

const adDismissed = useCookie(`banner-${props.adKey}`, {
  default: () => false,
  watch: true,
  maxAge: 60 * 60 * 24 * 30, 
})

const { isAdBannerVisible, setAdBannerVisibility } = useAdBannerVisibility()

watch(() => isAdBannerVisible.value, (newValue) => {
  setAdBannerVisibility(newValue && !adDismissed.value)
})

function closeAdBanner() {
  setAdBannerVisibility(false)
  adDismissed.value = true
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isAdBannerVisible" class="relative flex h-10 w-full items-center justify-center bg-accent">
      <p class="font-sub text-sm text-prime-b-0">
        <slot />
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
</template>
