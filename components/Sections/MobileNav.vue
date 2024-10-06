<script setup lang="ts">
import WikiNav from './MobileSubWikiNav.vue'
import BlogNav from './MobileSubBlogNav.vue'
import { useSubMenu } from '~/composables/useSubMenu'

const { currentSubmenuRoute, isSubmenuShown, closeSubmenu, openSubmenu } = useSubMenu()

const selectedLanguage = ref('en')

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
]

const subNavigations = [
  {
    label: 'Wiki',
    component: WikiNav,
    route: '/wiki',
  },
  {
    label: 'Blog',
    component: BlogNav,
    route: '/blog',
  },
]
const route = useRoute()

// Open submenu automatically if on a submenu route
onMounted(() => {
  const currentSubNav = subNavigations.find(nav => route.path.startsWith(nav.route))
  if (currentSubNav) {
    openSubmenu(currentSubNav.route)
  }
})

const currentSubNav = computed(() => {
  if (isSubmenuShown.value && currentSubmenuRoute.value) {
    return subNavigations.find(nav => currentSubmenuRoute.value?.startsWith(nav.route))
  }
  return subNavigations.find(nav => route.path.startsWith(nav.route))
})

const showMainNav = computed(() => !isSubmenuShown.value)

function goToMainMenu() {
  closeSubmenu()
}

function goToSubMenu() {
  if (currentSubNav.value) {
    openSubmenu(currentSubNav.value.route)
  }
}

console.log(currentSubNav.value)
</script>

<template>
  <nav class="flex h-[98%] flex-col transition-colors duration-300">
    <div class="mb-4 flex items-center justify-between px-6">
      <UiButton
        v-if="!showMainNav"
        variant="ghost"
        class="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        @click="goToMainMenu"
      >
        <Icon name="heroicons:chevron-left" class="mr-2 size-4" />
        Back to Main Menu
      </UiButton>
      <UiButton
        v-if="showMainNav && currentSubNav"
        variant="ghost"
        class="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        @click="goToSubMenu"
      >
        Go to {{ currentSubNav.label }} Menu
        <Icon name="heroicons:chevron-right" class="ml-2 size-4" />
      </UiButton>
    </div>

    <UiScrollArea class="relative" type="auto">
      <div class="relative h-full px-2">
        <!-- TODO Can we add a smooth Transition? -->
        <SectionsMainNav v-if="showMainNav" key="main-nav" />
        <component :is="currentSubNav?.component" v-else :key="currentSubNav?.label" />
      </div>
    </UiScrollArea>

    <footer class="mt-auto border-t border-border pb-5 pt-1">
      <div class="flex items-center justify-between px-3">
        <UiColorModeDropdown />

        <UiDropdownMenuRoot>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost">
              <Icon :name="`emojione:flag-for-${selectedLanguage === 'en' ? 'united-states' : selectedLanguage === 'es' ? 'spain' : 'france'}`" class="mr-2 size-5" />
              {{ languages.find(lang => lang.code === selectedLanguage)?.label }}
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end">
            <UiDropdownMenuItem v-for="lang in languages" :key="lang.code" @click="selectedLanguage = lang.code">
              <Icon :name="`emojione:flag-for-${lang.code === 'en' ? 'united-states' : lang.code === 'es' ? 'spain' : 'france'}`" class="mr-2 size-4" />
              {{ lang.label }}
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenuRoot>
      </div>
    </footer>
  </nav>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted)) hsl(var(--muted-foreground));
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground));
  border-radius: 4px;
}
</style>
