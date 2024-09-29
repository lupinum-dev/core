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
    <UiHeaderBar variant="default">
      <template #left>
        <img src="/ginko_light.svg" alt="Ginko" class="h-9">
      </template>
      <template #center>
        Center
      </template>
      <template #right>
        <div class="flex items-center gap-2">
          <UiButton>1</UiButton>
          <UiButton>2</UiButton>
          <UiButton>3</UiButton>
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
