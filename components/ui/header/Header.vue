<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { VisuallyHidden } from 'radix-vue'
import { NuxtLink } from '#components'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/Lib/navigation-menu'

import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogTrigger,
} from '@/components/Lib/dialog'

import { useHeaderVisibility } from '@/composables/useHeaderVisibility'
import type { NavItem } from '~/types/navigation'

const { isHeaderVisible } = useHeaderVisibility()

const navigationWiki = inject('navigation-wiki', [])

const route = useRoute()
const showSubMenu = ref(false)
const currentSubmenuType = ref<'wiki' | 'blog' | 'videos' | 'showcase' | 'course'>(null)
const currentWikiPath = ref<string | null>(null)

// Determine initial submenu state based on route
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/wiki')) {
    currentSubmenuType.value = 'wiki'
    showSubMenu.value = true
  }
  else if (newPath.startsWith('/blog')) {
    currentSubmenuType.value = 'blog'
    showSubMenu.value = true
  }
  else {
    currentSubmenuType.value = null
    showSubMenu.value = false
  }
}, { immediate: true })

const currentMenu = computed(() => {
  return showSubMenu.value ? 'sub' : 'main'
})

function toggleMenu(type?: 'wiki' | 'blog' | 'course', wikiPath?: string) {
  if (type) {
    currentSubmenuType.value = type
    currentWikiPath.value = wikiPath || null
    showSubMenu.value = true
  }
  else {
    showSubMenu.value = false
    currentWikiPath.value = null
  }
}

const isMobileMenuOpen = ref()

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

const router = useRouter()

// TODO: Make so when I select a Wiki in the Select it should not close the mobile menu (not easy task)
router.beforeEach((to, from) => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
})
</script>

