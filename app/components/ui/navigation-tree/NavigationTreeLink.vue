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
  status?: 'updated' | 'wip' | 'outdated' | 'new'
}>()

const route = useRoute()
const isActive = computed(() => props.to === route.path)
const isParentActive = computed(() => props.open && props.collapsible)
const shouldHighlight = computed(() => isActive.value || isParentActive.value)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})
</script>

<template>
  <div class="group">
    <UiButton
      variant="ghost"
      size="sm"
      class="w-full gap-2 transition-all duration-200 ease-in-out"
      :as="props.to ? NuxtLink : 'button'"
      :to="props.to"
      :class="{ 'bg-primary-foreground ': shouldHighlight }"
      @click="toggleHeaderExpansion"
    >
      <div class="flex w-full items-center gap-2 py-2">
        <div
          v-if="props.icon"
          class="from-fd-secondary flex size-6 items-center justify-center rounded-md border bg-gradient-to-b shadow-sm flex-shrink-0"
        >
          <Icon :name="props.icon" class="size-[18px]" />
        </div>
        <div class="flex flex-grow items-center justify-between min-w-0">
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="text-sm font-medium flex-shrink-0"
              :class="{ 'font-semibold': shouldHighlight }"
            >
              {{ props.title }}
            </span>
            <UiNavigationTreeTag
              v-if="props.status"
              variant="rounded"
              :type="props.status"
              class="flex-shrink truncate"
            />
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
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
