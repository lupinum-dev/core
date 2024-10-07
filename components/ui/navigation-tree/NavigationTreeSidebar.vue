<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavigationItem {
  title: string
  _path: string
  icon?: string
  status?: 'updated' | 'wip' | 'outdated' | 'new'
  children?: NavigationItem[]
  group?: string
}

const props = defineProps<{
  navigation: NavigationItem[]
}>()

const hasGroups = computed(() => props.navigation.some(item => item.group))

const groupedItems = computed(() => {
  if (!hasGroups.value)
    return []
  return props.navigation.filter(item => item.group)
})

const ungroupedItems = computed(() => {
  return props.navigation.filter(item => !item.group)
})
</script>

<template>
  <div>
    <div v-if="ungroupedItems.length > 0" class="px-4 md:px-3">
      <div class="flex flex-col gap-1">
        <template v-for="item in ungroupedItems" :key="item.title">
          <UiNavigationTreeAccordion
            v-if="item.children"
            :title="item.title"
            :children="item.children"
            :icon="item.icon || ''"
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
    <template v-if="hasGroups">
      <template v-for="(group, index) in groupedItems" :key="group.title">
        <div class="px-4 md:px-3">
          <div v-if="group.group" class="mb-3 flex items-center">
            <Icon v-if="group.icon" :name="group.icon" class="size-5" />
            <p class="px-2 font-heading text-sm first:mt-0">
              {{ group.group }}
            </p>
          </div>
          <div v-if="group.children" class="flex flex-col gap-1">
            <template v-for="item in group.children" :key="item.title">
              <UiNavigationTreeAccordion
                v-if="item.children"
                :title="item.title"
                :children="item.children"
                :icon="item.icon || ''"
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
        <hr v-if="index < groupedItems.length - 1" class="mx-4 my-6 border-gray-o-1 md:mx-3">
      </template>
      <hr v-if="ungroupedItems.length > 0" class="mx-4 my-6 border-gray-o-1 md:mx-3">
    </template>
  </div>
</template>