<template>
  <LibHeader

    class="transition-transform duration-300"
  >
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold">
        <UiColorModeImage light="/ginko_light.svg" dark="/ginko_dark.svg" class="h-10" />
      </NuxtLink>
    </template>
    <template #center>
      <nav class="flex items-center gap-2">
        <ClientOnly>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <LibButton
                    :variant="$route.path.startsWith('/wiki/') ? 'active' : 'ghost'"
                    size="sm"
                  >
                    Wiki
                  </LibButton>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
                    <li class="row-span-3">
                      <NavigationMenuLink as-child>
                        <a
                          class="from-muted/50 to-muted flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <img src="https://www.radix-vue.com/logo.svg" class="size-6">
                          <div class="mb-2 mt-4 text-lg font-medium">
                            Ginko
                          </div>
                          <p class="text-muted-foreground text-sm leading-tight">
                            Beautifully designed websites
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>

                    <li v-for="item in navigationWiki" :key="item._path">
                      <NavigationMenuLink as-child>
                        <NuxtLink
                          :to="item.firstLink ?? ''"
                          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                          :class="[
                            $route.path.startsWith(item._path)
                              ? 'border border-prime-o-1 bg-prime-i-1 text-prime-t-1'
                              : 'text-gray-t-2 hover:bg-gray-i-1 hover:text-prime-t-2 focus:bg-prime-i-1 focus:text-prime-t-2',
                          ]"
                        >
                          <div class="flex items-center">
                            <Icon :name="item.icon" class="mr-2 size-4" />
                            <div class="text-sm font-medium leading-none">
                              {{ item.title }}
                            </div>
                          </div>
                          <p
                            v-if="item.description"
                            class="line-clamp-2 text-sm leading-snug"
                            :class="$route.path.startsWith(item._path) ? 'text-prime-t-2' : 'text-gray-t-3'"
                          >
                            {{ item.description }}
                          </p>
                        </NuxtLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ClientOnly>

        <LibButton
          :variant="$route.path.startsWith('/course') ? 'active' : 'ghost'"
          size="sm"
          to="/course/getting-started/about"
          :as="NuxtLink"
        >
          Video Course
        </LibButton>
        <LibButton
          :variant="$route.path.startsWith('/#pricing') ? 'active' : 'ghost'"
          size="sm"
          to="/#pricing"
          :as="NuxtLink"
        >
          Pricing
        </LibButton>
        <LibButton
          :variant="$route.path.startsWith('/showcase') ? 'active' : 'ghost'"
          size="sm"
          to="/showcase"
          :as="NuxtLink"
        >
          Showcase
        </LibButton>
        <LibButton
          :variant="$route.path.startsWith('/blog') ? 'active' : 'ghost'"
          size="sm"
          to="/blog"
          :as="NuxtLink"
        >
          Blog
        </LibButton>
        <LibButton
          :variant="$route.path.startsWith('/contact') ? 'active' : 'ghost'"
          size="sm"
          to="/"
        >
          Contact
        </LibButton>
        <!-- <LibButton
          :variant="$route.path.startsWith('/color-palette') ? 'active' : 'ghost'"
          size="sm"
          to="/color-palette"
          :as="NuxtLink"
        >
          Color Palette
        </LibButton> -->
      </nav>
    </template>
    <template #right>
      <button type="button" class="bg-secondary/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex w-full max-w-[240px] items-center gap-2 rounded-full border p-1.5 text-sm transition-colors max-md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search ml-1 size-4" aria-label="Open Search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>Search<div class="ml-auto inline-flex gap-0.5 text-xs">
          <kbd class="bg-background rounded-md border px-1.5">⌘</kbd><kbd class="bg-background rounded-md border px-1.5">K</kbd>
        </div>
      </button>
      <div class=" hidden items-center gap-1 lg:flex">
        <LibButton variant="outline">
          Login
        </LibButton>
        <LibButton variant="default">
          Buy Course
        </LibButton>
      </div>
      <div class="flex lg:hidden">
        <!-- Search Input -->
        <div class="relative" x-data="{ searchOpen: false }">
          <LibButton variant="ghost">
            <Icon name="heroicons:magnifying-glass-16-solid" class="size-5" />
            <span class="ml-2  text-xs text-gray-400 lg:inline-block">Press / to search</span>
          </LibButton>
        </div>

        <ClientOnly>
          <Dialog v-model:open="isMobileMenuOpen">
            <DialogTrigger>
              <LibButton variant="ghost" size="icon">
                <Icon name="heroicons:bars-3-bottom-right-20-solid" class="size-7" />
              </LibButton>
            </DialogTrigger>

            <DialogContent variant="full" :close-button="false" class="flex h-full flex-col">
              <div class="flex items-center justify-between border-b p-4">
                <h2 class="text-xl font-semibold">
                  Menu
                </h2>
                <DialogClose as-child>
                  <LibButton variant="ghost" size="icon" @click="closeMobileMenu">
                    <Icon name="heroicons:x-mark-20-solid" class="size-6" />
                  </LibButton>
                </DialogClose>
              </div>

              <div class="flex-grow overflow-y-auto">
                <div v-if="currentMenu === 'sub'" class="px-4 pt-2">
                  <LibButton variant="ghost" class="mb-2 w-full" @click="toggleMenu()">
                    <Icon name="heroicons:arrow-left-20-solid" class="mr-2 size-5" />
                    Back to Main Menu
                  </LibButton>
                </div>
                <UiMobileMainMenu
                  v-if="currentMenu === 'main'"
                  @show-sub-menu="toggleMenu"
                />
                <UiMobileSubMenu v-else :type="currentSubmenuType" :wiki-path="currentWikiPath" />
              </div>
            </DialogContent>
          </Dialog>
          <template #fallback>
            <LibButton variant="ghost" size="icon">
              <Icon name="heroicons:bars-3-bottom-right-20-solid" class="size-7" />
            </LibButton>
          </template>
        </ClientOnly>
      </div>
    </template>
  </LibHeader>
</template>
