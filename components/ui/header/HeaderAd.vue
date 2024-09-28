<script setup lang="ts">
import { watch } from 'vue'
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
    <div
      v-if="isAdBannerVisible"
      class="fixed top-0 isolate z-30 flex h-[var(--header-ad-height)] w-full items-center justify-between bg-accent px-6"
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

<style global>

</style>
