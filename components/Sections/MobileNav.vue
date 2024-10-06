<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const isDarkMode = ref(false)
const selectedLanguage = ref('en')

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
]

const route = useRoute()
const isWikiPage = computed(() => route.path.startsWith('/wiki'))
const showMainNav = ref(!isWikiPage.value)

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

function toggleNav() {
  showMainNav.value = !showMainNav.value
}
</script>

<template>
  <nav class="flex h-[98%] flex-col transition-colors duration-300">
    <UiDivider class="mb-4" />
    <div class="mb-4 flex items-center justify-between px-6" />
    <UiScrollArea class="relative">
      <div class="h-full">
        <SectionsMainNav v-if="showMainNav" />
        <SectionsWikiNav v-else />
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background to-transparent" />
    </UiScrollArea>

    <footer class="mt-auto space-y-6 border-t border-border p-6">
      <div class="flex items-center justify-between">
        <UiButton
          class="rounded-full bg-secondary p-2 text-secondary-foreground transition-colors duration-200 hover:bg-secondary/80"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDarkMode"
        >
          <Icon :name="isDarkMode ? 'heroicons:sun' : 'heroicons:moon'" class="size-5" />
        </UiButton>

        <select
          v-model="selectedLanguage"
          class="rounded-md bg-secondary px-3 py-2 text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Select language"
        >
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.label }}
          </option>
        </select>
      </div>
    </footer>
  </nav>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted)) hsl(var(--muted-foreground));
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground));
  border-radius: 4px;
}
</style>
