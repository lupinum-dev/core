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
    variant: 'bar',
    rounded: '2xl',
    languageDropdown: 'true',
    headerHeight: '50px',
    adBannerHeight: '--header-ad-height', // CHANGE IN CSS
  },
  navigation: {
    contentRoutes: ['/references', '/wiki', '/blog', '/contact'],
    items: [
      { label: 'Home', href: '/' },
      {
        label: 'Services',
        href: '/services',
        type: 'links',
        children: [
          { label: 'Web', href: '/services/web', description: 'Explore our web development services' },
          { label: 'Video', href: '/services/video', description: 'Discover our video production services' },
          { label: 'Design', href: '/services/design', description: 'Learn about our design services' },
        ],
      },
      { label: 'References', type: 'showcase', href: '/references' },
      {
        label: 'Wiki',
        href: '/wiki',
        type: 'wiki',

        children: [
          { label: 'Web Development', href: '/wiki/web', description: 'Explore our web development services' },
          { label: 'Video Production', href: '/wiki/video', description: 'Discover our video production services' },
          { label: 'Design Services', href: '/wiki/design', description: 'Learn about our design services' },
        ],
      },
      { label: 'Blog', type: 'blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
})
