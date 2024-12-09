<script setup lang="ts">
import { computed } from 'vue'

interface BlogPost {
  _path: string
  title: string
  description: string
  date_published: string
  date_modified: string
  category_references: string[]
  category_text: string
  highlight?: boolean
  readTime?: string
  hero_image?: string
  video_id?: string
}

interface Props {
  posts: BlogPost[]
  type?: 'blog' | 'references'
}

const props = defineProps<Props>()

const processedPosts = computed(() => 
  props.posts.map(post => ({
    ...post,
    _path: post._path.split('/').slice(2).join('/')
  }))
)

const mostRecentPost = computed(() => processedPosts.value[0])
const highlights = computed(() => props.posts.filter(post => post.highlight))

const { t } = useI18n({
  useScope: 'local',
})

const sectionTitles = computed(() => ({
  latest: props.type === 'references' ? t('latest_reference') : t('latest_post'),
  highlights: props.type === 'references' ? t('highlight_references') : t('highlight_posts'),
  recent: props.type === 'references' ? t('recent_references') : t('recent_posts'),
}))

const filteredPosts = computed(() => 
  processedPosts.value.filter(post => post._path !== mostRecentPost.value?._path)
)

</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
      <!-- Featured Post -->
      <aside v-if="mostRecentPost" class="lg:col-span-2">
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          {{ sectionTitles.latest }}
        </h2>
        <UiBlogPostCard :post="mostRecentPost" />
      </aside>

      <!-- Highlights -->
      <aside v-if="highlights.length > 0">
        <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
          {{ sectionTitles.highlights }}
        </h2>
        <div class="space-y-4">
          <UiBlogPostCardHighlight
            v-for="post in highlights"
            :key="post._path"
            :post="post"
          />
        </div>
      </aside>
    </div>

    <!-- Recent Posts -->
    <div class="mt-12">
      <h2 class="mb-6 font-heading text-3xl font-bold text-foreground">
        {{ sectionTitles.recent }}
      </h2>
      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlogPostCard v-for="post in filteredPosts" :key="post._path" :post="post" />
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  latest_post: "Latest Post"
  latest_reference: "Latest Reference"
  highlight_posts: "Highlights"
  highlight_references: "Highlights"
  recent_posts: "Posts"
  recent_references: "References"
de:
  latest_post: "Neuester Beitrag"
  latest_reference: "Neueste Referenz"
  highlight_posts: "Highlights"
  highlight_references: "Highlights"
  recent_posts: "Beiträge"
  recent_references: "Referenzen"
</i18n>
  
