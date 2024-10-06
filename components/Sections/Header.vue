<script setup lang="ts">

</script>

<template>
  <!-- Default Header -->
  <!-- TODO Abstract everything what is not needed away -->
  <UiHeaderWrapper>
    <UiHeaderAd class="bg-accent-foreground text-background">
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
          <UiHeaderLogo src-light="/logo_light.svg" src-dark="/logo_dark.svg" icon="/logo_icon.svg" size="base" />

          <!-- TODO I need to be able to change the offset of the Logo -->
          <!-- <div
              :class="{ 'left-0': isScrolled && isMobileScreen, 'left-20': !(isScrolled && isMobileScreen) }"
              class="absolute transition-all duration-300"
            >
              <UiContentMobileToc v-if="isTabletScreen" />
            </div> -->
        </div>
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
