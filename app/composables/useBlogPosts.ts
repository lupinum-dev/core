import { useAsyncData } from '#app'
import { computed } from 'vue'

export function useBlogPosts() {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const { data: blogPosts } = useAsyncData('posts', () =>
    queryContent(locale.value, 'blog')
      .where({ _partial: false, _draft: false })
      .only(['title', 'description', '_path', 'category_blog', 'date_published', 'date_modified', 'readTime', 'hero_image'])
      .sort({ date_published: -1 })
      .find()
  )

  blogPosts.value?.forEach((ref) => {
    ref._path = "/blog/" +ref._path?.split('/').slice(2).join('/')
  })

  const categories = computed(() => [...new Set(blogPosts.value?.flatMap(post => post.category_blog))])

  return {
    blogPosts,
    categories,
  }
}
