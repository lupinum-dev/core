<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps<{
  icon?: string
  isClosing?: boolean
  open?: boolean
  title: string
  to?: string
  collapsible?: boolean
  isAccordion?: boolean
  tag?: 'updated' | 'wip' | 'outdated' | 'new'
}>()

const route = useRoute()
const isActive = computed(() => props.to === route.path)
const isParentActive = computed(() => props.open && props.collapsible)
const shouldHighlight = computed(() => isActive.value || isParentActive.value)
</script>

<template>
  <div class="group">
    <UiButton
      variant="ghost"
      size="sm"
      class="w-full transition-all duration-200 ease-in-out"
      :class="{
        'bg-primary/5 text-primary shadow-sm': shouldHighlight,
        'hover:bg-secondary/80': !shouldHighlight,
      }"
      :as="props.to ? NuxtLink : 'button'"
      :to="props.to"
    >
      <div class="flex w-full items-center gap-3 px-3 py-2">
        <div
          v-if="props.icon"
          class="flex size-6 shrink-0 items-center justify-center rounded-md transition-colors duration-200"
        >
          <Icon :name="props.icon" class="size-[18px]" />
        </div>
        <div class="flex flex-grow items-center justify-between">
          <span class="truncate text-sm font-medium" :class="{ 'text-primary': shouldHighlight }">
            {{ props.title }}
          </span>
          <div class="flex items-center gap-2">
            <UiNavigationTreeTag v-if="props.tag" :type="props.tag" />
            <Icon
              v-if="props.isAccordion"
              name="heroicons:chevron-down"
              class="size-4 shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': props.open }"
            />
          </div>
        </div>
      </div>
    </UiButton>
  </div>
</template>

<style scoped>
.group:hover .rotate-icon {
  transform: rotate(180deg);
}
</style>
