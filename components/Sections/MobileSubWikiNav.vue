<script setup lang="ts">
interface NavItem {
  title: string
  _path: string
  children?: NavItem[]
  icon?: string
  group?: string
  firstLink?: string
}

type Navigation = NavItem[]

const wikiNavigation = inject<Ref<Navigation>>('navigation-wiki')

const { currentSubmenuRoute } = useSubMenu()

const wikiSubNavigation = computed(() => {
  return wikiNavigation?.value?.find(item => item._path === currentSubmenuRoute.value)
})
</script>

<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">{{ wikiSubNavigation?.title || 'Wiki Navigation' }}</h2>
    <div v-if="wikiSubNavigation?.children">
      <div v-for="link in wikiSubNavigation.children" :key="link._path">
        {{ link.title }}
      </div>
    </div>
    <div v-else>
      No navigation items found.
    </div>
  </div>
</template>
