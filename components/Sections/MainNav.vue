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
    label: 'Wiki',
    icon: 'heroicons:book-open',
    children: [
      { label: 'Getting Started', href: '/wiki/getting-started', icon: 'mdi:chevron-right' },
      { label: 'Core Concepts', href: '/wiki/core-concepts', icon: 'mdi:chevron-right' },
      { label: 'Advanced Topics', href: '/wiki/advanced-topics', icon: 'mdi:chevron-right' },
    ],
  },
  {
    label: 'Docs',
    icon: 'mdi:file-document',
    children: [
      { label: 'API Reference', href: '/docs/api', icon: 'mdi:chevron-right' },
      { label: 'Components', href: '/docs/components', icon: 'mdi:chevron-right' },
      { label: 'Guides', href: '/docs/guides', icon: 'mdi:chevron-right' },
    ],
  },
  {
    label: 'Courses',
    icon: 'mdi:file-document',
    children: [
      { label: 'API Reference', href: '/docs/api', icon: 'mdi:chevron-right' },
      { label: 'Components', href: '/docs/components', icon: 'mdi:chevron-right' },
      { label: 'Guides', href: '/docs/guides', icon: 'mdi:chevron-right' },
    ],
  },
  { label: 'Videos', href: '/videos', icon: 'mdi:video' },
  { label: 'Course', href: '/course', icon: 'mdi:school' },
  { label: 'Blog', href: '/blog', icon: 'mdi:post' },
  { label: 'Contact', href: '/contact', icon: 'mdi:email' },
])

const route = useRoute()
const activeRoute = computed(() => route.path)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

function handleLinkClick() {
  toggleHeaderExpansion()
}
</script>

<template>
  <ul class="w-full space-y-1 px-2">
    <li v-for="link in navLinks" :key="link.label">
      <template v-if="link.children">
        <div class="flex items-center px-4 py-3 text-base font-medium text-foreground">
          <Icon :name="link.icon" class="mr-3 size-5" />
          {{ link.label }}
        </div>
        <ul class="mt-1 space-y-1 pl-8">
          <li v-for="child in link.children" :key="child.href">
            <NuxtLink
              :to="child.href"
              class="flex items-center rounded-md px-3 py-2 font-medium transition-colors duration-200"
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
        class="flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors duration-200"
        :class="[
          activeRoute === link.href
            ? 'bg-accent text-accent-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
        @click="handleLinkClick"
      >
        <Icon :name="link.icon" class="mr-3 size-5" />
        {{ link.label }}
        <Icon name="chevron-right" class="ml-auto size-4" />
      </NuxtLink>
    </li>
  </ul>
</template>
