<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const appConfig = useAppConfig()
const { isVisible } = useAdBannerVisibility()

const topStyle = computed(() => ({
  top: isVisible.value ? 'var(--header-ad-height)' : '0px',
}))

const roundedClass = computed(() => {
  if (appConfig.header.variant === 'default')
    return ''

  const roundedMap = {
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    'full': 'rounded-full',
    'none': '',
  } as const

  return roundedMap[appConfig.header.rounded as keyof typeof roundedMap] || ''
})
</script>

<template>
  <header :class="cn(
    'isolate fixed w-dvw transition-all duration-200 ease-in-out will-change-transform ',
    appConfig.header.variant === 'default' ? 'bg-background z-50 border-b' : 'z-30',
    isVisible ? 'top-[var(--header-ad-height)]' : 'top-0',
    $attrs,
  )">
    <div class="mx-auto transition-all duration-300" :class="[
      appConfig.header.variant === 'default'
        ? 'flex items-center justify-between sm:container'
        : 'max-w-6xl md:mt-3 lg:px-6',
      'mt-2 px-3',
    ]">
      <div class="flex size-full flex-col" :class="[
        { 'relative border bg-background/95 px-2 shadow-lg backdrop-blur-sm dark:shadow-foreground/10': appConfig.header.variant !== 'default' },
        roundedClass,
      ]" :style="{ height: appConfig.header.headerHeight }">
        <div class="lg:mt-1 mt-1.5 flex items-center justify-between">
          <div class="flex h-full items-center">
            <slot name="left" />
          </div>

          <div class="hidden h-full items-center lg:flex">
            <slot name="center" />
          </div>

          <div class="flex h-full items-center">
            <div class="hidden lg:block">
              <slot name="right" />
            </div>

            <UiSearchButton v-if="appConfig.header.showSearch" />

            <div class="hidden lg:block">
              <UiColorModeDropdown v-if="appConfig.header.showLanguageDropdown" variant="ghost" />
              <UiElementsLanguageDropdown v-if="appConfig.header.showLanguageDropdown" />
            </div>


            <UiSheet>
              <UiSheetTrigger asChild>
                <UiButton variant="ghost" size="sm" class="lg:hidden" aria-label="Open Mobile Menu">
                  <Icon :name="appConfig.header.hamburgerIcon" class="size-5" />
                </UiButton>
              </UiSheetTrigger>


              <UiSheetContent>
      
                      <SectionsMobileNav />
   
              </UiSheetContent>

            </UiSheet>


          </div>
        </div>
      </div>
    </div>
  </header>
</template>
