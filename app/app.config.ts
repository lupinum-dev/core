export default defineAppConfig({
  wiki: {
    mode: 'select', // 'tabs', or 'select'
    tabs: {
      count: 2, // 2 or 3
      showIcons: true,
    },
    select: {
      showDescriptionText: true,
      defaultIcon: 'i-heroicons-bars-3',
      chevronIcon: 'heroicons:chevron-down-16-solid',
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
    hamburgerIcon: 'heroicons:bars-3-bottom-right-16-solid',
    closeIcon: 'heroicons:x-mark-16-solid',
    toc: {
      showToc: true,
      icon: 'heroicons:book-open-16-solid',
      offset: 'left-9',
      offsetSm: 'sm:left-40',
    },
    searchIcon: 'heroicons:magnifying-glass-16-solid',
    languageDropdownIcon: 'heroicons:language-16-solid',
  },
  colorMode: {
    lightModeIcon: 'heroicons:sun-16-solid',
    darkModeIcon: 'heroicons:moon-16-solid',
    systemModeIcon: 'heroicons:cog-6-tooth-16-solid',
  },
  navigation: {
    contentRoutes: ['/references', '/wiki', '/blog/'],
    chevronIcon: 'heroicons:chevron-down-16-solid',
    items: [
      { label: 'Home', href: '/', icon: 'heroicons:home-16-solid' },
      {
        label: 'Services',
        href: '/services',
        type: 'links',
        icon: 'heroicons:document-text-20-solid',
        childrenOpen: true,
        children: [
          { label: 'Web', href: '/services/web', description: 'Explore our web development services' },
          { label: 'Video', href: '/services/video', description: 'Discover our video production services' },
          { label: 'Design', href: '/services/design', description: 'Learn about our design services' },
        ],
      },
      { label: 'References', type: 'showcase', href: '/references', icon: 'heroicons:star-20-solid' },
      {
        label: 'Wiki',
        href: '/wiki',
        type: 'wiki',
        icon: 'heroicons:book-open-20-solid',
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
        icon: 'heroicons:pencil-square-20-solid',
      },
      { label: 'Contact', href: '/contact', icon: 'heroicons:envelope-20-solid' },
    ],
  },
  socials: [
    { icon: 'heroicons:code-bracket-square-20-solid', href: 'https://github.com', label: 'GitHub' },
    { icon: 'heroicons:chat-bubble-left-right-20-solid', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'heroicons:briefcase-20-solid', href: 'https://linkedin.com', label: 'LinkedIn' },
  ],
  content: {
    image: {
      showCaption: true,
      photographer: true,
    },
  },
})
