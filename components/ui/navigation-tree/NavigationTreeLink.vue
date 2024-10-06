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
  tag?: 'updated' | 'wip' | 'outdated' | 'new' // New prop for tag type
}>()

const route = useRoute()
const isActive = computed(() => props.to === route.path)
const isParentActive = computed(() => props.open && props.collapsible)
const shouldHighlight = computed(() => isActive.value || isParentActive.value)
</script>

<template>
  <div class="group mb-2 flex items-center gap-1 lg:mb-0.5">
    <UiButton
      v-if="props.icon"
      variant="outline"
      size="icon"
      class="transition-all group-hover:bg-secondary/80"
      :class="[
        shouldHighlight ? 'border-primary bg-primary/10 group-hover:bg-primary/20' : '',
      ]"
    >
      <Icon :name="props.icon" class="size-4 text-foreground/60" />
    </UiButton>
    <UiButton
      :variant="shouldHighlight ? 'outline' : 'ghost'"
      size="xs"
      class="w-full group-hover:bg-secondary/80"
      :class="shouldHighlight ? 'bg-primary/10 border-primary group-hover:bg-primary/20' : ''"
      :as="props.to ? NuxtLink : 'button'"
      :to="props.to"
    >
      <div class="flex w-full items-center px-2">
        <span class="mr-2 truncate font-medium text-foreground lg:text-sm">
          {{ props.title }}
        </span>
        <UiNavigationTreeTag v-if="props.tag" :type="props.tag" />
      </div>
      <Icon
        v-if="props.isAccordion"
        id="icon"
        name="heroicons:chevron-down"
        class="rotate-icon size-4 shrink-0 transition-transform duration-200"
      />
    </UiButton>
  </div>
</template>
