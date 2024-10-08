<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { MeilisearchHit } from '~/types/search'
import { cleanResult, getBreadcrumb, getGroupFromUrl, getResultTitle, highlightText, truncateContent } from '~/utils/search-helper'

const emit = defineEmits(['close-modal'])
const searchQuery = ref('')
const searchResults = ref<MeilisearchHit[]>([])
const isLoading = ref(false)
const isSearching = ref(false)
const error = ref<string | null>(null)
const selectedIndex = ref(-1)

const { initMeiliSearch, search, error: meiliSearchError } = useMeiliSearch()

const { usingInput } = useShortcuts()

const resultRefs = ref<HTMLElement[]>([])
const searchResultsContainer = ref<HTMLElement | null>(null)

const selectedTags = ref<string[]>(['References', 'Blog', 'Wiki', 'Other'])

const isCustomSearchModalOpen = ref(true)

async function performSearch(): Promise<void> {
  if (searchQuery.value.trim() === '') {
    searchResults.value = []
    return
  }

  isLoading.value = true
  isSearching.value = true
  error.value = null

  try {
    const response = await search(searchQuery.value)
    searchResults.value = response.hits
      .map(cleanResult)
      .filter((result): result is MeilisearchHit => result !== null)
  }
  catch (e) {
    console.error('Search error:', e)
    error.value = `Search failed: ${e instanceof Error ? e.message : 'Unknown error'}`
    searchResults.value = []
  }
  finally {
    isLoading.value = false
    setTimeout(() => {
      isSearching.value = false
    }, 300)
  }
}

const debouncedSearch = useDebounceFn(performSearch, 300)

const groupedResults = computed(() => {
  const groups: { title: string, breadcrumb: string, items: MeilisearchHit[] }[] = []

  searchResults.value.forEach((result) => {
    const groupTitle = getGroupFromUrl(result.url)
    const breadcrumb = getBreadcrumb(result.url)
    let group = groups.find(g => g.title === groupTitle)

    if (!group) {
      group = { title: groupTitle, breadcrumb, items: [] }
      groups.push(group)
    }

    result.highlightedTitle = highlightText(getResultTitle(result), searchQuery.value)
    if (result.content) {
      result.highlightedContent = highlightText(truncateContent(result.content, searchQuery.value), searchQuery.value)
    }

    group.items.push(result)
  })

  return groups
})

const filteredGroupedResults = computed(() => {
  return groupedResults.value.filter((group) => {
    const groupTag = group.title.split('/')[0] // Get the first part of the group title
    return selectedTags.value.includes(groupTag)
  })
})

const filteredFlattenedResults = computed(() => {
  return groupedResults.value
    .filter((group) => {
      const groupTag = group.title.split('/')[0]
      return selectedTags.value.includes(groupTag)
    })
    .flatMap(group => group.items)
})

const { isKeyboardNavigation, enableKeyboardNavigation, disableKeyboardNavigation } = useKeyboardSearch()

function navigateResults(direction: 'up' | 'down') {
  const totalResults = filteredFlattenedResults.value.length
  if (totalResults === 0)
    return

  enableKeyboardNavigation()

  if (selectedIndex.value === -1) {
    selectedIndex.value = direction === 'up' ? totalResults - 1 : 0
  }
  else {
    if (direction === 'up') {
      selectedIndex.value = (selectedIndex.value - 1 + totalResults) % totalResults
    }
    else {
      selectedIndex.value = (selectedIndex.value + 1) % totalResults
    }
  }

  // Scroll to the selected result
  nextTick(() => {
    const selectedElement = resultRefs.value[selectedIndex.value]
    if (selectedElement && searchResultsContainer.value) {
      const containerElement = searchResultsContainer.value.$el as HTMLElement
      const containerRect = containerElement.getBoundingClientRect()
      const elementRect = selectedElement.getBoundingClientRect()

      if (elementRect.top < containerRect.top) {
        containerElement.scrollTop -= containerRect.top - elementRect.top
      }
      else if (elementRect.bottom > containerRect.bottom) {
        containerElement.scrollTop += elementRect.bottom - containerRect.bottom
      }
    }
  })
}

function selectResult() {
  const selectedResult = flattenedResults.value[selectedIndex.value]
  if (selectedResult) {
    navigateTo(selectedResult.url)
    closeModal()
  }
}

function handleMouseMove() {
  disableKeyboardNavigation()
}

function handleMouseEnter(index: number) {
  selectedIndex.value = index
  disableKeyboardNavigation()
}

function handleMouseLeave() {
  if (!isKeyboardNavigation.value) {
    selectedIndex.value = -1
  }
}

defineShortcuts({
  arrowup: {
    usingInput,
    whenever: [() => isCustomSearchModalOpen.value],
    handler: () => navigateResults('up'),
  },
  arrowdown: {
    usingInput,
    whenever: [() => isCustomSearchModalOpen.value],
    handler: () => navigateResults('down'),
  },
  enter: {
    usingInput,
    whenever: [() => isCustomSearchModalOpen.value],
    handler: selectResult,
  },
})

function closeModal() {
  emit('close-modal')
  isCustomSearchModalOpen.value = false // Add this line to ensure the modal state is updated
}

watch(searchQuery, () => {
  if (searchQuery.value.trim() === '') {
    searchResults.value = []
    isSearching.value = false
  }
  else {
    isSearching.value = true
    debouncedSearch()
  }
})

onMounted(() => {
  initMeiliSearch()
})

function updateSelectedTags(tags: string[]) {
  selectedTags.value = tags
}
</script>

<template>
  <div
    class="flex flex-col overflow-hidden bg-background text-foreground"
    role="search"
    @mousemove="handleMouseMove"
  >
    <div class="p-4 sm:px-6">
      <UiSearchInput
        v-model="searchQuery"
        :is-loading="isLoading"
        @close="closeModal"
      />
    </div>

    <UiSearchTags
      :selected-tags="selectedTags"
      @update:selected-tags="updateSelectedTags"
    />

    <div class="flex-grow overflow-hidden">
      <UiSearchResults
        ref="searchResultsContainer"
        :grouped-results="filteredGroupedResults"
        :filtered-flattened-results="filteredFlattenedResults"
        :selected-index="selectedIndex"
        :search-query="searchQuery"
        :is-loading="isLoading"
        :is-searching="isSearching"
        :error="error"
        :is-keyboard-navigation="isKeyboardNavigation"
        @close="closeModal"
        @mouse-enter="handleMouseEnter"
        @mouse-leave="handleMouseLeave"
        @update:result-refs="resultRefs = $event"
      />
    </div>

    <UiSearchFooter />
  </div>
</template>
