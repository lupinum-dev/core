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

function getSubNavPath(path: string) {
  const pathParts = path.split('/')
  return `/${pathParts[1]}/${pathParts[2] || ''}`
}

function findSubNav(path: string) {
  return subNavigations.find(nav => path.startsWith(nav.route))
}

function openSubMenuIfNeeded(path: string) {
  const subNav = findSubNav(path)
  if (subNav) {
    openSubmenu(getSubNavPath(path))
  }
}

onMounted(() => openSubMenuIfNeeded(route.path))

const currentSubNav = computed(() =>
  findSubNav(isSubmenuShown.value && currentSubmenuRoute.value ? currentSubmenuRoute.value : route.path),
)

const showMainNav = computed(() => !isSubmenuShown.value)

function goToMainMenu() {
  closeSubmenu()
}

function goBackToSubMenu() {
  openSubMenuIfNeeded(route.path)
}


</script>

<template>
  <nav class="flex h-[98%] flex-col transition-colors duration-300">
    <div class=" flex items-center justify-between border-b border-border px-6 py-1">
      <UiButton
        v-if="!showMainNav"
        variant="link"
        class="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        @click="goToMainMenu"
      >
        <Icon name="heroicons:chevron-left" class="mr-2 size-3" />
        Back to Main Menu
      </UiButton>
      <UiButton
        v-if="showMainNav && currentSubNav"
        variant="link"
        class="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        @click="goBackToSubMenu"
      >
        Back to {{ currentSubNav.label }} Menu
        <Icon name="heroicons:chevron-right" class="ml-2 size-3" />
      </UiButton>
    </div>

    <UiScrollArea class="relative" type="auto">
      <div class="relative h-full px-2">
        <!-- TODO Can we add a smooth Transition? -->
        <SectionsMainNav v-if="showMainNav" key="main-nav" />
        <component :is="currentSubNav?.component" v-else :key="currentSubNav?.label" />
      </div>
    </UiScrollArea>

    <footer class="mt-auto border-t border-border pb-3 pt-1">
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
