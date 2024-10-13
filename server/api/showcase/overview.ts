import { defineEventHandler } from 'h3'

interface ShowcaseItem {
  id: number
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  url: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A modern, responsive online store built with our framework.',
    image: 'https://picsum.photos/800/450?random=1',
    category: 'E-commerce',
    tags: ['responsive', 'shopping cart', 'payment integration'],
    url: 'https://example-ecommerce.com',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Sleek and minimalist portfolio for showcasing creative work.',
    image: 'https://picsum.photos/800/450?random=2',
    category: 'Portfolio',
    tags: ['gallery', 'animations', 'contact form'],
    url: 'https://example-portfolio.com',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    description: 'Feature-rich dashboard for a SaaS application.',
    image: 'https://picsum.photos/800/450?random=3',
    category: 'Web App',
    tags: ['data visualization', 'user management', 'real-time updates'],
    url: 'https://example-saas.com',
  },
  {
    id: 4,
    title: 'News Portal',
    description: 'Dynamic news website with categorized content and search functionality.',
    image: 'https://picsum.photos/800/450?random=4',
    category: 'Content',
    tags: ['article management', 'commenting system', 'responsive design'],
    url: 'https://example-news.com',
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'Web application for tracking workouts and nutrition.',
    image: 'https://picsum.photos/800/450?random=5',
    category: 'Web App',
    tags: ['progress charts', 'meal planning', 'workout routines'],
    url: 'https://example-fitness.com',
  },
  {
    id: 6,
    title: 'Travel Blog',
    description: 'Visually appealing travel blog with interactive maps.',
    image: 'https://picsum.photos/800/450?random=6',
    category: 'Blog',
    tags: ['image gallery', 'geolocation', 'social sharing'],
    url: 'https://example-travel.com',
  },
  {
    id: 11,
    title: 'E-commerce Platform',
    description: 'A modern, responsive online store built with our framework.',
    image: 'https://picsum.photos/800/450?random=1',
    category: 'E-commerce',
    tags: ['responsive', 'shopping cart', 'payment integration'],
    url: 'https://example-ecommerce.com',
  },
  {
    id: 12,
    title: 'Portfolio Website',
    description: 'Sleek and minimalist portfolio for showcasing creative work.',
    image: 'https://picsum.photos/800/450?random=2',
    category: 'Portfolio',
    tags: ['gallery', 'animations', 'contact form'],
    url: 'https://example-portfolio.com',
  },
  {
    id: 13,
    title: 'SaaS Dashboard',
    description: 'Feature-rich dashboard for a SaaS application.',
    image: 'https://picsum.photos/800/450?random=3',
    category: 'Web App',
    tags: ['data visualization', 'user management', 'real-time updates'],
    url: 'https://example-saas.com',
  },
  {
    id: 14,
    title: 'News Portal',
    description: 'Dynamic news website with categorized content and search functionality.',
    image: 'https://picsum.photos/800/450?random=4',
    category: 'Content',
    tags: ['article management', 'commenting system', 'responsive design'],
    url: 'https://example-news.com',
  },
  {
    id: 15,
    title: 'Fitness Tracker',
    description: 'Web application for tracking workouts and nutrition.',
    image: 'https://picsum.photos/800/450?random=5',
    category: 'Web App',
    tags: ['progress charts', 'meal planning', 'workout routines'],
    url: 'https://example-fitness.com',
  },
  {
    id: 16,
    title: 'Travel Blog',
    description: 'Visually appealing travel blog with interactive maps.',
    image: 'https://picsum.photos/800/450?random=6',
    category: 'Blog',
    tags: ['image gallery', 'geolocation', 'social sharing'],
    url: 'https://example-travel.com',
  },
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 4
  const category = query.category as string
  const prerender = query.prerender === 'true'

  if (prerender) {
    // For prerendering, return all items
    return {
      items: showcaseItems,
      hasMore: false,
      total: showcaseItems.length,
    }
  }

  const filteredItems = category && category !== 'All'
    ? showcaseItems.filter(item => item.category === category)
    : showcaseItems

  const start = (page - 1) * limit
  const end = start + limit

  const items = filteredItems.slice(start, end)
  const hasMore = end < filteredItems.length

  return {
    items,
    hasMore,
    total: filteredItems.length,
  }
})

// For prerendering
export const prerender = true
