<script setup lang="ts">
import type { NavigationItem } from '@/types/navigation'
import { NuxtLink } from '#components'
import { useRoute } from 'vue-router'

const appConfig = useAppConfig()
const navItems = appConfig.navigation.items as NavigationItem[]

const route = useRoute()
const activeRoute = computed(() => route.path)
</script>

<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="item in navItems" :key="item.label">
        <template v-if="item.children">
          <UiNavigationMenuTrigger class="nav-link">
            {{ item.label }}
          </UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <UiNavigationMenuLink as-child>
                  <NuxtLink :href="item.href" class="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <div class="mb-2 mt-4 text-lg font-medium">
                      {{ item.label }}
                    </div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      Lets get started
                    </p>
                    <UiButton class="mt-4">
                      Get started
                    </UiButton>
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
              <li v-for="child in item.children" :key="child.label">
                <UiNavigationMenuLink as-child>
                  <NuxtLink 
                    :href="child.href"
                    :class="[
                      activeRoute === child.href ? 'font-bold bg-accent ' : '',
                    ]"
                  >
                    <div class="font-heading text-sm leading-none">
                      {{ child.label }}
                    </div>
                    <p class="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {{ child.description || `Explore our ${child.label.toLowerCase()} services` }}
                    </p>
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </template>
        <UiNavigationMenuLink 
          v-else 
          :as="NuxtLink" 
          :to="item.href" 
          class="nav-link" 
          :class="[
            item.cta ? 'bg-teal-500 text-accent-foreground hover:bg-teal-500/90' : '',
            activeRoute === item.href ? 'font-bold  bg-accent' : ''
          ]"
        >
          {{ item.label }}
        </UiNavigationMenuLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>

<style>
.nav-link {
  @apply inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-sub transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50;
}
</style>
