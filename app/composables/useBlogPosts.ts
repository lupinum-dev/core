import { useAsyncData } from '#app'
import { computed } from 'vue'
import type { BlogPost } from '~/types/blog'

export const useBlogPosts = () => {
  const { locale } = useI18n()

  const { data: blogPosts } = useAsyncData<BlogPost[]>('blog-posts', () =>
    queryContent(locale.value, 'blog')
      .where({ _partial: false, _draft: false })
      .only(['title', 'description', '_path', 'category_blog', 'date_published', 'date_modified'])
      .sort({ date_published: -1 })
      .find()
  )

  const categories = computed(() => {
    const allCategories = blogPosts.value?.flatMap(post => post.category_blog) ?? []
    return [...new Set(allCategories)]
  })

  return {
    blogPosts: computed(() => blogPosts.value ?? []),
    categories
  }
}
