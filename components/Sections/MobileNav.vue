<script setup lang="ts">
import WikiNav from './MobileSubWikiNav.vue'
import BlogNav from './MobileSubBlogNav.vue'

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

const currentSubNav = computed(() => subNavigations.find(nav => nav.route === route.path))
const showMainNav = computed(() => !currentSubNav.value)
</script>

<template>
  <nav class="flex h-[98%] flex-col transition-colors duration-300">
    <div class="mb-4 flex items-center justify-between px-6" />

    <UiScrollArea class="relative" type="auto">
      <div class="h-full px-2">
        <SectionsMainNav v-if="showMainNav" />
        <component :is="currentSubNav?.component" v-else />
      </div>
    </UiScrollArea>

    <footer class="mt-auto space-y-6 border-t border-border p-6">
      <div class="flex items-center justify-between">
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
