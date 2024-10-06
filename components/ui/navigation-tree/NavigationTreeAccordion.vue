<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface NavigationItem {
  title: string
  _path: string
  icon?: string
  children?: NavigationItem[]
}

const props = defineProps<{
  title: string
  icon: string
  children: NavigationItem[]
}>()

const open = ref<string[]>([])
const route = useRoute()

const isActive = computed(() => {
  return props.children.some((child) => {
    const childMatch = child._path === route.path
    const subChildMatch = child.children && child.children.some(subChild => subChild._path === route.path)
    return childMatch || subChildMatch
  })
})

watch(isActive, (newValue) => {
  if (newValue && !open.value.includes(props.title)) {
    open.value.push(props.title)
  }
}, { immediate: true })
</script>

<template>
  <LibAccordion v-model="open" type="multiple" collapsible>
    <LibAccordionItem2 :value="props.title">
      <LibAccordionTrigger2 class="w-full">
        <UiWikiNavigationLink
          :title="props.title"
          :icon="props.icon"
          :open="isActive"
          collapsible
          class="w-full"
          :is-accordion="true"
        />
      </LibAccordionTrigger2>
      <LibAccordionContent class="ms-2 flex flex-col border-s border-gray-o-1 ps-1">
        <template v-for="child in props.children" :key="child._path">
          <div v-if="child.children">
            <UiWikiNavigationAccordion :title="child.title" :children="child.children" :icon="child.icon || ''" />
          </div>
          <div v-else>
            <UiWikiNavigationLink :title="child.title" :icon="child.icon" :to="child._path" :tag="child.status" />
          </div>
        </template>
      </LibAccordionContent>
    </LibAccordionItem2>
  </LibAccordion>
</template>

<style scoped>
.LibAccordionTrigger2 {
  width: 100%;
}
</style>
