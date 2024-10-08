export interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
  replies: Comment[]
}