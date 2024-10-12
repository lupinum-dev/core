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
const isActive = computed(() => {
  if (!props.to)
    return false
  const isActiveRoute = route.path === props.to || route.path.includes(props.to)
  return isActiveRoute
})

const isParentActive = computed(() => props.open && props.collapsible)
const shouldHighlight = computed(() => isActive.value || isParentActive.value)

const toggleHeaderExpansion = inject('toggleHeaderExpansion', () => {})

const localePath = useLocalePath()
const localizedPath = computed(() => localePath(props.to ?? ''))
</script>

<template>
  <div class="group">
    <UiButton
      variant="ghost"
      size="sm"
      class="w-full gap-2 transition-all duration-200 ease-in-out"
      :as="props.to ? NuxtLink : 'button'"
      :to="localizedPath"
      :class="{ 'bg-primary/5 ': shouldHighlight }"
      @click="toggleHeaderExpansion"
    >
      <div class="flex w-full items-center gap-2 py-2">
        <div
          v-if="props.icon"
          class="from-fd-secondary flex size-6 flex-shrink-0 items-center justify-center rounded-md border bg-gradient-to-b shadow-sm"
        >
          <Icon :name="props.icon" class="size-[18px]" />
        </div>
        <div class="flex min-w-0 flex-grow items-center justify-between">
          <div class="flex min-w-0 items-center gap-3">
            <span
              class="flex-shrink-0 text-sm font-medium"
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

          <div class="flex flex-shrink-0 items-center gap-2">
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
