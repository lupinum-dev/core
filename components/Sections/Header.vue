<script setup lang="ts">
// No need for any script setup now
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
        <img src="/ginko_light.svg" alt="Ginko" class="ml-2 h-9">
      </template>
      <template #center>
        <SectionsNav />
      </template>
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
