<script setup lang="ts">
import type { Comment } from '~/types/comment'
import CommentTree from './CommentTree.vue'

defineProps<{
  comments: Comment[]
}>()

defineEmits<{
  (e: 'reply', id: number): void
}>()
</script>

<template>
  <div class="space-y-4">
    <CommentTree 
      v-for="comment in comments" 
      :key="comment.id" 
      :comment="comment" 
      @reply="$emit('reply', $event)"
    />
  </div>
</template>