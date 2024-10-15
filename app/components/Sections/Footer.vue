<script setup lang="ts">
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'About', href: '/' },
  { label: 'Blog', href: '/' },
  { label: 'Contact', href: '/' },
  { label: 'Privacy', href: '/' },
  { label: 'Terms', href: '/' },
]

const socialLinks = [
  { icon: 'i-mdi-facebook', href: 'https://facebook.com' },
  { icon: 'i-mdi-twitter', href: 'https://twitter.com' },
  { icon: 'i-mdi-instagram', href: 'https://instagram.com' },
  { icon: 'i-mdi-github', href: 'https://github.com' },
]
</script>

<template>
  <footer class="border-t bg-foreground text-background dark:bg-background">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <img
            src="/logo_dark.svg"
            class="h-10 w-auto"
          >
          <p class="text-sm text-background/80">
            {{ appConfig.siteDescription }}
          </p>
          <div class="flex space-x-6">
            <a v-for="item in socialLinks" :key="item.icon" :href="item.href" class="text-background/80 hover:text-background dark:text-foreground/80">
              <Icon :name="item.icon" class="size-6" aria-hidden="true text-foreground/80" />
            </a>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-background dark:text-foreground/80">
                Solutions
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="(item, index) in footerLinks.slice(0, 3)" :key="index">
                  <NuxtLink :to="item.href" class="text-sm text-background/80 hover:text-background dark:text-foreground/80">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-background dark:text-foreground/80  ">
                Support
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="(item, index) in footerLinks.slice(3)" :key="index">
                  <NuxtLink :to="item.href" class="text-sm text-background/80 hover:text-background dark:text-foreground/80">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-background/20 pt-8">
        <p class="text-sm text-background/80 dark:text-foreground/80">
          &copy; {{ currentYear }} {{ appConfig.siteName }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
