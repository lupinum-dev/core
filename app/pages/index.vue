<template>
  <div class="h-screen">
    <h1>Home</h1>
  </div>
  <div class="h-screen">
    <h1>Home</h1>
  </div>

  <div class="w-full mx-auto">
    <UiCarousel
    class="relative w-full max-w-sm"
    :opts="{
      align: 'start',
    }"
  >
    <UiCarouselContent>
      <UiCarouselItem v-for="(_, index) in 5" :key="index" class="md:basis-1/2 lg:basis-1/3">
        <div class="p-1">
          <UiCard>
            <UiCardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-3xl font-semibold">{{ index + 1 }}</span>
            </UiCardContent>
          </UiCard>
        </div>
      </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>

    <div class="flex justify-center">
      <UiButton>
        <Icon name="lucide:arrow-left" class="h-4 w-4 text-current" />
      </UiButton>
      <UiButton>
        <Icon name="lucide:arrow-right" class="h-4 w-4 text-current" />
      </UiButton>
    </div>

  </div>
</template>


