import { defineStore } from 'pinia'

interface BlogState {
  selectedCategory: string
  searchQuery: string
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    selectedCategory: '',
    searchQuery: '',
  }),
  actions: {
    setSelectedCategory(category: string) {
      this.selectedCategory = category
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
  },
})
