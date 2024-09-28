<template>
  <UiHeader variant="transparent">
    <UiHeaderAd>

      <div class="flex items-center justify-center w-full h-full bg-accent-foreground text-background">
      Agency Opening Deal:
      <NuxtLink to="/waitlist" class="ml-2 text-prime-b-0">
        Get 30% off until end of year for your next project
      </NuxtLink>
    </div>

    </UiHeaderAd>
    <UiHeaderBar>
    <template #left>
      Left
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
    </template>
  </UiHeaderBar>
  </UiHeader>
</template>