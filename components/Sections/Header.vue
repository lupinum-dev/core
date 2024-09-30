<script setup lang="ts">
import { useDebounceFn, useMediaQuery, useScroll } from '@vueuse/core'

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
const isMobileScreen = useMediaQuery('(max-width: 639px)')
const isTabletScreen = useMediaQuery('(max-width: 1023px)')

watch(y, updateIsScrolled, { immediate: true })
</script>

<template>
  <!-- Default Header -->
  <!-- TODO Abstract everything what is not needed away -->
  <UiHeaderWrapper>
    <UiHeaderAd :scroll-hide="false" :let-close="false" class="bg-accent-foreground text-background">
      <div class="flex flex-row gap-4 text-sm sm:gap-7 sm:text-base">
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
        <!-- TODO Make SSR compatible, currently hydration error -->
        <ClientOnly>
          <div class="relative flex items-center gap-4">
            <!-- TODO I need to able to change the logo size! -->
            <!-- TODO I need to make sure when the logo is pretty long, we need to show the icon only -->
            <Transition name="fade-slide">
              <!-- TODO Logo should support light and dark mode -->
              <NuxtImg
                v-if="!(isScrolled && isMobileScreen)"
                src="/ginko_light.svg"
                alt="Ginko"
                class="left-2 h-8 transition-transform duration-300"
              />
            </Transition>

            <!-- TODO I need to be able to change the offset of the Logo -->
            <div
              :class="{ 'left-0': isScrolled && isMobileScreen, 'left-20': !(isScrolled && isMobileScreen) }"
              class="absolute transition-all duration-300"
            >
              <UiContentMobileToc v-if="isTabletScreen" />
            </div>
          </div>
        </ClientOnly>
      </template>
      <template #center>
        <SectionsNav />
      </template>
      <template #right />
      <template #mobile>
        <SectionsMobileNav />
      </template>
    </UiHeaderBar>
  </UiHeaderWrapper>
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
