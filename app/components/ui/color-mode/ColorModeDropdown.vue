<script setup lang="ts">
interface Props {
  variant?: 'default' | 'ghost' | 'link' | 'destructive' | 'outline' | 'secondary'
  displayType?: 'icon' | 'text'
}

const props = withDefaults(defineProps<Props>(), {
  inheritAttrs: false,
  variant: 'ghost',
  displayType: 'icon',
})

const colorMode = useColorMode()
// const { t } = useI18n()

function setColorMode(mode: 'light' | 'dark' | 'system') {
  colorMode.preference = mode
}

const currentModeText = computed(() => {
  switch (colorMode.preference) {
    case 'light': return 'Light'
    case 'dark': return 'Dark'
    case 'system': return 'System'
    default: return 'System'
  }
})

const appConfig = useAppConfig()
</script>

<template>
  <UiDropdownMenuRoot>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        :size="props.displayType === 'icon' ? 'icon' : 'default'"
        :variant="props.variant"
        v-bind="$attrs"
      >
        <template v-if="props.displayType === 'icon'">
          <Icon :name="appConfig.colorMode.darkModeIcon" class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icon :name="appConfig.colorMode.lightModeIcon" class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </template>
        <template v-else>
          <Icon v-if="colorMode.preference === 'light'" name="heroicons:moon" class="mr-2 size-4" />
          <Icon v-else-if="colorMode.preference === 'dark'" name="heroicons:sun" class="mr-2 size-4" />
          <Icon v-else name="heroicons:cog-6-tooth" class="mr-2 size-4" />
          {{ currentModeText }}
          <Icon name="heroicons:chevron-down" class="ml-2 size-4" />
        </template>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem
        :class="{ 'bg-accent text-accent-foreground': colorMode.preference === 'light' }"
        @click="setColorMode('light')"
      >
        <Icon :name="appConfig.colorMode.lightModeIcon" class="mr-2 size-4" />
        Light
      </UiDropdownMenuItem>
      <UiDropdownMenuItem
        :class="{ 'bg-accent text-accent-foreground': colorMode.preference === 'dark' }"
        @click="setColorMode('dark')"
      >
        <Icon :name="appConfig.colorMode.darkModeIcon" class="mr-2 size-4" />
        Dark
      </UiDropdownMenuItem>
      <UiDropdownMenuItem
        :class="{ 'bg-accent text-accent-foreground': colorMode.preference === 'system' }"
        @click="setColorMode('system')"
      >
        <Icon :name="appConfig.colorMode.systemModeIcon" class="mr-2 size-4" />
        System
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenuRoot>
</template>

<!-- <i18n lang="yaml">
en:
  color_mode_toggle: 'Toggle theme'
  mode_light: 'Light'
  mode_dark: 'Dark'
  mode_system: 'System'
de:
  color_mode_toggle: 'Thema umschalten'
  mode_light: 'Hell'
  mode_dark: 'Dunkel'
  mode_system: 'System'
</i18n> -->
