<script setup lang="ts">
const ctaTexts = [
  {
    question: 'Wasting countless hours?',
    statement: 'Let\'s get professional help',
    action: 'Book our Agency',
  },
  {
    question: 'Drowning in documentation?',
    statement: 'Let us be your lifeline!',
    action: 'Rescue My Project',
  },
  {
    question: 'Code turning into spaghetti?',
    statement: 'We\'ll untangle the mess',
    action: 'Get Expert Help',
  },
  {
    question: 'Deadlines closing in?',
    statement: 'We\'ll accelerate your progress',
    action: 'Boost My Project',
  },
  {
    question: 'Features piling up?',
    statement: 'Let\'s prioritize and execute',
    action: 'Streamline Now',
  },
  {
    question: 'Want a stunning design?',
    statement: 'Let\'s create visual magic together',
    action: 'Elevate My UI',
  },
]

const randomCTA = computed(() => ctaTexts[Math.floor(Math.random() * ctaTexts.length)])
</script>

<template>
  <div class="not-prose mb-8 mt-6 flex w-full flex-col items-center rounded-2xl bg-card p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:space-x-6 sm:p-5 md:space-x-10">
    <Icon name="heroicons:clock-20-solid" class="mb-4 size-8 flex-shrink-0 text-primary sm:mb-0 sm:size-10" />

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
