import type { MeilisearchHit } from '../types/search'

export function truncateContent(content: string, searchQuery: string, maxLength = 250): string {
  const searchTerms = searchQuery.trim().split(/[\s+,]+/).filter(term => term.length > 0)
  if (!searchTerms.length)
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content

  let startIndex = content.length
  let endIndex = 0

  searchTerms.forEach((term) => {
    const index = content.toLowerCase().indexOf(term.toLowerCase())
    if (index !== -1) {
      startIndex = Math.min(startIndex, index)
      endIndex = Math.max(endIndex, index + term.length)
    }
  })

  if (startIndex === content.length) {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content
  }

  startIndex = Math.max(0, startIndex - Math.floor(maxLength / 2))
  endIndex = Math.min(content.length, endIndex + Math.floor(maxLength / 2))

  let result = content.substring(startIndex, endIndex)

  if (startIndex > 0)
    result = `...${result}`
  if (endIndex < content.length)
    result += '...'

  if (result.length > maxLength) {
    result = `${result.substring(0, maxLength - 3)}...`
  }

  return result
}

export function highlightText(text: string, searchQuery: string): string {
  if (!searchQuery.trim())
    return text
  const searchTerms = searchQuery.trim().split(/[\s+,]+/).filter(term => term.length > 0)

  const pattern = searchTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')

  return text.replace(regex, (match) => {
    return `<mark class="bg-yellow-200 dark:bg-yellow-400/30 dark:text-white inline-block">${match}</mark>`
  })
}

export function cleanResult(result: MeilisearchHit): MeilisearchHit | null {
  result.anchor = result.anchor.replace('__nuxt', '').trim()
  result.url = result.url.replace('#__nuxt', '').trim()
  result.url = result.url.replace('https://www.lupinum.com', '').trim()

  if (result.anchor.includes('headlessui')) {
    return null
  }

  const title = result.hierarchy_lvl1 || result.hierarchy_lvl0 || ''
  const anchorText = result.anchor.replace(/-/g, ' ').trim()

  if (title.toLowerCase() === anchorText.toLowerCase()) {
    result.anchor = ''
  }

  return result
}

export function getResultTitle(result: MeilisearchHit): string {
  const lvl1 = result.hierarchy_lvl1 || result.hierarchy_lvl0 || 'Untitled'
  const lvl2 = result.hierarchy_lvl2

  if (lvl2) {
    return `${lvl1} | ${lvl2}`
  }

  return lvl1
}

export function getGroupFromUrl(url: string): string {
  const parts = url.split('/').filter(Boolean)
  if (parts.length === 0)
    return 'Other'

  // Always return the first part for tag filtering
  return capitalizeFirstLetter(parts[0])
}

// Add this new function
export function getBreadcrumb(url: string): string {
  const parts = url.split('/').filter(Boolean)

  if (parts[0] === 'blog')
    return 'Blog'
  if (parts[0] === 'wiki') {
    return ['Wiki', ...parts.slice(1, -1).map(capitalizeFirstLetter)].join(' / ')
  }
  if (parts[0] === 'references')
    return 'References'
  return 'Other'
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
