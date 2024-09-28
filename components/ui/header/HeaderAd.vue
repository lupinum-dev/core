<script setup lang="ts">
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

interface Props {
  adKey?: string
  letClose?: boolean
  closingIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  adKey: 'banner',
  letClose: true,
  closingIcon: 'heroicons:x-mark-20-solid',
})

const { isVisible, setAdBannerVisibility } = useAdBannerVisibility()

function closeAdBanner() {
  setAdBannerVisibility(false)
}
</script>

<template>
  <Transition name="ad-banner">
    <div
      v-if="isVisible"
      class="ad-banner fixed top-0 isolate z-30 flex h-[var(--header-ad-height)] w-full items-center justify-between bg-accent px-6"
    >
      <div class="flex w-full justify-center text-center">
        <slot />
      </div>
      <div class="right-0 top-0 justify-end">
        <slot name="icon">
          <button
            v-if="props.letClose"
            class="flex items-center justify-center"
            aria-label="Close banner"
            @click="closeAdBanner"
          >
            <Icon :name="props.closingIcon" class="size-5" />
          </button>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.ad-banner {
  transition: all 0.3s ease-in-out;
}

.ad-banner-enter-active,
.ad-banner-leave-active {
  transition: all 0.3s ease-in-out;
}

.ad-banner-enter-from,
.ad-banner-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.ad-banner-enter-to,
.ad-banner-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
