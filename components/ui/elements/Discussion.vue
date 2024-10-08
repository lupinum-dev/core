<script setup lang="ts">
import { ref } from 'vue'
import CommentList from './CommentList.vue'
import CommentForm from './CommentForm.vue'
import type { Comment } from '~/types/comment'

const comments = ref<Comment[]>([
  {
    id: 1,
    author: 'John Doe',
    content: 'Great article! Very informative.',
    createdAt: '2023-04-01T12:00:00Z',
    replies: [
      {
        id: 3,
        author: 'Alice Johnson',
        content: 'I agree! The second point was particularly insightful.',
        createdAt: '2023-04-01T14:30:00Z',
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'I have a question about the second point. Can you elaborate?',
    createdAt: '2023-04-02T14:30:00Z',
    replies: [
      {
        id: 4,
        author: 'Bob Wilson',
        content: 'Not the author, but I think it means...',
        createdAt: '2023-04-02T15:45:00Z',
        replies: [],
      },
    ],
  },
])

const replyingTo = ref<number | null>(null)

function addComment(content: string, parentId: number | null = null) {
  const newCommentObj: Comment = {
    id: Math.max(...comments.value.flatMap(c => [c.id, ...c.replies.map(r => r.id)])) + 1,
    author: 'Current User',
    content,
    createdAt: new Date().toISOString(),
    replies: [],
  }

  if (parentId === null) {
    comments.value.push(newCommentObj)
  }
  else {
    const addReply = (comments: Comment[]) => {
      for (const comment of comments) {
        if (comment.id === parentId) {
          comment.replies.push(newCommentObj)
          return true
        }
        if (addReply(comment.replies))
          return true
      }
      return false
    }
    addReply(comments.value)
  }

  replyingTo.value = null
}
</script>

<template>
  <div class="mt-8 space-y-6">
    <h2 class="text-2xl font-bold">
      Discussion
    </h2>

    <CommentList :comments="comments" @reply="replyingTo = $event" />

    <CommentForm
      :replying-to="replyingTo"
      @submit="addComment($event, replyingTo)"
      @cancel-reply="replyingTo = null"
    />
  </div>
</template>
