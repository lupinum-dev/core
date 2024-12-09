<script setup lang="ts">
import { inView } from "motion"
import type { Ref } from 'vue'

// Types
type VideoRef = Ref<HTMLVideoElement | null>
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
  target: Ref<HTMLElement | null>
}

// Refs
const desktopVideo = ref<HTMLVideoElement | null>(null)
const tocLinks = ref<TocLink[]>([])

// Route and i18n
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

// Store
const referencesStore = useReferences()

// Page meta
definePageMeta({
  layout: 'blog',
})

// Computed
const pageId = computed(() => {
  const lastSlug = route.params.slug?.[route.params.slug.length - 1] ?? ''
  const id = lastSlug.split('-').pop() ?? ''
  return id
})

// Initialize store if needed
if (!referencesStore.currentReferences.length) {
  await referencesStore.init()
}

const page = computed(() => referencesStore.getReferenceById(pageId.value))

// Add error handling for non-existent pages
if (!page.value) {
  throw createError({
    statusCode: 404,
    message: `Reference with ID ${pageId.value} not found`
  })
  
}

// Video playback handlers
const handleVideoPlayback = async (videoRef: VideoRef) => {
  if (!videoRef.value || !videoRef.value.paused) return
  try {
    await videoRef.value.play()
  } catch (error) {
    console.warn('Video playback failed:', error)
  }
}

const handleVideoPause = (videoRef: VideoRef) => {
  if (!videoRef.value || videoRef.value.paused) return
  videoRef.value.pause()
}

// Lifecycle hooks
onMounted(async () => {
  // Load video components
  await Promise.all([
    import('media-chrome'),
    import('hls-video-element')
  ])

  // Set up TOC links
  tocLinks.value = (page.value?.body?.toc?.links?.map((link: any) => ({
    ...link,
    depth: link.depth || 1,
    target: ref(document.getElementById(link.id)),
  })) ?? [])

  // Set up inView for video playback
  if (page.value?.video_id) {
    inView('#video-player', () => {
      handleVideoPlayback(desktopVideo)
      return () => handleVideoPause(desktopVideo)
    })
  }
})
</script>

<template>
  <div class="relative lg:flex w-full flex-grow">
    <div v-if="referencesStore.error" class="w-full px-4 py-12 text-center">
      <p class="text-red-500">{{ referencesStore.error.message }}</p>
      <NuxtLink :to="localePath('/references')" class="mt-4 text-primary hover:underline">
        Back to References
      </NuxtLink>
    </div>

    <!-- Left sidebar - Back button -->
    <div class="hidden w-[300px] lg:block">
      <div class="sticky top-40 flex justify-end pr-8">
        <NuxtLink :to="localePath('/references')"
          class="group flex size-10 items-center justify-center rounded-full bg-background shadow-md shadow-secondary/5 ring-1 ring-border transition dark:border dark:border-border/50 dark:bg-secondary dark:ring-0 dark:ring-ring/10 dark:hover:border-border dark:hover:ring-ring/20"
          aria-label="Go back to references">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"
            class="size-4 stroke-muted-foreground transition group-hover:stroke-foreground dark:stroke-muted-foreground dark:group-hover:stroke-foreground">
            <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>

     <!-- Main content -->
      <div class="mx-auto flex min-w-0 max-w-[850px] flex-col px-4 bg-svg dark:bg-svg-dark ">
        <div class="prose-primary prose mt-24 w-full sm:px-12 rounded-lg text-gray-t-2 dark:prose-invert">
          <UiContentHeader :title="page?.title ?? ''" :description="page?.description ?? ''" />

          <UiContentCTA />

          <div v-if="page?.video_id" id="video-player"
            class="mt-6 xl:-mx-16 2xl:-mx-28 bg-foreground/5 sm:p-4 ring-1 ring-inset ring-foreground/10 sm:rounded-xl flex relative z-20">
            <ClientOnly>
              <media-controller class="video-section aspect-video w-full sm:rounded-xl overflow-clip relative z-20 ">
                <!-- eslint-disable vue/no-deprecated-slot-attribute -->
                <hls-video ref="desktopVideo" slot="media"
                  :src="`https://customer-yt9055w02owyv2y0.cloudflarestream.com/${page?.video_id}/manifest/video.m3u8`"
                  muted loop preload="none" playsinline crossorigin class="scale-[101%] z-30" />
                <media-poster-image slot="poster"
                  :src="`https://customer-yt9055w02owyv2y0.cloudflarestream.com/${page?.video_id}/thumbnails/thumbnail.jpg`" />

              </media-controller>
              <template #fallback>
                <!-- this will be rendered on server side -->
                <NuxtImg
                  :src="`https://customer-yt9055w02owyv2y0.cloudflarestream.com/${page?.video_id}/thumbnails/thumbnail.jpg`"
                  alt="Video placeholder" class="w-full aspect-video object-cover" width="640" height="360"
                  loading="lazy" />
              </template>
            </ClientOnly>
          </div>

          <ContentRenderer v-if="page?.body" :value="page" />
          <!-- divider: -->
          <div class="border-t-2 mt-12 w-full border-border"></div>
          <div class=" mt-12 flex justify-center">
            <UiElementsFeedback />
          </div>
          <div class="py-24">
            <UiContentCTA />
          </div>
        </div>
      </div>

      <!-- Right sidebar - TOC -->
      <div class="hidden w-[300px] lg:block">
        <div class="sticky top-32 pl-8">
          <ClientOnly>

            <UiContentTocDesktop :links="tocLinks" />
          </ClientOnly>
        </div>
      </div>
  </div>
</template>

<style>
.content-text {
  font-family: inherit !important;
}
</style>

