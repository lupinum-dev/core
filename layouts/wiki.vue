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
  <div class="relative min-h-screen ">
    <div
      id="sidenav"
      class="fixed left-0 top-0 z-10 mx-auto hidden h-screen overflow-y-auto border-r border-border transition-all duration-300 ease-in-out lg:block lg:w-[270px] xl:w-[320px] 2xl:w-[400px] 2xl:px-6"
    >
      <div class="flex justify-end p-2">
        <!-- <UiContentUserConfig
          v-if="isSidebarOpen"
          trigger-button="Dots"
        /> -->
        <!-- <UiButton variant="link" size="icon" @click="toggleSidebar">
          <Icon
            :name="isSidebarOpen ? 'tabler:layout-sidebar-left-collapse-filled' : 'tabler:layout-sidebar-left-expand-filled'"
            class="size-6 text-gray-t-3"
          />
        </UiButton> -->
      </div>
      <div class="mt-16">
        <ClientOnly v-if="isSidebarOpen ">
          <UiNavigationTreeSubTabs
            v-if="showTabs"
            :current-nav-item="currentNavItem"
            :navigation="navigation"
            :is-active-route="isActiveRoute"
            :tab-count="appConfig.wiki.tabs.count"
            :show-icons="appConfig.wiki.tabs.showIcons"
          />
          <UiNavigationTreeSubSelect
            v-if="showSelect"
            :current-nav-item="currentNavItem"
            :navigation="navigation"
            :is-active-route="isActiveRoute"
          />
          <UiNavigationTreeSidebar :navigation="currentNavItemChildren" />
        </ClientOnly>
      </div>
    </div>
    <div
      class="min-h-screen"
      :class="{ 'lg:pl-[290px] xl:pl-[300px] 2xl:pl-[380px]': isSidebarOpen, 'lg:pl-16': !isSidebarOpen }"
    >
      <div class="mx-auto max-w-[1900px]">
        <slot />
      </div>
    </div>
  </div>
</template>
