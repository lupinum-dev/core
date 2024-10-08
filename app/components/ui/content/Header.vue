<script setup lang="ts">
import type { PropType } from 'vue'

interface ButtonLink {
  label: string
  to?: string
  href?: string
  icon?: string
  target?: string
  color?: string
  click?: (...args: any[]) => void
}

const props = defineProps({
  headline: String,
  title: String,
  description: String,
  icon: String,
  links: {
    type: Array as PropType<ButtonLink[]>,
    default: () => [],
  },
})
</script>

<template>
  <div class="relative border-b border-border py-8">
    <div v-if="headline || $slots.headline" class="mb-3 flex items-center gap-1.5 text-sm/6 font-semibold text-primary">
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div class="flex flex-col items-start gap-6 lg:flex-row">
      <div v-if="icon || $slots.icon" class="flex">
        <slot name="icon">
          <Icon :name="icon || ''" class="size-10 flex-shrink-0 text-primary" />
        </slot>
      </div>

      <div class="flex-1">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h1 class="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
            <slot name="title">
              {{ title }}
            </slot>
          </h1>

          <div v-if="links?.length || $slots.links" class="mt-4 flex flex-wrap items-center gap-1.5 lg:mt-0">
            <slot name="links">
              <!-- Uncomment and adjust as needed -->
              <!-- <UButton
                v-for="(link, index) of links"
                :key="index"
                v-bind="{ ...link, target: link.target || '_blank', color: link.color || 'white' }"
                @click="link.click"
              /> -->
            </slot>
          </div>
        </div>

        <div v-if="description || $slots.description" class="mt-4 text-lg text-muted-foreground">
          <slot name="description">
            {{ description }}
          </slot>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>
