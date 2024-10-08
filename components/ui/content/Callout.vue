<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  closed: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
    validator: (value: string) => ['note', 'tip', 'info', 'warning', 'danger', 'important'].includes(value),
  },
})

const typeMap = [
  {
    type: 'note',
    borderColor: 'border-gray-500',
    textColor: 'text-gray-500 dark:text-gray-400',
    bgColor: 'bg-gray-400/10 dark:border-gray-600',
    icon: 'i-heroicons-bookmark-16-solid',
  },
  {
    type: 'tip',
    textColor: 'text-green-500',
    borderColor: 'border-green-500 dark:border-green-600',
    bgColor: 'bg-green-400/10',
    icon: 'i-heroicons-light-bulb-solid',
  },
  {
    type: 'info',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500 dark:border-blue-600',
    bgColor: 'bg-blue-400/10',
    icon: 'i-heroicons-information-circle-16-solid',
  },
  {
    type: 'warning',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500 dark:border-yellow-600',
    bgColor: 'bg-yellow-400/10',
    icon: 'i-heroicons-exclamation-triangle-16-solid',
  },
  {
    type: 'danger',
    borderColor: 'border-red-500 dark:border-red-600',
    textColor: 'text-red-500',
    bgColor: 'bg-red-400/10',
    icon: 'i-heroicons-fire-16-solid',
  },
  {
    type: 'quote',
    borderColor: 'border-purple-500 dark:border-purple-600',
    textColor: 'text-purple-500 dark:text-purple-400',
    bgColor: 'bg-purple-400/10',
    icon: 'i-heroicons-bookmark-solid',
  },
  {
    type: 'important',
    borderColor: 'border-sky-500 dark:border-sky-600',
    textColor: 'text-sky-500 dark:text-sky-400',
    bgColor: 'bg-sky-400/10 ',
    icon: 'i-heroicons-exclamation-circle-solid',
  },
]

const typeMapped = computed(() => {
  return typeMap.find(item => item.type === props.type) || typeMap[0]
})
</script>

<template>
  <div
    class="group relative block rounded-lg border-l-4 pl-4 pr-6 text-sm/6 font-normal last:mb-0"
    :class="[typeMapped.borderColor, typeMapped.bgColor]"
  >
    <UiAccordion :default-value="props.closed ? undefined : 'item-1'" type="single" collapsible size="zero" variant="ghost">
      <UiAccordionItem value="item-1" class="border-none">
        <UiAccordionTrigger
          class="flex w-full items-center justify-between"
          :class="typeMapped.textColor"
        >
          <div class="flex items-center">
            <Icon :name="typeMapped.icon" class="mr-2 size-5" />
            <span class="font-heading text-base sm:text-lg">{{ props.title }}</span>
          </div>
        </UiAccordionTrigger>
        <UiAccordionContent>
          <div class="prose-primary prose max-w-none  dark:prose-invert">
            <ContentSlot :use="$slots.default" unwrap="p" />
          </div>
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </div>
</template>
