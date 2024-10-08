<script setup lang="ts">
import { getLocaleIcon, locales } from '../../../nuxt.config-utils'

interface Props {
  variant?: 'default' | 'ghost' | 'link' | 'destructive' | 'outline' | 'secondary'
  displayType?: 'icon' | 'text'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  displayType: 'icon',
})

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

function setLanguage(lang: string) {
  router.push(switchLocalePath(lang))
}

const currentLocaleText = computed(() => {
  const currentLocale = locales.find(l => l.code === locale.value)
  return currentLocale?.name || locale.value
})

const currentLocaleIcon = computed(() => getLocaleIcon(locale.value))
</script>

<template>
  <UiDropdownMenuRoot>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        :size="props.displayType === 'icon' ? 'icon' : 'default'"
        :variant="props.variant"
      >
        <template v-if="props.displayType === 'icon'">
          <Icon name="heroicons:language-20-solid" class="size-[1.2rem]" />
          <span class="sr-only">{{ t('language_toggle') }}</span>
        </template>
        <template v-else>
          <Icon :name="currentLocaleIcon" class="mr-2 size-4" />
          {{ currentLocaleText }}
          <Icon name="heroicons:chevron-down" class="ml-2 size-4" />
        </template>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem
        v-for="l in locales"
        :key="l.code"
        :class="{ 'bg-gray-i-1': locale === l.code }"
        @click="setLanguage(l.code)"
      >
        <Icon :name="getLocaleIcon(l.code)" class="mr-2 size-4" />
        {{ l.name }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenuRoot>
</template>

<i18n lang="yaml">
en:
  language_toggle: 'Toggle language'
de:
  language_toggle: 'Sprache umschalten'
</i18n>
