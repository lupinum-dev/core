<script setup lang="ts">
import type { NavItem } from '@/types/navigation'

interface Props {
  currentNavItem: NavItem
  navigation: NavItem[]
  isActiveRoute: (path: string) => boolean
}

defineProps<Props>()
const isOpen = ref(false)

function closePopover() {
  isOpen.value = false
}
</script>

<template>
  <LibPopover v-model:open="isOpen">
    <LibPopoverTrigger
      class="group mx-2 mb-8 flex w-[calc(100%-1rem)] items-center justify-between rounded-lg p-2 text-gray-t-1 transition-all duration-150 hover:bg-prime-i-1"
    >
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded-md bg-prime-i-2 transition-colors duration-150 group-hover:bg-prime-i-1">
          <Icon :name="currentNavItem.icon || 'i-heroicons-bars-3'" class="size-6 text-prime-t-2 transition-transform duration-150 group-hover:scale-110" />
        </div>
        <div class="flex-1 text-left">
          <p class="font-heading transition-colors duration-150 group-hover:text-prime-t-1">
            {{ currentNavItem.title }}
          </p>
          <p class="font-pressura text-sm text-gray-t-3 transition-colors duration-150 group-hover:text-prime-t-2">
            {{ currentNavItem.description ?? 'No description available' }}
          </p>
        </div>
      </div>
      <Icon name="i-heroicons-chevron-down" class="size-5 text-gray-t-3 transition-transform duration-150 " />
    </LibPopoverTrigger>

    <LibPopoverContent
      class="z-50 overflow-hidden rounded-lg bg-gray-b-0 p-2 shadow-lg"
      :style="{
        width: 'var(--radix-popover-trigger-width)',
        maxHeight: 'var(--radix-popover-content-available-height)',
      }"
    >
      <div class="max-h-[300px] space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item._path"
          :to="item.firstLink"
          class="block w-full"
          @click="closePopover"
        >
          <div
            class="flex w-full items-center gap-3 rounded-md p-2 transition duration-150"
            :class="[
              isActiveRoute(item.firstLink ?? '')
                ? 'bg-gray-i-1 text-prime-t-1'
                : 'text-gray-t-1 hover:bg-prime-i-1',
            ]"
          >
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-md  p-1.5"
            >
              <Icon :name="item.icon || 'i-heroicons-bars-3'" class="size-6 text-prime-t-2" />
            </div>
            <div class="flex-1 text-left">
              <p class="font-heading text-sm">
                {{ item.title }}
              </p>
              <p class="font-pressura text-sm text-gray-t-2">
                {{ item.description ?? 'Navigation item' }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </LibPopoverContent>
  </LibPopover>
</template>
