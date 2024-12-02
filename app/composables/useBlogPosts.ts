import { useAsyncData } from '#app'
import { computed } from 'vue'

export function useBlogPosts() {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const { data: posts } = useAsyncData('posts', () =>
    queryContent(locale.value, 'blog')
      .where({ _partial: false, _draft: false })
      .only(['title', 'description', '_path', 'category', 'date_published', 'date_modified', 'readTime', 'hero_image'])
      .sort({ date_published: -1 })
      .find()
  )

  const blogPosts = computed(() => {
    return (posts.value?.map((post) => {
      const pathParts = post._path?.split('/').filter(Boolean) ?? []
      if (pathParts[0] === 'en') {
        pathParts.shift()
      }
      const newPath = localePath(`/${pathParts.join('/')}`)
      return {
        ...post,
        _path: newPath,
      }
    }) ?? [])
  })

  const categories = computed(() => [...new Set(blogPosts.value.flatMap(post => post.category))])

  return {
    blogPosts,
    categories,
  }
}
