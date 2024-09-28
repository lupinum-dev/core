<template>
  <!-- Default Header -->
  <UiHeader>
    <UiHeaderAd cookie-key="header-you-dont" :hide-on-scroll="false" class="bg-accent-foreground text-background">
      <div class="flex flex-row gap-7">
        <div>
          +43 664 8373842
        </div>
        <div>
          georg@gloesmann-bau.at
        </div>
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

  <!-- Alternative Header -->
</template>
