import { useAsyncData } from '#app'
import { computed } from 'vue'
import type { BlogPost } from '~/types/blog'

export function useBlogPosts() {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const { data: blogPosts } = useAsyncData<BlogPost[]>('posts', async () => {
    const posts = await queryContent(locale.value, 'blog')
      .where({ _partial: false, _draft: false })
      .only(['title', 'description', '_path', 'category_blog', 'date_published', 'date_modified', 'readTime', 'hero_image'])
      .sort({ date_published: -1 })
      .find()

    return posts.map(post => ({
      ...post,
      _path: `/blog/${post._path?.split('/').slice(2).join('/')}`,
    })) as BlogPost[]
  })

  const categories = computed(() => {
    if (!blogPosts.value) return []
    return [...new Set(blogPosts.value.flatMap(post => post.category_blog))]
  })

  return {
    blogPosts,
    categories,
  }
}
