export interface NavigationItem {
  label: string
  href: string
  type?: 'links' | 'wiki' | 'blog' | 'showcase'
  contentSite?: boolean
  children?: {
    label: string
    href: string
    description?: string
  }[]
}
