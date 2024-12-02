export type BlogPost = {
  _path: string
  title: string
  description: string
  date_published: string
  date_modified: string
  category_blog: string[]
  published: boolean
  hero_image?: string
  body: {
    toc?: {
      links: TocItem[]
    }
  }
}

export type TocItem = {
  id: string
  depth: number
  text: string
  children?: TocItem[]
} 