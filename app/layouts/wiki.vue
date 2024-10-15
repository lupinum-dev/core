<script setup lang="ts">
import type { NavItem } from '@/types/navigation'

const navigation = inject<Ref<NavItem[]>>('navigation-wiki', ref([]))

const route = useRoute()
const appConfig = useAppConfig()

const currentNavItem = computed<NavItem>(() => {
  if (!navigation.value.length)
    return { title: '', _path: '', children: [] }
  const currentPath = route.path
  return navigation.value.find(item => currentPath.startsWith(item._path)
    && (currentPath === item._path || currentPath.charAt(item._path.length) === '/'))
    || navigation.value[0]
})

const currentNavItemChildren = computed(() => currentNavItem.value.children || [])

const isActiveRoute = (path: string) => route.path.startsWith(path)

// Use useCookie to create a persistent, SSR-friendly state
const isSidebarOpen = useCookie<boolean>('wiki-sidebar-open', {
  default: () => true,
  // You can adjust these options as needed
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

const showTabs = computed(() => appConfig.wiki.mode === 'tabs')
const showSelect = computed(() => appConfig.wiki.mode === 'select')

// We need this for the TOC, otherwise the marker will stay in the wrong position
watch(() => route.path, () => {
  // Reset scroll position when navigating to a new page
  if (process.client) {
    window.scrollTo(0, 0)
  }
}, { immediate: true })
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-svg dark:bg-svg-dark">
    <UiWikiSideNav />
    <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </div>
</template>
