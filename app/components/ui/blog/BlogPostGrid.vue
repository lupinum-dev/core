<script setup lang="ts">
const blogPosts = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring cutting-edge technologies shaping the web landscape.',
    date: '2023-04-15',
    readTime: '5 min read',
    imageId: 1,
  },
  {
    title: 'Mastering Nuxt 3: Tips and Tricks',
    excerpt: 'Unlock the full potential of Nuxt 3 with these expert insights.',
    date: '2023-04-22',
    readTime: '7 min read',
    imageId: 2,
  },
  {
    title: 'Responsive Design Best Practices',
    excerpt: 'Create seamless experiences across all devices with these techniques.',
    date: '2023-04-29',
    readTime: '6 min read',
    imageId: 3,
  },
  {
    title: 'The Art of Clean Code',
    excerpt: 'Elevate your coding skills with principles of clean, maintainable code.',
    date: '2023-05-06',
    readTime: '8 min read',
    imageId: 4,
  },
]
</script>

<template>
  <section class="py-12 md:py-20">
    <div class="container mx-auto max-w-6xl px-4 md:px-6">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UiCard
          v-for="post in blogPosts"
          :key="post.title"
          class="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <UiCardHeader class="p-0">
            <div class="aspect-w-16 aspect-h-9 overflow-hidden">
              <img
                :src="`https://picsum.photos/800/450?random=${post.imageId}`"
                :alt="post.title"
                class="size-full object-cover transition-transform duration-300 group-hover:scale-110"
              >
            </div>
          </UiCardHeader>
          <UiCardContent class="p-6">
            <UiCardTitle class="mb-2 text-xl font-semibold group-hover:text-primary">
              {{ post.title }}
            </UiCardTitle>
            <p class="mb-4 text-muted-foreground">
              {{ post.excerpt }}
            </p>
          </UiCardContent>
          <UiCardFooter class="flex items-center justify-between p-6 pt-0 text-sm text-muted-foreground">
            <span>{{ post.date }}</span>
            <span>{{ post.readTime }}</span>
          </UiCardFooter>
          <div class="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute inset-x-6 bottom-4 translate-y-full transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <UiButton variant="default" as-child>
              <NuxtLink to="#">
                Read More
              </NuxtLink>
            </UiButton>
          </div>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-card {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.blog-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 10px 15px -3px hsl(var(--shadow) / 0.1), 0 4px 6px -2px hsl(var(--shadow) / 0.05);
}
</style>
