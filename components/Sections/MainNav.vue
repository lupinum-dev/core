<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, inject, ref } from 'vue'
import { useSubMenu } from '~/composables/useSubMenu'
import { NuxtLink } from '#components'

interface NavLink {
  label: string
  href?: string
  icon?: string
  childrenOpen?: boolean
  childrenTrailing?: boolean
  children?: NavLink[]
  showSubmenu?: boolean
}
const navLinks = ref<NavLink[]>([
  { label: 'Home', href: '/', icon: 'lucide:home' },
  {
    label: 'Wiki',
    icon: 'lucide:book-open',
    childrenOpen: true,
    children: [
      { label: 'Getting Started', href: '/wiki/fundamentals', showSubmenu: true },
      { label: 'Core Concepts', href: '/wiki/intermediate', showSubmenu: true },
      { label: 'Advanced Topics', href: '/wiki/queen-rearing', showSubmenu: true },
    ],
  },
  {
    label: 'Docs',
    icon: 'lucide:file-text',
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
    icon: 'lucide:graduation-cap',
    children: [
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Guides', href: '/docs/guides' },
    ],
  },
  { label: 'Videos', href: '/videos', icon: 'lucide:video' },
  { label: 'Course', href: '/course', icon: 'lucide:book' },
  { label: 'Blog', href: '/blog', icon: 'lucide:pen-tool', showSubmenu: true },
  { label: 'Contact', href: '/contact', icon: 'lucide:mail' },
])

const socials = [
  { icon: 'mdi:github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'mdi:twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'mdi:linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]

const route = useRoute()
const activeRoute = computed(() => route.path)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

const { openSubmenu } = useSubMenu()

function handleLinkClick() {
  console.log('handleLinkClick')
  toggleHeaderExpansion()
}

function handleOpenSubmenu(href: string | undefined) {
  if (href) {
    openSubmenu(href)
  }
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
                  <component
                    :is="child.showSubmenu ? 'div' : NuxtLink"
                    :to="!child.showSubmenu ? (child.href || '') : undefined"
                    class="flex items-center rounded-md px-3 py-2 font-medium transition-colors duration-200"
                    :class="[
                      activeRoute === child.href
                        ? 'font-bold underline'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                    ]"
                    @click="child.showSubmenu ? handleOpenSubmenu(child.href) : handleLinkClick"
                  >
                    {{ child.label }}
                    <Icon
                      v-if="link.childrenTrailing !== false"
                      name="lucide:chevron-right"
                      class="ml-4 size-4"
                    />
                  </component>
                </li>
              </ul>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </template>

      <component
        :is="link.showSubmenu ? 'div' : NuxtLink"
        v-else
        :to="!link.showSubmenu ? (link.href || '') : undefined"
        class="flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors duration-200"
        :class="[
          activeRoute === link.href
            ? 'font-bold underline'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
        @click="link.showSubmenu ? handleOpenSubmenu(link.href) : handleLinkClick"
      >
        {{ link.showSubmenu }}
        <Icon :name="link.icon || ''" class="mr-3 size-5" />
        {{ link.label }}
      </component>
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
