<script setup lang="ts">
import { watch } from 'vue'
import { useAdBannerVisibility } from '@/composables/useAdBannerVisibility'

type Size = 'sm' | 'base' | 'lg' | 'xl' | '2xl'

interface Props {
  adKey?: string
  size?: Size
  letClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  adKey: 'banner',
  size: 'base',
  letClose: true,
  closing,
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

const sizeClasses: Record<Size, string> = {
  'sm': 'h-8',
  'base': 'h-10',
  'lg': 'h-12',
  'xl': 'h-14',
  '2xl': 'h-16',
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isAdBannerVisible"
      class="relative flex w-full items-center justify-between bg-accent px-6"
      :class="[sizeClasses[props.size]]"
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
            <Icon name="heroicons:x-mark-20-solid" class="size-5" />
          </button>
        </slot>
      </div>
    </div>
  </Transition>
</template>
