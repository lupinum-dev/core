<script setup lang="ts">
import type { NavItem } from '@/types/navigation'

const props = withDefaults(
  defineProps<{
    currentNavItem: NavItem
    navigation: NavItem[]
    isActiveRoute: (path: string) => boolean
    tabCount: 2 | 3
    showIcons: boolean
  }>(),
  {
    tabCount: 2,
    showIcons: false,
  },
)

const router = useRouter()

async function handleTabChange(value: string) {
  const selectedItem = props.navigation.find(item => item._path === value)
  if (selectedItem) {
    await navigateTo({ path: selectedItem.firstLink || selectedItem._path })
  }
}

const tabWidth = computed(() => props.tabCount === 2 ? 'w-1/2' : '')
</script>

<template>
  <UiTabs
    :default-value="currentNavItem._path"
    class="mb-4 px-2"
  >
    <UiTabsList class="flex w-full">
      <UiTabsTrigger
        v-for="item in navigation.slice(0, tabCount)"
        :key="item._path"
        :value="item._path"
        class="w-fit flex-1" :class="[tabWidth]"
        @click="handleTabChange(item._path)"
      >
        <div class="flex w-full items-center justify-center">
          <Icon v-if="showIcons && item.icon" :name="item.icon" class="mr-2 size-4" />
          <span class="truncate">{{ item.title }}</span>
        </div>
      </UiTabsTrigger>
    </UiTabsList>
  </UiTabs>
</template>
