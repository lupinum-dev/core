<script setup lang="ts">
import Tag from './Tag.vue' // Import the new Tag component
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
    <LibButton
      v-if="props.icon"
      variant="outline"
      size="icon"
      class="transition-all group-hover:bg-gray-i-1" :class="[
        shouldHighlight ? 'border-prime-o-1 bg-prime-i-1 group-hover:bg-prime-i-2' : '',
      ]"
    >
      <Icon :name="props.icon" class="size-4 text-gray-t-2" />
    </LibButton>
    <LibButton
      :variant="shouldHighlight ? 'outline' : 'ghost'"
      size="xs"
      class=" w-full group-hover:bg-gray-i-1  "
      :class="shouldHighlight ? 'bg-prime-i-1 border-prime-o-1 group-hover:bg-prime-i-2' : ''"
      :as="props.to ? NuxtLink : 'button'"
      :to="props.to"
    >
      <div class="flex w-full items-center  px-2 ">
        <span class="mr-2 truncate  font-desc text-lg text-gray-t-1 lg:text-[15px]">
          {{ props.title }}
        </span>
        <Tag v-if="props.tag" :type="props.tag" />
      </div>
      <Icon
        v-if="props.isAccordion"
        id="icon"
        name="heroicons:chevron-down"
        class="rotate-icon size-4 shrink-0 transition-transform duration-200"
      />
    </LibButton>
  </div>
</template>
