<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface NavigationItem {
  title: string
  _path: string
  icon?: string
  children?: NavigationItem[]
  status?: 'updated' | 'wip' | 'outdated' | 'new'
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
  <UiAccordion v-model="open" type="multiple" collapsible variant="ghost" class="p-0">
    <UiAccordionItem2 :value="props.title">
      <UiAccordionTrigger2 class="w-full">
        <UiNavigationTreeLink
          :title="props.title"
          :icon="props.icon"
          :open="isActive"
          collapsible
          class="w-full"
          :is-accordion="true"
        />
      </UiAccordionTrigger2>
      <UiAccordionContent class="ms-2 flex flex-col border-s border-border ps-1">
        <template v-for="child in props.children" :key="child._path">
          <div v-if="child.children">
            <UiNavigationTreeAccordion :title="child.title" :children="child.children" :icon="child.icon || ''" />
          </div>
          <div v-else>
            <UiNavigationTreeLink :title="child.title" :icon="child.icon" :to="child._path" :tag="child.status" />
          </div>
        </template>
      </UiAccordionContent>
    </UiAccordionItem2>
  </UiAccordion>
</template>

<style scoped>
.LibAccordionTrigger2 {
  width: 100%;
}
</style>
