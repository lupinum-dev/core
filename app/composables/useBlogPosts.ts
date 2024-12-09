import { defineStore } from 'pinia'

export type BlogPost = {
  _path: string
  title: string
  description: string
  date_published: string
  date_modified: string
  category_blog: string[]
  hero_image?: string
  readTime?: string
  published?: boolean
  body?: any
}

type QueryBlogPost = {
  _path: string
  title: string
  description: string
  date_published: string
  date_modified: string
  category_blog: string[]
  hero_image?: string
  readTime?: string
  published?: boolean
  body?: any
  _partial?: boolean
  _draft?: boolean
}

export const useBlogPosts = defineStore('blog-posts', () => {
  const { locale } = useI18n()
  const route = useRoute()
  
  const posts = ref<Record<string, BlogPost[]>>({
    en: [],
    de: [],
  })
  const selectedCategory = ref(route.query.category as string || '')
  const searchQuery = ref('')
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const fetchPosts = async (lang: string) => {
    try {
      const fetchedPosts = await queryContent<QueryBlogPost>(lang, 'blog')
        .where({ _partial: false, _draft: false })
        .only([
          'title',
          'description',
          '_path',
          'category_blog',
          'date_published',
          'date_modified',
          'readTime',
          'hero_image',
          'published',
          'body'
        ])
        .sort({ date_published: -1 })
        .find()

      posts.value[lang] = fetchedPosts.map(post => ({
        ...post,
        _path: `/blog/${post._path?.split('/').slice(2).join('/')}`,
        title: post.title || '',
        description: post.description || '',
        category_blog: post.category_blog || [],
        date_published: post.date_published,
        date_modified: post.date_modified,
      })) as BlogPost[]
    }
    catch (err) {
      error.value = err as Error
      console.error('Error fetching blog posts:', err)
    }
  }

  const init = async () => {
    isLoading.value = true
    try {
      await Promise.all([
        fetchPosts('en'),
        fetchPosts('de')
      ])
    }
    finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const currentPosts = computed(() => posts.value[locale.value] || [])
  
  const categories = computed(() => 
    [...new Set(currentPosts.value.flatMap(post => post.category_blog))]
  )

  const filteredPosts = computed(() => {
    return currentPosts.value.filter((post) => {
      const categoryMatch = !selectedCategory.value || post.category_blog.includes(selectedCategory.value)
      const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      return categoryMatch && searchMatch
    })
  })

  const getPostById = computed(() => (id: string) => 
    currentPosts.value.find(post => post._path.includes(id))
  )

  const isHome = computed(() => !selectedCategory.value)

  // Actions
  function updateCategory(category: string) {
    selectedCategory.value = category
  }

  function updateSearchQuery(query: string) {
    searchQuery.value = query
  }

  return {
    // State
    posts,
    selectedCategory,
    searchQuery,
    isLoading,
    error,

    // Getters
    currentPosts,
    categories,
    filteredPosts,
    getPostById,
    isHome,

    // Actions
    init,
    updateCategory,
    updateSearchQuery
  }
})
