<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { computed, useAppConfig, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  photographer: {
    type: String,
    default: '',
  },
})

const appConfig = useAppConfig()
const showCaption = computed(() => appConfig.content?.image?.showCaption ?? false)
const showPhotographer = computed(() => appConfig.content?.image?.photographer ?? false)

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const captionText = computed(() => props.caption || props.alt)

const route = useRoute()
</script>

<template>
  <figure :class="{ 'mt-6 xl:-mx-16 2xl:-mx-28': !route.path.includes('wiki'), 'mt-6 xl:-mx-8 2xl:-mx-16': route.path.includes('wiki') }">
    <NuxtImg
      :src="refinedSrc"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      class="w-full rounded-lg shadow-md"
    />
    <figcaption v-if="showCaption && alt" class="mt-2 w-full text-center text-sm text-muted-foreground">
      {{ captionText }}
      <div v-if="showPhotographer && props.photographer" class="mt-1 text-xs font-medium uppercase text-muted-foreground/80">
        Photo by {{ props.photographer }}
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  display: flex;
  flex-direction: column;
  align-items: center;
}

figcaption {
  max-width: 80%;
  text-align: center;
}
</style>
