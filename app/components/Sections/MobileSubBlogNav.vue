<script setup lang="ts">
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()
const { categories } = useBlogPosts()

const router = useRouter()
const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

function updateCategory(category: string) {
  blogStore.setSelectedCategory(category)
  toggleHeaderExpansion()
  navigateToBlogIndex()
}

function navigateToBlogIndex() {
  const query: Record<string, string> = {}
  if (blogStore.selectedCategory)
    query.category = blogStore.selectedCategory
  router.push({ path: '/blog', query })
}

function goHome() {
  blogStore.setSelectedCategory('')
  navigateToBlogIndex()
}

const appConfig = useAppConfig()


</script>

<template>
  <UiScrollArea>
    <div class="mx-auto max-w-xl space-y-8">
      <div class="widget">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          Categories
        </h4>
        <div class="flex flex-col gap-2">
          <UiButton
            variant="outline"
            size="sm"
            @click="goHome"
          >
            Home
          </UiButton>
          <UiButton
            v-for="category in categories"
            :key="category"
            :variant="blogStore.selectedCategory === category ? 'default' : 'outline'"
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
            Free Website Audit
          </p>
          <p class="font-heading text-lg text-card-foreground">
            Get a free website audit and learn how to improve your website.
          </p>
          <UiButton variant="default">
            Get Started
          </UiButton>
        </div>
      </div>

      <!-- Newsletter -->
      <!-- <div class="widget">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          Newsletter
        </h4>
        <form class="flex flex-col gap-2" @submit.prevent>
          <UiInput
            type="email"
            placeholder="Your email address"
          />
          <UiButton type="submit" variant="outline">
            Subscribe
          </UiButton>
        </form>
      </div> -->

      <!-- Social Share -->
      <div class="widget pb-16">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          Follow us
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
  </UiScrollArea>
</template>
