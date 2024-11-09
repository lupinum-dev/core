<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const appConfig = useAppConfig()

const { isVisible } = useAdBannerVisibility()

const isExpanded = ref(false)

// TODO Make Header Variable in CSS and Nuxt Config
// When using the var(--header-height), the opening animation is croggy
const headerHeight = computed(() =>
  isExpanded.value
    ? '100dvh'
    : appConfig.header.headerHeight,
)

const headerState = inject('headerState', ref(false))

const headerStyle = computed(() => ({
  '--header-height': headerHeight.value,
  'height': headerHeight.value,
  'transition': 'height 0.3s ease-in-out',
}))

const topStyle = computed(() => ({
  top: isVisible.value ? 'var(--header-ad-height)' : '0',
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
  }

  return roundedMap[appConfig.header.rounded] || ''
})

function toggleHeaderExpansion() {
  isExpanded.value = !isExpanded.value
  headerState.value = isExpanded.value
}

provide('toggleHeaderExpansion', toggleHeaderExpansion)
</script>

<template>
  <header :class="cn(
    'isolate fixed w-dvw transition-all duration-200 ',
    appConfig.header.variant === 'default' ? 'bg-background z-50 border-b' : 'z-30', $attrs,
  )" :style="topStyle">
    <div class="mx-auto transition-all duration-300" :class="[
      appConfig.header.variant === 'default'
        ? 'flex items-center justify-between sm:container'
        : 'max-w-6xl md:mt-3 lg:px-6',
      isExpanded ? 'mt-0 rounded-none sm:px-0' : 'mt-2 px-3',
    ]">
      <div class="flex size-full flex-col" :class="[
        { 'relative border  bg-background/95 px-2 shadow-lg backdrop-blur-sm dark:shadow-foreground/10': appConfig.header.variant !== 'default' },
        isExpanded ? 'rounded-none border-none' : roundedClass,
      ]" :style="headerStyle">
        <div class=" lg:mt-1 mt-1.5 flex items-center justify-between">
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
              <UiSheetTrigger>
                <UiButton variant="ghost" size="sm" class="lg:hidden">
                  <Icon :name="appConfig.header.hamburgerIcon" class="size-5" />
                </UiButton>
              </UiSheetTrigger>

              <UiSheetContent>
                <UiSheetHeader>
                  <UiSheetTitle class=" flex items-center justify-between">             <img class="h-7" src="/logo_light.svg"> <UiColorModeDropdown v-if="appConfig.header.showLanguageDropdown" variant="ghost" />

                    <UiElementsLanguageDropdown display-type="text" /></UiSheetTitle>
                  <UiSheetDescription>
                    <ClientOnly>
                      <SectionsMobileNav />
                    </ClientOnly>
                  </UiSheetDescription>
                </UiSheetHeader>
              </UiSheetContent>

            </UiSheet>

          </div>
        </div>

        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
          <nav v-if="isExpanded" class="flex-grow overflow-y-auto">
            <div class="h-px w-full bg-border" />
            <slot name="mobile" />
          </nav>
        </Transition>
      </div>
    </div>
  </header>
</template>
