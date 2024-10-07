<script setup lang="ts">
const ctaTexts = [
  {
    question: 'You learn better visually with Videos?',
    statement: 'Get access to our In-depth Video Course',
    action: 'Enroll now',
  },
  {
    question: 'Want to master our tools quickly?',
    statement: 'Dive into our comprehensive video tutorials',
    action: 'Start Learning',
  },
  {
    question: 'Struggling with complex concepts?',
    statement: 'Our video course breaks it down for you',
    action: 'Simplify Now',
  },
  {
    question: 'Need a visual guide to our ecosystem?',
    statement: 'Explore our step-by-step video lessons',
    action: 'Watch & Learn',
  },
  {
    question: 'Ready to level up your skills?',
    statement: 'Our video course is your fast-track to expertise',
    action: 'Upgrade Skills',
  },
]

const randomCTA = computed(() => ctaTexts[Math.floor(Math.random() * ctaTexts.length)])
</script>

<template>
  <div class="not-prose space-md mb-8 mt-6 flex w-full items-center justify-between space-x-10 rounded-2xl bg-card p-5 ring-1 ring-border">
    <Icon name="heroicons:academic-cap-16-solid" class="size-10 flex-shrink-0 text-primary" />

    <div class="flex flex-1 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col space-y-0.5 text-center sm:text-left">
        <div class="font-heading-med text-sm text-muted-foreground">
          {{ randomCTA.question }}
        </div>
        <div class="font-heading text-lg text-foreground">
          {{ randomCTA.statement }}
        </div>
      </div>

      <UiButton variant="default">
        {{ randomCTA.action }}
      </UiButton>
    </div>
  </div>
</template>
