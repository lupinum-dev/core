<script setup lang="ts">
import { dialogState } from '@/composables/useSearchModal'

defineProps<{
  modelValue: string
  isLoading: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}>()
</script>

<template>
  <div class="flex w-full flex-col items-stretch space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
    <div class="relative flex-grow">
      <UiInput
        id="search"
        type="text"
        placeholder="Search..."
        class="w-full bg-background pl-10 text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
      <span class="absolute inset-y-0 left-0 flex items-center justify-center px-3">
        <Icon name="i-heroicons-magnifying-glass-20-solid" class="size-5 text-muted-foreground" />
      </span>
      <span v-if="modelValue" class="absolute inset-y-0 right-0 flex items-center justify-center px-3">
        <Icon
          name="i-heroicons-x-mark-20-solid"
          class="size-5 cursor-pointer text-muted-foreground hover:text-foreground"
          @click="$emit('update:modelValue', '')"
        />
      </span>
    </div>
    <div class="flex-shrink-0">
      <UiDialogClose as-child>
        <UiButton type="button" variant="secondary" class="w-full sm:w-auto">
          Close
        </UiButton>
      </UiDialogClose>
    </div>
  </div>
</template>
