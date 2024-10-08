<script setup lang="ts">
import { computed } from 'vue'

import type { Comment } from '~/types/comment'

const props = defineProps<{
  comment: Comment
}>()

const emit = defineEmits<{
  (e: 'reply', id: number): void
}>()

const formattedDate = computed(() => {
  const date = new Date(props.comment.createdAt)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
})

const avatarUrl = computed(() => {
  return `https://picsum.photos/200`
})
</script>

<template>
  <div class="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  dark:border-gray-800 dark:bg-gray-950">
    <div class="flex items-start space-x-4">
      <img :src="avatarUrl" :alt="comment.author" class="size-10 rounded-full">
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ comment.author }}
          </h4>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formattedDate }}</span>
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Icon name="lucide:move-vertical" class="size-4" />
            </button>
          </div>
        </div>
        <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {{ comment.content }}
        </p>
        <div class="mt-3 flex items-center space-x-4">
          <button
            class="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-gray-700 ring-offset-background transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="$emit('reply', comment.id)"
          >
            <Icon name="lucide:message-square" class="mr-1 size-4" />
            Reply
          </button>
        </div>
      </div>
    </div>
    <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 space-y-4">
      <div class="my-4 border-t border-gray-200 dark:border-gray-800" />
      <CommentTree
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        class="ml-6"
        @reply="$emit('reply', $event)"
      />
    </div>
  </div>
</template>
