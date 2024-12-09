<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { useActiveAnchor } from '~/composables/useActiveAnchor'
import { useSharedTocState } from '~/composables/useSharedTocState'

interface TocItem {
  id: string
  depth: number
  text: string
  children?: TocItem[]
  target?: Ref<HTMLElement | null>
}

const props = defineProps<{ links: TocItem[], title?: string }>()



const container = ref<HTMLElement | null>(null)
const marker = ref<HTMLElement | null>(null)

const { setActiveLink, activeLink, initializeActiveLink } = useActiveAnchor(container, marker, props.links)
const { setActiveLink: setSharedActiveLink, setTocItems } = useSharedTocState()

watch(() => props.links, (newLinks) => {
  setTocItems(newLinks)
  nextTick(() => {
    initializeActiveLink()
    debouncedSetActiveLink()
  })
}, { immediate: true, deep: true })

let rafId: number | null = null

function debouncedSetActiveLink() {
  if (rafId)
    cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    setActiveLink()
    setSharedActiveLink(activeLink.value?.text ?? null)
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', debouncedSetActiveLink, { passive: true })
})

onUpdated(debouncedSetActiveLink)

onUnmounted(() => {
  if (rafId)
    cancelAnimationFrame(rafId)
})

const Circle = h('div', { class: 'flex size-4 xl:text-xs items-center justify-center text-primary-foreground rounded-full bg-primary mr-2' }, '1')

const { t } = useI18n()
</script>

<template>
  <nav
    ref="container"
    aria-labelledby="doc-outline-aria-label"
    class="relative py-3 lg:py-6 mr-6 xl:mr-12 2xl:mr-24"
    :class="{ block: props.links.length > 0, hidden: !props.links.length }"
  >
    <h3
      id="doc-outline-aria-label"
      class="mb-3 text-sm font-semibold text-foreground"
    />

    <div class="relative pl-4">
      <div ref="marker" class="outline-marker" />
      <div class="vertical-line" />
      <ul v-if="props.links.length" class="space-y-1 text-xs xl:text-sm">
        <li v-for="link in props.links" :key="link.id">
          <div class="flex items-center">
            <!-- TODO: With steps component the circle should be shown like Clerk Docs -->
            <Circle v-if="false" />
            <NuxtLink
              :href="`#${link.id}`"
              class="block py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground hover:underline"
              :class="{ active: activeLink?.id === link.id }"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
          <ul v-if="link.children?.length" class="mt-1 space-y-1 pl-4">
            <li v-for="child in link.children" :key="child.id">
              <!-- TODO: With steps component the circle should be shown like Clerk Docs -->
              <div class="flex items-center">
                <Circle v-if="false" />
                <NuxtLink
                  :href="`#${child.id}`"
                  class="block py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground hover:underline"
                  :class="{ active: activeLink?.id === child.id }"
                >
                  {{ child.text }}
                </NuxtLink>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <UiButton variant="link" class="flex items-center text-muted-foreground opacity-75" @click="scrollToTop">
        <Icon name="i-heroicons-chevron-up" class="mr-1" />
        {{ t('backToTop') }}
      </UiButton>
    </div>
  </nav>
</template>

<style scoped>
.vertical-line {
  @apply absolute top-0 bottom-0 left-0 w-px bg-border;
}

.outline-marker {
  @apply absolute top-[33px] -left-px z-10 opacity-0 w-[3px] rounded-[2px] h-[18px] bg-primary;
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}
.active {
  @apply text-teal-500 dark:text-teal-400;
}
</style>

<i18n lang="yaml">
  en:
    backToTop: Back to Top
  de:
    backToTop: Nach oben
</i18n>
