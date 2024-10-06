<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

interface NavigationItem {
  title: string
  to?: string
  icon?: string
  children?: NavigationItem[]
  status?: 'updated' | 'wip' | 'outdated' | 'new'
}

const props = defineProps<{
  items: NavigationItem[]
}>()

const route = useRoute()
const openSections = ref<string[]>([])

const isActive = (item: NavigationItem) => computed(() => {
  if (item.to) {
    return item.to === route.path
  }
  return item.children?.some(child => child.to === route.path) || false
})

const toggleSection = (title: string) => {
  const index = openSections.value.indexOf(title)
  if (index > -1) {
    openSections.value.splice(index, 1)
  } else {
    openSections.value.push(title)
  }
}
</script>

<template>
  <div class="px-4 py-6 md:px-3">
    <template v-for="(section, index) in items" :key="index">
      <p v-if="section.title" class="mb-2 mt-8 px-2 font-medium first:mt-0">
        {{ section.title }}
      </p>
      <template v-for="(item, itemIndex) in section.children" :key="itemIndex">
        <UiNavigationTreeLink
          v-if="!item.children"
          :title="item.title"
          :to="item.to"
          :icon="item.icon"
          :tag="item.status"
        />
        <UiNavigationTreeAccordion
          v-else
          :title="item.title"
          :icon="item.icon"
          :children="item.children"
          :is-open="openSections.includes(item.title)"
          @toggle="toggleSection(item.title)"
        />
      </template>
    </template>
  </div>
</template>