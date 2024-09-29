<script setup lang="ts">
import { useDebounceFn, useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const isScrolled = ref(false)
const previousScrollPosition = ref(0)

function updateIsScrolled() {
  const currentPosition = y.value
  const isScrollingUp = currentPosition < previousScrollPosition.value

  if (isScrollingUp && currentPosition === 0) {
    // Delay the logo reappearance when scrolling to the top
    setTimeout(() => {
      isScrolled.value = false
    }, 50)
  }
  else {
    // Immediately update when scrolling down
    isScrolled.value = currentPosition > 0
  }

  previousScrollPosition.value = currentPosition
}

watch(y, updateIsScrolled, { immediate: true })
</script>

<template>
  <!-- Default Header -->
  <UiHeader>
    <UiHeaderAd :scroll-hide="true" class="bg-accent-foreground text-background">
      <div class="flex flex-row gap-4 text-xs sm:gap-7 sm:text-base">
        <div>
          +43 664 8373842
        </div>
        <div>
          georg@gloesmann-bau.at
        </div>
      </div>
    </UiHeaderAd>
    <UiHeaderBar variant="bar">
      <template #left>
        <div class="relative flex items-center gap-4">
          <Transition name="fade-slide">
            <NuxtImg
              v-if="!isScrolled"
              src="/ginko_light.svg"
              alt="Ginko"
              class=" left-2 h-8 transition-transform duration-300 "
            />
          </Transition>

          <div
            :class="{ 'left-0': isScrolled, 'left-20': !isScrolled }"
            class="absolute transition-all duration-300"
          >
            <UiContentMobileToc />
          </div>
        </div>
      </template>
      <template #center />
      <template #right>
        <div class="flex items-center ">
          <UiButton variant="ghost" class="flex">
            <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
            <span class="ml-2 text-xs text-gray-400 lg:inline-block">Search Site  ⌘ + K</span>
          </UiButton>
          <UiButton variant="link">
            <Icon name="heroicons:sun-20-solid" class="size-5" />
          </UiButton>
          <UiButton variant="link">
            <Icon name="heroicons:language-20-solid" class="size-5" />
          </UiButton>
        </div>
        <div class="flex lg:hidden">
          <!-- Search Input -->
          <div class="relative" x-data="{ searchOpen: false }" />
        </div>
      </template>
    </UiHeaderBar>
  </UiHeader>

  <!-- Alternative Header -->
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
