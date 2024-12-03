<script setup lang="ts">
interface Props {
  categories: string[]
  selectedCategory: string
  searchQuery: string
  allTags: string[]
}

const { t } = useI18n({
  useScope: 'local',
})

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:selectedCategory', value: string): void
  (e: 'update:searchQuery', value: string): void
}>()

function updateCategory(category: string) {
  emit('update:selectedCategory', category)
}

function goHome() {
  emit('update:selectedCategory', '')
}

// Remove the unused function
// function updateSearchQuery(query: string) {
//   emit('update:searchQuery', query)
// }

const appConfig = useAppConfig()
</script>

<template>
  <div id="sidenav" class="bg-svg dark:bg-svg-dark hidden w-[320px] rounded-br-2xl border-r border-border  p-3 pl-5 lg:block 2xl:p-8">
    <div class="sticky top-24 flex flex-col gap-8">
      <!-- Categories -->
      <div class="widget">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          {{ t('categories') }}
        </h4>
        <div class="flex flex-col gap-2">
          <UiButton
            variant="outline"
            size="sm"
            @click="goHome"
          >
            {{ t('home') }}
          </UiButton>
          <UiButton
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'default' : 'outline'"
            size="sm"
            @click="updateCategory(category)"
          >
            {{ category }}
          </UiButton>
        </div>
      </div>

      <!-- Ad Section -->
      <div class="widget rounded-lg border border-border bg-card p-5">
        <div class="flex flex-col items-center justify-between space-y-4 text-center">
          <p class="text-sm text-muted-foreground">
            {{ t('free_audit') }}
          </p>
          <p class="font-heading text-lg text-card-foreground">
            {{ t('audit_description') }}
          </p>
          <UiButton variant="default" class="rounded-full ">
            {{ t('get_started') }}
          </UiButton>
        </div>
      </div>

      <!-- Newsletter -->
      <!-- <div class="widget">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          {{ t('newsletter') }}
        </h4>
        <form class="flex flex-col gap-2" @submit.prevent>
          <UiInput
            type="email"
            :placeholder="t('email_placeholder')"
          />
          <UiButton type="submit" variant="outline">
            {{ t('subscribe') }}
          </UiButton>
        </form>
      </div> -->

      <!-- Social Share -->
      <div class="widget pb-16">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          {{ t('follow_us') }}
        </h4>
        <div class="flex gap-4">
          <NuxtLink
            v-for="icon in appConfig.socials"
            :key="icon.icon"
            :href="icon.href"
            aria-label="Follow us on {{ icon.label }}"
            class="text-muted-foreground hover:text-foreground"
          >
            <Icon
              :key="icon.icon"
              :name="icon.icon"
              class="size-6"  
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>


<i18n lang="yaml">
  en:
    categories: "Categories"
    home: "Home"
    free_audit: "Free Website Audit"
    audit_description: "Learn how to improve your website"
    get_started: "Get Started"
    follow_us: "Follow us"
    newsletter: "Newsletter"
    email_placeholder: "Your email address"
    subscribe: "Subscribe"
  de:
    categories: "Kategorien"
    home: "Startseite"
    free_audit: "Kostenlose Website-Analyse"
    audit_description: "Erfahre wie du deine Website verbessern kannst"
    get_started: "Jetzt starten"
    follow_us: "Folgen Sie uns"
    newsletter: "Newsletter"
    email_placeholder: "Ihre E-Mail-Adresse"
    subscribe: "Abonnieren"
</i18n>
