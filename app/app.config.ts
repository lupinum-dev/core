export default defineAppConfig({
  wiki: {
    mode: 'select', // 'tabs', or 'select'
    tabs: {
      count: 2, // 2 or 3
      showIcons: true,
    },
    select: {
      showDescriptionText: true,
    },
  },
  header: {
    variant: 'bar', // 'bar' | 'default'
    rounded: '2xl', // 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none'
    languageDropdown: true,
    adBanner: {
      showAdBanner: true,
      adKey: 'banner',
    },
    headerHeight: '50px',
    adBannerHeight: '--header-ad-height', // CHANGE IN CSS
    hamburgerIcon: 'heroicons:bars-3-bottom-right-20-solid',
    closeIcon: 'lucide:x',
    toc: {
      showToc: true,
      icon: 'lucide:book-open',
    },
  },
  navigation: {
    contentRoutes: ['/references', '/wiki', '/blog', '/contact'],
    items: [
      { label: 'Home', href: '/', icon: 'lucide:home' },
      {
        label: 'Services',
        href: '/services',
        type: 'links',
        icon: 'lucide:file-text',
        childrenOpen: true,
        children: [
          { label: 'Web', href: '/services/web', description: 'Explore our web development services' },
          { label: 'Video', href: '/services/video', description: 'Discover our video production services' },
          { label: 'Design', href: '/services/design', description: 'Learn about our design services' },
        ],
      },
      { label: 'References', type: 'showcase', href: '/references', icon: 'lucide:star' },
      {
        label: 'Wiki',
        href: '/wiki',
        type: 'wiki',
        icon: 'lucide:book-open',
        childrenOpen: true,
        children: [
          { label: 'Web Development', href: '/wiki/web', description: 'Explore our web development services', showSubmenu: true },
          { label: 'Video Production', href: '/wiki/video', description: 'Discover our video production services', showSubmenu: true },
          { label: 'Design Services', href: '/wiki/design', description: 'Learn about our design services', showSubmenu: true },
        ],
      },
      {
        label: 'Blog',
        type: 'blog',
        href: '/blog',
        icon: 'lucide:pen-tool',
      },
      { label: 'Contact', href: '/contact', icon: 'lucide:mail' },
    ],
  },
  socials: [
    { icon: 'mdi:github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'mdi:twitter', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'mdi:linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  ],
})
