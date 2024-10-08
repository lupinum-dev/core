<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  replyingTo: number | null
}>()

const emit = defineEmits<{
  (e: 'submit', content: string): void
  (e: 'cancelReply'): void
}>()

const newComment = ref('')

watch(() => props.replyingTo, () => {
  newComment.value = ''
})

const submitComment = () => {
  if (newComment.value.trim()) {
    emit('submit', newComment.value.trim())
    newComment.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="submitComment" class="space-y-4">
    <UiTextarea
      v-model="newComment"
      :placeholder="replyingTo ? 'Write a reply...' : 'Add your comment...'"
      rows="3"
      class="w-full"
    />
    <div class="flex justify-between items-center">
      <UiButton type="submit">{{ replyingTo ? 'Post Reply' : 'Post Comment' }}</UiButton>
      <UiButton v-if="replyingTo" variant="outline" @click="$emit('cancelReply')">Cancel Reply</UiButton>
    </div>
  </form>
</template>