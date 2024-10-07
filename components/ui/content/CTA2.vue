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
  <div class="not-prose space-md mb-8 mt-6 flex w-full items-center justify-between space-x-10 rounded-2xl bg-gray-b-1 p-5 ring-1 ring-gray-o-1">
    <Icon name="heroicons:clock-20-solid" class="size-10 flex-shrink-0 text-prime-c-1" />

    <div class="flex flex-1 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col space-y-0.5 text-center sm:text-left">
        <div class="font-heading-med text-sm text-prime-t-3">
          {{ randomCTA.question }}
        </div>
        <div class="font-heading text-lg text-prime-t-1">
          {{ randomCTA.statement }}
        </div>
      </div>

      <LibButton variant="default">
        {{ randomCTA.action }}
      </LibButton>
    </div>
  </div>
</template>
