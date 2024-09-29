<script setup lang="ts">
import { computed, ref } from 'vue'

interface NavLink {
  label: string
  href: string
  icon: string
}

const navLinks = ref<NavLink[]>([
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Documentation', href: '/docs', icon: 'book-open' },
  { label: 'Templates', href: '/templates', icon: 'layout-template' },
  { label: 'Guides', href: '/guides', icon: 'graduation-cap' },
  { label: 'Pricing', href: '/pricing', icon: 'dollar-sign' },
])

const socials = [
  { icon: 'mdi:github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'mdi:twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'mdi:linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]

const isDarkMode = ref(false)
const selectedLanguage = ref('en')

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
]

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const activeRoute = computed(() => '/') // Replace with actual active route logic
</script>

<template>
  <nav class="flex h-full flex-col bg-white transition-colors duration-300 dark:bg-gray-900">
    <UiScrollArea class="flex-grow">
      <ul class="space-y-2 py-6">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="flex items-center rounded-lg px-6 py-4 text-lg font-medium transition-colors duration-200" :class="[
              activeRoute === link.href
                ? 'dark:text-primary-light bg-gray-100 text-primary dark:bg-gray-800'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800',
            ]"
          >
            <Icon :name="link.icon" class="mr-4 size-6" />
            {{ link.label }}
            <Icon name="chevron-right" class="ml-auto size-5" />
          </a>
        </li>
      </ul>
    </UiScrollArea>

    <footer class="mt-auto space-y-6 border-t border-gray-200 p-6 dark:border-gray-700">
      <div class="flex justify-center space-x-6">
        <a
          v-for="social in socials"
          :key="social.icon"
          :href="social.href"
          :aria-label="social.label"
          class="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="social.icon" class="size-6" />
        </a>
      </div>

      <div class="flex items-center justify-between">
        <UiButton
          class="rounded-full bg-gray-200 p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDarkMode"
        >
          <Icon :name="isDarkMode ? 'heroicons:sun' : 'heroicons:moon'" class="size-5" />
        </UiButton>

        <select
          v-model="selectedLanguage"
          class="dark:focus:ring-primary-light rounded-md bg-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200"
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
  scrollbar-color: theme('colors.gray.400') theme('colors.gray.200');
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: theme('colors.gray.200');
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.400');
  border-radius: 4px;
}

.dark .overflow-y-auto {
  scrollbar-color: theme('colors.gray.600') theme('colors.gray.800');
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: theme('colors.gray.800');
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.600');
}
</style>
