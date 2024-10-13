import { defineEventHandler } from 'h3'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
}

const categories = ['Technology', 'Design', 'Performance', 'Backend']
const tags = ['AI', 'Creativity', 'Sustainability', 'Tech', 'Cybersecurity', 'Quantum Computing']

const titles = [
  'The Future of AI in Healthcare',
  'Designing for Performance',
  'Backend Best Practices',
  'The Rise of Quantum Computing',
  'Sustainable Tech Innovations',
  'Creative AI Tools',
  'Cybersecurity in the Modern Age',
  'Performance Optimization Techniques',
  'Backend Development Trends',
  'AI and Creativity: A New Era',
]

const excerpts = [
  'Exploring how AI is revolutionizing medical diagnosis and treatment.',
  'Key strategies for designing high-performance applications.',
  'Best practices for building robust backend systems.',
  'Understanding the impact of quantum computing on technology.',
  'Innovations in sustainable technology and their benefits.',
  'New AI tools that are transforming creative industries.',
  'Modern cybersecurity challenges and solutions.',
  'Techniques for optimizing application performance.',
  'Current trends in backend development.',
  'How AI is opening new creative possibilities.',
]

const authors = ['Suhair Khan', 'Emma Green', 'Alex Quantum', 'Jane Doe', 'John Smith']

function generateBlogPost(id: number): BlogPost {
  return {
    id,
    title: titles[id % titles.length],
    excerpt: excerpts[id % excerpts.length],
    image: 'https://picsum.photos/seed/picsum/200/300',
    author: authors[id % authors.length],
    date: new Date(Date.now() - Math.random() * 31536000000).toISOString().split('T')[0],
    readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: [...tags].sort(() => 0.5 - Math.random()).slice(0, 2),
  }
}

const allPosts = Array.from({ length: 100 }, (_, index) => generateBlogPost(index + 1))

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = 9
  const category = query.category as string | undefined

  const filteredPosts = category && category !== 'All'
    ? allPosts.filter(post => post.category === category)
    : allPosts

  const totalPages = Math.ceil(filteredPosts.length / limit)
  const start = (page - 1) * limit
  const end = start + limit

  const paginatedPosts = filteredPosts.slice(start, end)

  return {
    featuredPost: allPosts[0],
    recentPosts: allPosts.slice(1, 4),
    todaysPicks: allPosts.slice(4, 7),
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts: filteredPosts.length,
    allCategories: ['All', ...categories],
    allTags: tags,
  }
})
