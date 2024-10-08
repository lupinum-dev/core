<script setup lang="ts">
interface Tag {
  name: string
  selected: boolean
}

const emit = defineEmits<{
  (e: 'update:selectedTags', value: string[]): void
}>()

const tags = ref<Tag[]>([
  { name: 'Blog', selected: true },
  { name: 'Wiki', selected: true },
  { name: 'References', selected: true },
  { name: 'Other', selected: true },
])

function toggleTag(tagName: string): void {
  const tag = tags.value.find(t => t.name === tagName)
  if (tag) {
    tag.selected = !tag.selected
  }
  const selectedTags = tags.value.filter(t => t.selected).map(t => t.name)

  emit('update:selectedTags', selectedTags)
}
</script>

<template>
  <div class="flex flex-wrap gap-2 px-4 pb-2">
    <button
      v-for="tag in tags"
      :key="tag.name"
      class="flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5 shadow-sm transition-colors"
      :class="[
        tag.selected
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ]"
      :aria-pressed="tag.selected"
      :aria-label="`Filter by ${tag.name}`"
      @click="toggleTag(tag.name)"
    >
      <span class="mr-1">{{ tag.name }}</span>
      <span v-if="tag.selected" class="text-xs">✓</span>
    </button>
  </div>
</template>
