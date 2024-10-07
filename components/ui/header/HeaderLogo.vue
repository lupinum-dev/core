<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode, useDebounceFn, useMediaQuery, useRoute, useScroll } from '@vueuse/core'

const props = withDefaults(defineProps<Props>(), {
  srcDark: '',
  srcLight: '',
  icon: '',
})
const { y } = useScroll(window)
const isScrolled = ref(false)
const previousScrollPosition = ref(0)

const updateIsScrolled = useDebounceFn(() => {
  const currentPosition = y.value
  const isScrollingUp = currentPosition < previousScrollPosition.value

  if (isScrollingUp && currentPosition === 0) {
    setTimeout(() => {
      isScrolled.value = false
    }, 50)
  }
  else {
    isScrolled.value = currentPosition > 0
  }

  previousScrollPosition.value = currentPosition
}, 10)

watch(y, updateIsScrolled, { immediate: true })

interface Props {
  srcDark?: string
  srcLight?: string
  icon?: string
}

const isContentSite = ref(true)

provide('isContentSite', isContentSite)

const showIcon = computed(() => isContentSite.value && !!props.icon)
const showLogo = computed(() => !isContentSite.value)
</script>

<template>
  <div class="ml-2">
    <ClientOnly>
      <Transition name="fade-slide" class="sm:hidden">
        <NuxtLink v-if="!isScrolled" to="/" class="flex items-center">
          <NuxtImg
            v-if="showIcon"
            :src="props.icon"
            alt="Logo Icon"
            class="h-7 sm:hidden"
          />
          <UiColorModeImage
            v-if="showLogo"
            light="/logo_light.svg"
            dark="/logo_dark.svg"
            alt="Logo"
            class="h-7"
          />
        </NuxtLink>
      </Transition>
      <div class="hidden sm:block">
        <UiColorModeImage
          v-if="showLogo"
          light="/logo_light.svg"
          dark="/logo_dark.svg"
          alt="Logo"
          class="h-7"
        />
        <NuxtImg
          v-else-if="showIcon"
          :src="props.icon"
          alt="Logo Icon"
          class="h-7"
        />
      </div>

      <template #fallback>
        <NuxtLink to="/" class="flex items-center">
          <NuxtImg
            v-if="showIcon"
            :src="icon"
            alt="Logo Icon"
            class="h-7 sm:hidden"
          />
          <UiColorModeImage
            v-if="showLogo"
            light="/logo_light.svg"
            dark="/logo_dark.svg"
            alt="Logo"
            class="h-7"
          />
        </NuxtLink>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
