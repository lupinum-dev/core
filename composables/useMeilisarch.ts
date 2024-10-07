import { MeiliSearch } from 'meilisearch'
import type { MeilisearchResponse } from '../types/search'

export function useMeiliSearch() {
  const client = ref<MeiliSearch>()
  const index = ref<MeiliSearch['index']>()
  const error = ref<string | null>(null)

  const initMeiliSearch = (): void => {
    try {
      client.value = new MeiliSearch({
        host: 'https://meilisearch-v0wwsscgk4ok84w48gwkg4k0.lupinum.com',
        apiKey: 'kJJwQnV7hQQcvZZ1aklEdbqRLDpxEgOY',
      })
      const locale = 'en'
      index.value = client.value.index(`lupinum-${locale}`)
    }
    catch (e) {
      console.error('Error initializing MeiliSearch:', e)
      error.value = 'Failed to initialize search. Please try again later.'
    }
  }

  const search = async (query: string): Promise<MeilisearchResponse> => {
    if (!index.value) {
      throw new Error('MeiliSearch index not initialized')
    }
    return await index.value.search(query)
  }

  return {
    initMeiliSearch,
    search,
    error,
  }
}
