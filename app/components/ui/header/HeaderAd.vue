<script setup lang="ts">
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

interface Props {
  adKey?: string
  letClose?: boolean
  closingIcon?: string
  scrollHide?: boolean
  cookieKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  adKey: 'banner',
  letClose: true,
  closingIcon: 'heroicons:x-mark-20-solid',
  scrollHide: true,
  cookieKey: 'header-ad',
})

const { isVisible, setHideOnScroll } = useAdBannerVisibility()

// Set the initial values based on props
setHideOnScroll(props.scrollHide)



</script>

<template>
  <Transition name="ad-banner">
    <div
      v-if="isVisible"
      class=" fixed left-0 top-0 z-30 flex h-[var(--header-ad-height)] w-screen items-center justify-between bg-accent px-6"
    >
      <div class="flex w-full justify-center text-center">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.ad-banner {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.ad-banner-enter-active,
.ad-banner-leave-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
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
