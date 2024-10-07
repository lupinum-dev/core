export interface MeilisearchHit {
  hierarchy_radio_lvl0: string | null
  hierarchy_radio_lvl1: string | null
  hierarchy_radio_lvl2: string | null
  hierarchy_radio_lvl3: string | null
  hierarchy_radio_lvl4: string | null
  hierarchy_lvl0: string | null
  hierarchy_lvl1: string | null
  hierarchy_lvl2: string | null
  hierarchy_lvl3: string | null
  hierarchy_lvl4: string | null
  hierarchy_lvl5: string | null
  hierarchy_lvl6: string | null
  content: string | null
  objectID: string
  anchor: string
  url: string
}

export interface MeilisearchResponse {
  hits: MeilisearchHit[]
  query: string
  processingTimeMs: number
  limit: number
  offset: number
  estimatedTotalHits: number
}
