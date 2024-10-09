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

const appConfig = useAppConfig()
</script>

<template>
  <UiPopover v-model:open="isOpen">
    <UiPopoverTrigger
      class="group mx-2 mb-8 mt-6 flex w-[calc(100%-1rem)] items-center justify-between rounded-lg p-2 text-foreground transition-all duration-150 hover:bg-accent"
    >
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded-md bg-secondary transition-colors duration-150 group-hover:bg-accent">
          <Icon :name="currentNavItem.icon || appConfig.header.toc.icon" class="size-6 text-secondary-foreground transition-transform duration-150 group-hover:scale-110" />
        </div>
        <div class="flex-1 text-left">
          <p class="font-heading transition-colors duration-150 group-hover:text-accent-foreground">
            {{ currentNavItem.title }}
          </p>
          <p v-if="currentNavItem.description && appConfig.wiki.select.showDescriptionText" class="font-pressura text-sm text-muted-foreground transition-colors duration-150 group-hover:text-accent-foreground">
            {{ currentNavItem.description ?? 'No description available' }}
          </p>
        </div>
      </div>
      <Icon :name="appConfig.wiki.select.chevronIcon" class="size-5 text-muted-foreground transition-transform duration-150" />
    </UiPopoverTrigger>

    <UiPopoverContent
      class="z-50 overflow-hidden rounded-lg bg-popover p-2 shadow-lg"
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
                ? 'bg-accent text-accent-foreground'
                : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
          >
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-md p-1.5"
            >
              <Icon :name="item.icon || appConfig.header.toc.icon" class="size-6 text-primary" />
            </div>
            <div class="flex-1 text-left">
              <p class="font-heading text-sm">
                {{ item.title }}
              </p>
              <p v-if="item.description && appConfig.wiki.select.showDescriptionText" class="font-pressura text-sm text-muted-foreground">
                {{ item.description ?? 'Navigation item' }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
