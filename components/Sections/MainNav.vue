<script setup lang="ts">
import { useRoute } from 'vue-router'
import { inject } from 'vue'

interface NavLink {
  label: string
  href?: string
  icon: string
  children?: NavLink[]
}
const navLinks = ref<NavLink[]>([
  { label: 'Home', href: '/', icon: 'mdi:home' },
  {
    label: 'Getting Started',
    icon: 'heroicons:book-open',
    children: [
      { label: 'Introduction', href: '/getting-started', icon: 'mdi:chevron-right' },
      { label: 'Installation', href: '/pro/getting-started/installation', icon: 'mdi:chevron-right' },
      { label: 'Theming', href: '/pro/getting-started/theming', icon: 'mdi:chevron-right' },
      { label: 'Structure', href: '/pro/getting-started/structure', icon: 'mdi:chevron-right' },
      { label: 'Content', href: '/pro/getting-started/content', icon: 'mdi:chevron-right' },
    ],
  },
  { label: 'Documentation', href: '/wiki', icon: 'mdi:book-open' },
  { label: 'Templates', href: '/templates', icon: 'mdi:page-layout-body' },
  { label: 'Guides', href: '/guides', icon: 'mdi:school' },
  { label: 'Pricing', href: '/pricing', icon: 'mdi:currency-usd' },
])

const route = useRoute()
const activeRoute = computed(() => route.path)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

function handleLinkClick() {
  toggleHeaderExpansion()
}
</script>

<template>
  <ul class="space-y-2 ">
    <li v-for="link in navLinks" :key="link.label">
      <template v-if="link.children">
        <div class="px-6 py-4 text-lg font-medium text-foreground">
          <Icon :name="link.icon" class="mr-4 size-6" />
          {{ link.label }}
        </div>
        <ul class="mt-2 space-y-1 pl-10">
          <li v-for="child in link.children" :key="child.href">
            <NuxtLink
              :to="child.href"
              class="flex items-center rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200"
              :class="[
                activeRoute === child.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground',
              ]"
              @click="handleLinkClick"
            >
              <Icon :name="child.icon" class="mr-2 size-4" />
              {{ child.label }}
            </NuxtLink>
          </li>
        </ul>
      </template>
      <NuxtLink
        v-else
        :to="link.href"
        class="flex items-center rounded-lg px-6 py-4 text-lg font-medium transition-colors duration-200"
        :class="[
          activeRoute === link.href
            ? 'bg-accent text-accent-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
        @click="handleLinkClick"
      >
        <Icon :name="link.icon" class="mr-4 size-6" />
        {{ link.label }}
        <Icon name="chevron-right" class="ml-auto size-5" />
      </NuxtLink>
    </li>
  </ul>
</template>
