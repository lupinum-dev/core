<script setup lang="ts">
import { useScroll, useWindowSize } from '@vueuse/core'
import { useAppConfig } from '#imports'

const { y } = useScroll(window)
const { width } = useWindowSize()

const isScrolled = computed(() => y.value > 0)
const isMobileScreen = computed(() => width.value < 640)
const isTabletScreen = computed(() => width.value < 1024)

// Content Site Handling
const appConfig = useAppConfig()
const contentRoutes = appConfig.navigation.contentRoutes

const route = useRoute()
const localePath = useLocalePath()

const isContentSite = computed(() => {
  return contentRoutes.some(path => 
    route.path === localePath(path) || route.path.startsWith(localePath(path))
  )
})

</script>

<template>
  <!-- Default Header -->
  <!-- TODO Abstract everything what is not needed away -->

  <UiHeaderWrapper>
    <UiHeaderAd cookie-key="test2" class="bg-accent-foreground text-background">
      <div class="flex flex-row gap-4 text-sm sm:gap-7 sm:text-base">
        <div>
          +43 664 8373842
        </div>
        <div>
          georg@gloesmann-bau.at
        </div>
      </div>
    </UiHeaderAd>

    <UiHeaderBar variant="bar" rounded="2xl">
      <template #left>
        <!-- TODO Make SSR compatible, currently hydration error -->

        <div class="relative flex items-center gap-4">
          <UiHeaderLogo
            src-light="/logo_light.svg"
            src-dark="/logo_dark.svg"
            icon-light="/icon_light.svg"
            icon-dark="/icon_dark.svg"
            :content-routes="contentRoutes"
          />

          <!-- TODO I need to be able to change the offset of the Logo -->
          <ClientOnly>
            <div
              v-if="appConfig.header.toc.showToc"
              :class="[
                isScrolled && isMobileScreen ? 'left-0' : appConfig.header.toc.offset,
                appConfig.header.toc.offsetSm
              ]"
              class="absolute mt-0.5 transition-all duration-300 sm:left-40"
            >
              <UiContentMobileToc v-if="isTabletScreen && isContentSite" />
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #center>
        <SectionsNav />
      </template>
      <template #right>
       
      </template>

    </UiHeaderBar>
  </UiHeaderWrapper>
</template>
