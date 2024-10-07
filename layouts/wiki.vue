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
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-gray-b-0">
    <div
      id="sidenav"
      class="hidden overflow-y-auto border-r border-gray-o-1 transition-all duration-300 ease-in-out lg:sticky lg:flex lg:h-screen lg:flex-col"
      :class="{ 'w-[310px] xl:w-[450px]': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div class="flex justify-end p-2">
        <!-- <UiContentUserConfig
          v-if="isSidebarOpen"
          trigger-button="Dots"
        /> -->
        <UiButton variant="link" size="icon" @click="toggleSidebar">
          <Icon
            :name="isSidebarOpen ? 'tabler:layout-sidebar-left-collapse-filled' : 'tabler:layout-sidebar-left-expand-filled'"
            class="size-6 text-gray-t-3"
          />
        </UiButton>
      </div>
      <ClientOnly v-if="isSidebarOpen ">
        <UiNavigationTreeSubTabs
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
        <UiWikiSidebarNavigation :navigation="currentNavItemChildren" />
      </ClientOnly>
    </div>
    <slot />
  </div>
</template>
