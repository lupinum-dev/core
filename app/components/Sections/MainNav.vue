<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, inject, ref } from 'vue'
import { useSubMenu } from '~/composables/useSubMenu'
import { NuxtLink } from '#components'
import { useAppConfig } from '#imports'

interface NavLink {
  label: string
  href?: string
  icon?: string
  type?: string
  childrenOpen?: boolean
  children?: NavLink[]
  showSubmenu?: boolean
}

const appConfig = useAppConfig()
const navLinks = ref<NavLink[]>(appConfig.navigation.items)

const socials = ref<NavLink[]>(appConfig.socials)

const route = useRoute()
const activeRoute = computed(() => route.path)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

const { openSubmenu } = useSubMenu()

function handleLinkClick() {
  toggleHeaderExpansion()
}

function handleOpenSubmenu(href: string | undefined) {
  if (href) {
    openSubmenu(href)
  }
}

function handleItemClick(showSubmenu: boolean | undefined, href: string | undefined) {
  if (showSubmenu) {
    handleOpenSubmenu(href)
  }
  else {
    handleLinkClick()
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
                {{ $t(link.label) }}
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
                    @click="() => handleItemClick(child.showSubmenu, child.href)"
                  >
                    {{ $t(child.label) }}
                    <Icon
                      v-if="link.type !== 'links'"
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
        @click="() => handleItemClick(link.showSubmenu, link.href)"
      >
        <Icon :name="link.icon || ''" class="mr-3 size-5" />
        {{ $t(link.label) }} 
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
        <Icon :name="social.icon || ''" class="size-6" />
      </a>
    </div>
  </div>
</template>

