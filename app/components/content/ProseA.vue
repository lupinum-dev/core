<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})

const { locale } = useI18n()
const localePath = useLocalePath()

const pageIdx = props.href.split('/').pop()
const { data: page, error } = await useAsyncData(props.href, () => queryContent(locale.value, 'wiki')
  .only(['_path'])
  .where({ _path: { $contains: pageIdx } })
  .findOne())

const genericPath = computed(() => {
  if (!page.value || !page.value._path)
    return ''
  return page.value._path.replace(`/${locale.value}/`, '/')
})

const hasError = computed(() => !page.value || error.value)
</script>

<template>
  <NuxtLink
    v-if="!hasError"
    :href="localePath(genericPath)"
    :target="props.target"
  >
    <slot />
  </NuxtLink>
  <span v-else class="rounded-md bg-red-500 p-2 text-white">
    Error: Invalid link: {{ props.href }},
  </span>
</template>
