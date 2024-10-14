<script setup lang="ts">
interface Props {
  categories: string[]
  selectedCategory: string
  searchQuery: string
  allTags: string[]
}

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
</script>

<template>
  <div id="sidenav" class="hidden w-[320px] border-r border-border bg-background p-3 pl-5 lg:block 2xl:p-8">
    <div class="sticky top-24 flex flex-col gap-8">
      <!-- Categories -->
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
            You learn better visually with Videos?
          </p>
          <p class="font-heading text-lg text-card-foreground">
            Get access to our In-depth Video Course
          </p>
          <UiButton variant="default">
            Enroll now
          </UiButton>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="widget">
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
      </div>

      <!-- Social Share -->
      <div class="widget pb-16">
        <h4 class="mb-4 font-heading text-xl font-semibold text-foreground">
          Follow us
        </h4>
        <div class="flex gap-4">
          <a href="#" class="text-muted-foreground hover:text-foreground">
            <Icon name="mdi:facebook" class="size-6" />
          </a>
          <a href="#" class="text-muted-foreground hover:text-foreground">
            <Icon name="mdi:twitter" class="size-6" />
          </a>
          <a href="#" class="text-muted-foreground hover:text-foreground">
            <Icon name="mdi:linkedin" class="size-6" />
          </a>
          <a href="#" class="text-muted-foreground hover:text-foreground">
            <Icon name="mdi:pinterest" class="size-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
