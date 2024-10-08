<script setup lang="ts">
import { Toggle } from 'radix-vue'

interface Props {
  triggerButton: 'Dots' | 'Settings'
}

defineProps<Props>()

const fontOptions = [
  { value: 'font-desc', label: 'Sans', icon: 'mdi:format-font' },
  { value: 'font-serif', label: 'Serif', icon: 'mdi:format-font' },
  { value: 'font-mono', label: 'Monospace', icon: 'mdi:console' },
  { value: 'font-pressura', label: 'Pressura', icon: 'mdi:format-font' },
]

const sizeOptions = [
  { value: 'text-[13px]', label: 'Small', icon: 'mdi:format-font-size-decrease' },
  { value: 'text-[15px]', label: 'Medium', icon: 'mdi:format-size' },
  { value: 'text-[17px]', label: 'Large', icon: 'mdi:format-font-size-increase' },
]

const lineHeightOptions = [
  { value: 'leading-7', label: 'Normal', icon: 'mdi:format-line-spacing' },
  { value: 'leading-8', label: 'Relaxed', icon: 'mdi:format-line-spacing' },
  { value: 'leading-10', label: 'Loose', icon: 'mdi:format-line-spacing' },
]

const userConfig = useLocalStorage('userTextConfig', {
  font: 'font-sans',
  size: 'text-base',
  lineHeight: 'leading-normal',
})

function applyConfig() {
  if (process.client) {
    document.body.className = `${userConfig.value.font} ${userConfig.value.size} ${userConfig.value.lineHeight}`
  }
}

function updateConfig(group: 'font' | 'size' | 'lineHeight', value: string) {
  userConfig.value[group] = value
  applyConfig()
}

onMounted(() => {
  applyConfig()
})

const modelValue = ref([50])
</script>

<template>
  <UiDialog>
    <UiDialogTrigger>
      <UiButton
        v-if="triggerButton === 'Settings'"
        variant="link"
        class="flex items-center text-gray-t-3 opacity-75 transition-opacity hover:opacity-100"
      >
        <Icon name="heroicons:cog-6-tooth-20-solid" class="mr-2" />
        Page Settings
      </UiButton>
      <UiButton
        v-else-if="triggerButton === 'Dots'"
        variant="link"
        size="icon"
        class="mr-2 rounded-full transition-colors hover:bg-gray-b-1"
      >
        <Icon
          name="heroicons:ellipsis-horizontal-20-solid"
          class="size-6 text-gray-t-3"
        />
      </UiButton>
    </UiDialogTrigger>

    <UiDialogContent class="max-w-2xl">
      <UiDialogTitle class="mb-4 text-2xl font-bold">
        Text Settings
      </UiDialogTitle>
      <UiDialogDescription class="mb-6 text-gray-t-2">
        Customize the text settings for your content to enhance readability and visual appeal.
      </UiDialogDescription>

      <div class="space-y-8">
        <div class="flex items-center justify-between rounded-lg bg-gray-b-1 p-4">
          <div class="flex items-center space-x-4">
            <Icon name="mdi:translate" class="text-2xl text-gray-t-2" />
            <span class="font-medium">Language</span>
          </div>
          <UiElementsLanguageDropdown display-type="text" />
        </div>

        <div class="flex items-center justify-between rounded-lg bg-gray-b-1 p-4">
          <div class="flex items-center space-x-4">
            <Icon name="mdi:theme-light-dark" class="text-2xl text-gray-t-2" />
            <span class="font-medium">Color Mode</span>
          </div>
          <UiColorModeDropdown display-type="text" />
        </div>

        <div class="space-y-6">
          <h3 class="text-lg font-semibold">
            Content Rendering Settings
          </h3>

          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-t-2">
              Font Family
            </h4>
            <div class="flex flex-wrap gap-4">
              <Toggle
                v-for="option in fontOptions"
                :key="option.value"
                :pressed="userConfig.font === option.value"
                class="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-o-1 bg-gray-b-0 p-2 transition-all focus-within:shadow-[0_0_0_2px] focus-within:shadow-black hover:bg-gray-b-1"
                :class="{ 'ring-2 ring-prime-c-1': userConfig.font === option.value }"
                @update:pressed="pressed => pressed && updateConfig('font', option.value)"
              >
                <Icon :icon="option.icon" class="mb-2 text-2xl" />
                <span class="text-xl" :class="[option.value]">Aa</span>
                <span :class="[option.value]" class="mt-1 text-xs text-gray-t-3">{{ option.label }}</span>
              </Toggle>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-t-2">
              Font Size
            </h4>
            <div class="flex flex-wrap gap-4">
              <Toggle
                v-for="option in sizeOptions"
                :key="option.value"
                :pressed="userConfig.size === option.value"
                class="flex h-16 w-24 flex-col items-center justify-center rounded-lg border border-gray-o-1 bg-gray-b-0 p-2 transition-all focus-within:shadow-[0_0_0_2px] focus-within:shadow-black hover:bg-gray-b-1"
                :class="{ 'ring-2 ring-prime-c-1': userConfig.size === option.value }"
                @update:pressed="pressed => pressed && updateConfig('size', option.value)"
              >
                <Icon :icon="option.icon" :class="[option.value]" />
                <span class="mt-1 text-xs text-gray-t-3">{{ option.label }}</span>
              </Toggle>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-t-2">
              Line Height
            </h4>
            <div class="flex flex-wrap gap-4">
              <Toggle
                v-for="option in lineHeightOptions"
                :key="option.value"
                :pressed="userConfig.lineHeight === option.value"
                class="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-o-1 bg-gray-b-0 p-2 transition-all focus-within:shadow-[0_0_0_2px] focus-within:shadow-black hover:bg-gray-b-1"
                :class="{ 'ring-2 ring-prime-c-1': userConfig.lineHeight === option.value }"
                @update:pressed="pressed => pressed && updateConfig('lineHeight', option.value)"
              >
                <Icon :icon="option.icon" :class="[option.value]" />
                <div class="mt-2 flex flex-col items-center">
                  <div class="mb-1 h-1 w-12 bg-gray-t-3" />
                  <div class="h-1 w-12 bg-gray-t-3" :class="{ 'mt-2': option.value === 'leading-relaxed', 'mt-3': option.value === 'leading-loose' }" />
                </div>
                <span class="mt-1 text-xs text-gray-t-3">{{ option.label }}</span>
              </Toggle>
            </div>
          </div>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
