<script setup lang="ts">
type CTAItem = {
  question: string
  statement: string
  action: string
  icon: string
}

const ctaItems: CTAItem[] = [
  {
    question: 'Looking for a website that actually converts?',
    statement: 'Let us design a site that drives results for your business.',
    action: 'Get Started',
    icon: 'heroicons:globe-alt',
  },
  {
    question: 'Need a video that tells your story?',
    statement: 'We create videos that connect with your audience and inspire action.',
    action: 'Get Started',
    icon: 'heroicons:video-camera',
  },
  {
    question: 'Does your brand lack a clear identity?',
    statement: 'Our design experts will help you stand out with branding that resonates.',
    action: 'Get Started',
    icon: 'heroicons:paint-brush',
  },
  {
    question: 'Ready to boost your online presence?',
    statement: 'We combine web, video, and design to deliver impactful solutions.',
    action: 'Level Up Today',
    icon: 'heroicons:rocket-launch',
  },
  {
    question: 'Feel like your marketing strategy is missing something?',
    statement: 'Let us craft a custom plan to achieve your goals.',
    action: 'Talk to Us',
    icon: 'heroicons:presentation-chart-line',
  },
  {
    question: 'Need a website but don´t know where to start?',
    statement: 'We´ll guide you through every step and create a site you´ll love.',
    action: 'Start Your Project',
    icon: 'heroicons:light-bulb',
  },
  {
    question: 'Want videos that actually get views?',
    statement: 'We produce engaging content that captures attention.',
    action: 'Let´s Film',
    icon: 'heroicons:play-circle',
  },
  {
    question: 'Is your design not delivering results?',
    statement: 'Upgrade your visuals with designs that make an impact.',
    action: 'Get Started',
    icon: 'heroicons:sparkles',
  },
  {
    question: 'Struggling to stand out online?',
    statement: 'Our tailored solutions help you cut through the noise.',
    action: 'Be Unforgettable',
    icon: 'heroicons:star',
  },
  {
    question: 'Looking for a partner who gets your vision?',
    statement: 'We´re here to help bring your ideas to life.',
    action: 'Work With Us',
    icon: 'heroicons:users',
  },
]

// Use ref for reactive state
const selectedCTA = ref<CTAItem>(ctaItems[0])

// Select a random CTA on client-side only
onMounted(() => {
  selectedCTA.value = ctaItems[Math.floor(Math.random() * ctaItems.length)]
})
</script>

<template>
  <div
    class="not-prose mb-8 mt-6 flex w-full flex-col items-center rounded-2xl  p-4 bg-foreground dark:bg-background ring-1 ring-ring sm:flex-row sm:items-center sm:justify-between sm:space-x-6 sm:p-5 md:space-x-10"
  >
    <Icon
      :name="selectedCTA.icon"
      class="mb-4 size-8 flex-shrink-0 text-lupinumTeal sm:mb-0 sm:size-8"
    />

    <div
      class="flex flex-1 flex-col items-center  space-y-4 text-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:text-left lg:pr-1"
    >
      <div class="flex flex-col space-y-0.5">
        <div class="font-heading-med text-sm text-lupinumTeal">
          {{ selectedCTA.question }}
        </div>
        <div class="font-heading text-base text-background dark:text-foreground xl:text-lg">
          {{ selectedCTA.statement }}
        </div>
      </div>

      <UiButton variant="default" class="ml-3 bg-lupinumTeal hover:bg-lupinumTeal/80 text-foreground dark:text-background mt-2 w-full sm:mt-0 sm:w-auto rounded-full">
        {{ selectedCTA.action }}
      </UiButton>
    </div>
  </div>
</template>
