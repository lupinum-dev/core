<script setup lang="ts">
import { useRoute } from 'vue-router'
import { inject } from 'vue'

interface NavLink {
  label: string
  href: string
  icon: string
}

const navLinks = ref<NavLink[]>([
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Documentation', href: '/wiki', icon: 'book-open' },
  { label: 'Templates', href: '/templates', icon: 'layout-template' },
  { label: 'Guides', href: '/guides', icon: 'graduation-cap' },
  { label: 'Pricing', href: '/pricing', icon: 'dollar-sign' },
])

const route = useRoute()
const activeRoute = computed(() => route.path)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

function handleLinkClick() {
  toggleHeaderExpansion()
}
</script>

<template>
  <ul class="space-y-2 py-6">
    <li v-for="link in navLinks" :key="link.href">
      <NuxtLink
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
