<script setup lang="ts">
import { computed } from 'vue'

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
  <div class="not-prose mb-8 mt-6 flex w-full flex-col items-center rounded-2xl bg-card p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:space-x-6 sm:p-5 md:space-x-10">
    <Icon name="heroicons:academic-cap-20-solid" class="mb-4 size-8 flex-shrink-0 text-primary sm:mb-0 sm:size-10" />

    <div class="flex flex-1 flex-col items-center space-y-4 text-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:text-left lg:pr-1">
      <div class="flex flex-col space-y-0.5">
        <div class="font-heading-med text-sm text-muted-foreground">
          {{ randomCTA.question }}
        </div>
        <div class="font-heading text-base text-foreground xl:text-lg">
          {{ randomCTA.statement }}
        </div>
      </div>

      <UiButton variant="default" class="mt-2 w-full sm:mt-0 sm:w-auto">
        {{ randomCTA.action }}
      </UiButton>
    </div>
  </div>
</template>
