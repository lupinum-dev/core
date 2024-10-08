<script setup lang="ts">
interface NavigationItem {
  title: string
  _path: string
  children?: NavigationItem[]
  icon?: string
  group?: string
  firstLink?: string
  status?: 'updated' | 'wip' | 'outdated' | 'new'
}

type Navigation = NavigationItem[]

const wikiNavigation = inject<Ref<Navigation>>('navigation-wiki')

const { currentSubmenuRoute } = useSubMenu()

const wikiSubNavigation = computed<NavItem | undefined>(() => {
  return wikiNavigation?.value?.find(item => item._path === currentSubmenuRoute.value)
})

const hasGroups = computed(() => wikiSubNavigation.value?.children?.some(item => item.group) ?? false)

const groupedItems = computed(() => {
  if (!hasGroups.value || !wikiSubNavigation.value?.children)
    return []
  return wikiSubNavigation.value.children.filter(item => item.group)
})

const ungroupedItems = computed(() => {
  if (!wikiSubNavigation.value?.children)
    return []
  return wikiSubNavigation.value.children.filter(item => !item.group)
})
</script>

<template>
  <div v-if="ungroupedItems.length > 0" class="">
    <div class="flex flex-col gap-1 px-1">
      <template v-for="item in ungroupedItems" :key="item.title">
        <UiNavigationTreeAccordion
          v-if="item.children"
          :title="item.title"
          :children="item.children"
          :icon="item.icon ?? ''"
        />
        <UiNavigationTreeLink
          v-else
          :title="item.title"
          :icon="item.icon"
          :to="item._path"
          :status="item.status"
        />
      </template>
    </div>
  </div>
  <template v-if="hasGroups">
    <template v-for="(group, index) in groupedItems" :key="group.title">
      <div class="">
        <div v-if="group.group" class="mb-1.5 mt-4 flex items-center">
          <Icon v-if="group.icon" :name="group.icon" class="size-5" />
          <p class="px-2 text-xs font-black first:mt-0">
            {{ group.group }}
          </p>
        </div>
        <div v-if="group.children" class="flex flex-col gap-1 px-1">
          <template v-for="item in group.children" :key="item.title">
            <UiNavigationTreeAccordion
              v-if="item.children"
              :title="item.title"
              :children="item.children"
              :icon="item.icon ?? ''"
              :status="item.status"
            />
            <UiNavigationTreeLink
              v-else
              :title="item.title"
              :icon="item.icon"
              :to="item._path"
              :status="item.status"
            />
          </template>
        </div>
      </div>
    </template>
  </template>
</template>
