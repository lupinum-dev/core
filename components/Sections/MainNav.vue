<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, inject, ref } from 'vue'

interface NavLink {
  label: string
  href?: string
  icon?: string
  childrenOpen?: boolean
  childrenTrailing?: boolean
  children?: NavLink[]
}
const navLinks = ref<NavLink[]>([
  { label: 'Home', href: '/', icon: 'mdi:home' },
  {
    label: 'Wiki',
    icon: 'heroicons:book-open',
    childrenOpen: true,
    children: [
      { label: 'Getting Started', href: '/wiki/getting-started' },
      { label: 'Core Concepts', href: '/wiki/core-concepts' },
      { label: 'Advanced Topics', href: '/wiki/advanced-topics' },
    ],
  },
  {
    label: 'Docs',
    icon: 'mdi:file-document',
    childrenOpen: true,
    childrenTrailing: false,
    children: [
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Guides', href: '/docs/guides' },
    ],
  },
  {
    label: 'Courses',
    icon: 'mdi:file-document',
    children: [
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Guides', href: '/docs/guides' },
    ],
  },
  { label: 'Videos', href: '/videos', icon: 'mdi:video' },
  { label: 'Course', href: '/course', icon: 'mdi:school' },
  { label: 'Blog', href: '/blog', icon: 'mdi:post' },
  { label: 'Contact', href: '/contact', icon: 'mdi:email' },
])

const socials = [
  { icon: 'mdi:github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'mdi:twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'mdi:linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]

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
        <UiAccordion type="single" collapsible variant="ghost" class="p-0" :default-value="link.childrenOpen ? link.label : ''">
          <UiAccordionItem :value="link.label" class="p-0 ">
            <UiAccordionTrigger class="px-4">
              <div class="flex items-center  py-0 text-base font-medium text-foreground">
                <Icon :name="link.icon || ''" class="mr-3 size-5" />
                {{ link.label }}
              </div>
            </UiAccordionTrigger>
            <UiAccordionContent>
              <ul class="ml-6 mt-1 space-y-1 border-l border-border ps-2">
                <li v-for="child in link.children" :key="child.href">
                  <NuxtLink
                    :to="child.href || ''"
                    class="flex items-center rounded-md px-3 py-2 font-medium transition-colors duration-200"
                    :class="[
                      activeRoute === child.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                    ]"
                    @click="handleLinkClick"
                  >
                    {{ child.label }}
                    <Icon
                      v-if="link.childrenTrailing !== false"
                      name="lucide:chevron-right"
                      class="ml-4 size-4"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </template>
      <NuxtLink
        v-else
        :to="link.href || ''"
        class="flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors duration-200"
        :class="[
          activeRoute === link.href
            ? 'bg-accent text-accent-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
        @click="handleLinkClick"
      >
        <Icon :name="link.icon || ''" class="mr-3 size-5" />
        {{ link.label }}
      </NuxtLink>
    </li>
  </ul>
  <div>
    <div class="flex justify-center space-x-6 pb-20 pt-12">
      <a
        v-for="social in socials"
        :key="social.icon"
        :href="social.href"
        :aria-label="social.label"
        class="text-muted-foreground transition-colors duration-200 hover:text-foreground"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :name="social.icon" class="size-6" />
      </a>
    </div>
  </div>
</template>
