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
  <div>
    <template v-if="hasGroups">
      <template v-for="(group, index) in groupedItems" :key="group.title">
        <div class="px-4 md:px-3">
          <div v-if="group.group" class="mb-3 flex items-center">
            <Icon v-if="group.icon" :name="group.icon" class="size-5" />
            <p class="font-heading px-2 text-sm first:mt-0">
              {{ group.group }}
            </p>
          </div>
          <div v-if="group.children" class="flex flex-col gap-1">
            <template v-for="item in group.children" :key="item.title">
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
                :tag="item.status"
              />
            </template>
          </div>
        </div>
        <hr v-if="index < groupedItems.length - 1" class="mx-4 my-6 border-gray-o-1 md:mx-3">
      </template>
      <hr v-if="ungroupedItems.length > 0" class="mx-4 my-6 border-gray-o-1 md:mx-3">
    </template>
    <div v-if="ungroupedItems.length > 0" class="px-4 md:px-3">
      <div class="flex flex-col gap-1">
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
            :tag="item.status"
          />
        </template>
      </div>
    </div>
  </div>
</template>
