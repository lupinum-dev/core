<script setup lang="ts">
import { NuxtLink } from '#components'

type CTAItem = {
  question: string
  statement: string
  action: string
  icon: string
}

// Move CTA items to i18n section
const { t } = useI18n()

const ctaItems = computed<CTAItem[]>(() => [
  {
    question: t('1_question'),
    statement: t('1_statement'),
    action: t('1_action'),
    icon: 'heroicons:globe-alt',
  },
  {
    question: t('2_question'),
    statement: t('2_statement'),
    action: t('2_action'),
    icon: 'heroicons:video-camera',
  },
  {
    question: t('3_question'),
    statement: t('3_statement'),
    action: t('3_action'),
    icon: 'heroicons:paint-brush',
  },
  {
    question: t('4_question'),
    statement: t('4_statement'),
    action: t('4_action'),
    icon: 'heroicons:rocket-launch',
  },
  {
    question: t('5_question'),
    statement: t('5_statement'),
    action: t('5_action'),
    icon: 'heroicons:presentation-chart-line',
  },
  {
    question: t('6_question'),
    statement: t('6_statement'),
    action: t('6_action'),
    icon: 'heroicons:light-bulb',
  },
  {
    question: t('7_question'),
    statement: t('7_statement'),
    action: t('7_action'),
    icon: 'heroicons:play-circle',
  },
  {
    question: t('8_question'),
    statement: t('8_statement'),
    action: t('8_action'),
    icon: 'heroicons:sparkles',
  },
  {
    question: t('9_question'),
    statement: t('9_statement'),
    action: t('9_action'),
    icon: 'heroicons:star',
  },
  {
    question: t('10_question'),
    statement: t('10_statement'),
    action: t('10_action'),
    icon: 'heroicons:users',
  },
])

const selectedCTA = ref<CTAItem>(ctaItems.value[0]!)

onMounted(() => {
  selectedCTA.value = ctaItems.value[Math.floor(Math.random() * ctaItems.value.length)]!
})

const localePath = useLocalePath()
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
          {{ t(selectedCTA.question) }}
        </div>
        <div class="font-heading text-base text-background dark:text-foreground xl:text-lg">
          {{ t(selectedCTA.statement) }}
        </div>
      </div>

      <UiButton :as="NuxtLink" :to="localePath('/contact')" variant="default" class="ml-3 bg-lupinumTeal hover:bg-lupinumTeal/80 text-foreground dark:text-background mt-2 w-full sm:mt-0 sm:w-auto rounded-full">
        {{ t(selectedCTA.action) }}
      </UiButton>
    </div>
  </div>
</template>


<i18n lang="yaml">
en:
  1_question: "Looking for a website that actually persuades?"
  1_statement: "Let us design a site that drives results for your business."
  1_action: "Get Started"
  2_question: "Need a video that tells your story?"
  2_statement: "We create videos that connect with your audience and inspire action."
  2_action: "Get Started"
  3_question: "Does your brand lack a clear identity?"
  3_statement: "Our design experts will help you stand out with branding that resonates."
  3_action: "Get Started"
  4_question: "Ready to boost your online presence?"
  4_statement: "We combine web, video, and design to deliver impactful solutions."
  4_action: "Level Up Today"
  5_question: "Feel like your marketing strategy is missing something?"
  5_statement: "Let us craft a custom plan to achieve your goals."
  5_action: "Talk to Us"
  6_question: "Need a website but don't know where to start?"
  6_statement: "We'll guide you through every step and create a site you'll love."
  6_action: "Start Your Project"
  7_question: "Want videos that actually get views?"
  7_statement: "We produce engaging content that captures attention."
  7_action: "Let's Film"
  8_question: "Is your design not delivering results?"
  8_statement: "Upgrade your visuals with designs that make an impact."
  8_action: "Get Started"
  9_question: "Struggling to stand out online?"
  9_statement: "Our tailored solutions help you cut through the noise."
  9_action: "Be Unforgettable"
  10_question: "Looking for a partner who gets your vision?"
  10_statement: "We're here to help bring your ideas to life."
  10_action: "Work With Us"

de:
  1_question: "Suchst du eine Website, die wirklich überzeugt?"
  1_statement: "Wir gestalten eine Website, die Ergebnisse für dein Unternehmen liefert."
  1_action: "Jetzt starten"
  2_question: "Brauchst du ein Video, das deine Geschichte erzählt?"
  2_statement: "Wir erstellen Videos, die dein Publikum ansprechen und zum Handeln inspirieren."
  2_action: "Jetzt starten"
  3_question: "Fehlt deiner Marke eine klare Identität?"
  3_statement: "Unsere Design-Experten helfen dir, dich mit einer überzeugenden Markenidentität abzuheben."
  3_action: "Jetzt starten"
  4_question: "Bereit, deine Online-Präsenz zu steigern?"
  4_statement: "Wir kombinieren Web, Video und Design für wirkungsvolle Lösungen."
  4_action: "Jetzt durchstarten"
  5_question: "Fehlt deiner Marketingstrategie etwas?"
  5_statement: "Wir entwickeln einen maßgeschneiderten Plan, um deine Ziele zu erreichen."
  5_action: "Sprich mit uns"
  6_question: "Brauchst du eine Website, weißt aber nicht, wo du anfangen sollst?"
  6_statement: "Wir begleiten dich durch jeden Schritt und erstellen eine Website, die du lieben wirst."
  6_action: "Projekt starten"
  7_question: "Möchtest du Videos, die wirklich Aufmerksamkeit generieren?"
  7_statement: "Wir produzieren fesselnde Inhalte, die Aufmerksamkeit erregen."
  7_action: "Lass uns drehen"
  8_question: "Bringt dein Design nicht die gewünschten Ergebnisse?"
  8_statement: "Verbessere deine Visuals mit Designs, die Wirkung zeigen."
  8_action: "Jetzt starten"
  9_question: "Kämpfst du damit, online aufzufallen?"
  9_statement: "Unsere maßgeschneiderten Lösungen helfen dir, dich von der Masse abzuheben."
  9_action: "Werde unvergesslich"
  10_question: "Suchst du einen Partner, der deine Vision versteht?"
  10_statement: "Wir sind hier, um deine Ideen zum Leben zu erwecken."
  10_action: "Mit uns arbeiten"
</i18n>