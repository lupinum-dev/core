<script setup lang="ts">
import type { MeilisearchHit } from '~/types/search'

const props = defineProps<{
  groupedResults: { title: string, breadcrumb: string, items: MeilisearchHit[] }[]
  filteredFlattenedResults: MeilisearchHit[]
  selectedIndex: number
  searchQuery: string
  isLoading: boolean
  isSearching: boolean
  error: string | null
  isKeyboardNavigation: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'mouseEnter', index: number): void
  (e: 'mouseLeave'): void
  (e: 'update:result-refs', refs: HTMLElement[]): void
}>()

const resultRefs = ref<HTMLElement[]>([])
const searchResultsContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  emit('update:result-refs', resultRefs.value)
})

watch(resultRefs, (newRefs) => {
  emit('update:result-refs', newRefs)
})

function getBreadcrumbLinks(breadcrumb: string) {
  const parts = breadcrumb.split(' / ')
  return parts.map((part, index) => ({
    label: part,
    disabled: index === parts.length - 1, // Disable the last item
  }))
}
</script>

<template>
  <div ref="searchResultsContainer" class="mt-3 h-full overflow-y-auto">
    <div v-if="groupedResults.length" class="z-10 w-full">
      <main class="w-full px-4 text-muted-foreground">
        <section v-for="(group, groupIndex) in groupedResults" :key="groupIndex" class="mb-4">
          <div class="font-heading text-sm text-foreground">
            <template v-for="(link, index) in getBreadcrumbLinks(group.breadcrumb)" :key="index">
              <span v-if="index > 0" class="mx-1">/</span>
              <span :class="{ 'text-muted-foreground': link.disabled }">{{ link.label }}</span>
            </template>
          </div>
          <ul v-auto-animate role="list" class="mt-2 space-y-2">
            <li
              v-for="result in group.items"
              :key="result.objectID"
              :ref="el => { if (el) resultRefs[filteredFlattenedResults.indexOf(result)] = el as HTMLElement }"
              class="group"
              @mouseenter="$emit('mouseEnter', filteredFlattenedResults.indexOf(result))"
              @mouseleave="$emit('mouseLeave')"
            >
              <NuxtLink
                :to="result.url"
                class="relative mb-1 flex size-full cursor-pointer rounded-md bg-background px-4 py-3 text-foreground shadow-sm transition-colors hover:bg-accent"
                :class="{
                  'ring-2 ring-ring': filteredFlattenedResults.indexOf(result) === selectedIndex,
                  'group-hover:ring-2 group-hover:ring-ring': !isKeyboardNavigation,
                }"
                @click="$emit('close')"
              >
                <div class="flex w-full items-center justify-between">
                  <span class="flex items-center">
                    <Icon
                      :name="result.url.includes('#') ? 'i-heroicons-hashtag' : 'i-heroicons-document-text'"
                      class="mr-3 size-5 flex-shrink-0 text-muted-foreground"
                    />
                    <span class="flex flex-col">
                      <p class="m-0 overflow-hidden text-ellipsis p-0 font-sub text-[15px] text-foreground" v-html="result.highlightedTitle" />
                      <p v-if="result.content" class="m-0 mt-1 overflow-hidden text-ellipsis p-0 text-sm text-muted-foreground" v-html="result.highlightedContent" />
                    </span>
                  </span>
                  <span class="duration-50 flex items-center opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                    <Icon name="i-heroicons-arrow-right-20-solid" class="size-5 flex-shrink-0 text-muted-foreground" />
                  </span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </main>
    </div>

    <div v-else-if="searchQuery && !isLoading && !isSearching" class="w-full px-4 text-muted-foreground">
      <p class="top-0 z-10 bg-background py-2 text-sm font-bold text-primary">
        No results found.
      </p>
    </div>

    <Icon v-if="error" :title="error" color="destructive" name="i-heroicons-exclamation-triangle" />
  </div>
</template>
