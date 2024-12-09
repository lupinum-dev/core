import { defineStore } from 'pinia'

export type ReferencePost = {
  _path: string
  title: string
  description: string
  date_published: string | null
  date_modified: string | null
  category_references: string[]
  category_text: string
  highlight?: boolean
  readTime?: string
  hero_image?: string
  video_id?: string
  showcase?: boolean
  _partial?: boolean
  _draft?: boolean
  body?: any
}

type QueryContentPost = {
  _path: string
  title: string
  description: string
  date_published?: string
  date_modified?: string
  category_references: string[]
  category_text: string | string[]
  highlight?: boolean
  readTime?: string
  hero_image?: string
  video_id?: string
  showcase?: boolean
  _partial?: boolean
  _draft?: boolean
  body?: any
}

export const useReferences = defineStore('references', () => {
  const { locale } = useI18n()
  const route = useRoute()
  
  const references = ref<Record<string, ReferencePost[]>>({
    en: [],
    de: [],
  })
  const selectedCategory = ref(route.query.category as string || '')
  const searchQuery = ref('')
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const fetchReferences = async (lang: string) => {
    try {
      const posts = await queryContent<QueryContentPost>(lang, 'references')
        .only([
          'title',
          'description',
          '_path',
          'category_references',
          'date_published',
          'hero_image',
          'date_modified',
          'readTime',
          'highlight',
          'video_id',
          'category_text',
          'showcase',
          '_partial',
          '_draft',
          'body'
        ])
        .sort({ date_published: -1 })
        .find()

      references.value[lang] = posts.map(post => ({
        ...post,
        title: post.title || '',
        description: post.description || '',
        category_references: post.category_references || [],
        _path: `/references/${post._path?.split('/').slice(2).join('/')}`,
        date_published: post.date_published ? new Date(post.date_published).toISOString() : null,
        date_modified: post.date_modified ? new Date(post.date_modified).toISOString() : null,
        category_text: Array.isArray(post.category_text) ? post.category_text[0] : (post.category_text || ''),
      })) as ReferencePost[]
    }
    catch (err) {
      error.value = err as Error
      console.error('Error fetching references:', err)
    }
  }

  const init = async () => {
    isLoading.value = true
    try {
      await Promise.all([
        fetchReferences('en'),
        fetchReferences('de')
      ])
    }
    finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const currentReferences = computed(() => references.value[locale.value] || [])
  
  const categories = computed(() => 
    [...new Set(currentReferences.value.flatMap(post => post.category_references))]
  )

  const filteredPosts = computed(() => {
    return currentReferences.value.filter((post) => {
      const categoryMatch = !selectedCategory.value || post.category_references.includes(selectedCategory.value)
      const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      return categoryMatch && searchMatch
    })
  })

  const showcaseReferences = computed(() => 
    currentReferences.value.filter(ref => ref.showcase && !ref._partial && !ref._draft)
  )

  const getReferenceById = computed(() => (id: string) => 
    currentReferences.value.find(ref => ref._path.includes(id))
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
    references,
    selectedCategory,
    searchQuery,
    isLoading,
    error,

    // Getters
    currentReferences,
    categories,
    filteredPosts,
    showcaseReferences,
    getReferenceById,
    isHome,

    // Actions
    init,
    updateCategory,
    updateSearchQuery
  }
}) 