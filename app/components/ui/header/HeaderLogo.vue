<script setup lang="ts">
import { computed } from 'vue'
import { useDebounceFn, useScroll } from '@vueuse/core'

interface Props {
  srcDark?: string
  srcLight?: string
  icon?: string
  contentRoutes: string[]
  iconLight?: string
  iconDark?: string
}

const props = withDefaults(defineProps<Props>(), {
  srcDark: '',
  srcLight: '',
  icon: '',
  contentRoutes: () => ['/wiki', '/blog', '/references'],
  iconLight: '',
  iconDark: '',
})

const { y } = useScroll(window)
const isScrolled = ref(false)
const previousScrollPosition = ref(0)

const updateIsScrolled = useDebounceFn(() => {
  const currentPosition = y.value
  const isScrollingUp = currentPosition < previousScrollPosition.value

  if (isScrollingUp && currentPosition === 0) {
    setTimeout(() => {
      isScrolled.value = false
    }, 50)
  }
  else {
    isScrolled.value = currentPosition > 0
  }

  previousScrollPosition.value = currentPosition
}, 10)

watch(y, updateIsScrolled, { immediate: true })

const route = useRoute()
const localePath = useLocalePath()

const isContentSite = computed(() => {
  return props.contentRoutes.some(path => 
    route.path === localePath(path) || route.path.startsWith(localePath(path))
  )
})

provide('isContentSite', isContentSite)

const showIcon = computed(() => isContentSite.value && (!!props.iconLight || !!props.iconDark))
const showLogo = computed(() => !isContentSite.value)
</script>

<template>
  <div class="ml-2">
    <ClientOnly>
      <Transition name="fade-slide" class="sm:hidden">
        <NuxtLink :to="localePath('/')" class="flex items-center">
          <UiColorModeImage
           v-if="!isScrolled && isContentSite"
            :light="props.iconLight"
            :dark="props.iconDark"
            alt="Logo Icon"
            class="h-7 sm:hidden"
            
          />
          <UiColorModeImage
            v-else-if="!isContentSite"
            :light="props.srcLight"
            :dark="props.srcDark"
            alt="Logo"
            class="h-7"
          />
        </NuxtLink>
      </Transition>
      <div class="hidden sm:block">
        <NuxtLink :to="localePath('/')" class="flex items-center">
        <UiColorModeImage
          :light="props.srcLight"
          :dark="props.srcDark"
          alt="Logo"
          class="h-7"
        />
        <UiColorModeImage
          :light="props.iconLight"
          :dark="props.iconDark"
          alt="Logo Icon"
          class="hidden h-7"
        />
      </NuxtLink>
      </div>

      <template #fallback>
        <NuxtLink :to="localePath('/')" class="flex items-center">
          <UiColorModeImage
            v-if="showIcon"
            :light="props.iconLight"
          :dark="props.iconDark"
            alt="Logo Icon"
            class=" h-7 sm:hidden"
          />
          <UiColorModeImage
            v-if="showLogo"
            :light="props.srcLight"
            :dark="props.srcDark"
            alt="Logo"
            class="h-7 "
          />
        </NuxtLink>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
