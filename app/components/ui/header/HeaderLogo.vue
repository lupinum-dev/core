<script setup lang="ts">
import { computed } from 'vue'
import { useDebounceFn, useScroll } from '@vueuse/core'

interface Props {
  srcDark?: string
  srcLight?: string
  icon?: string
  contentRoutes: string[]
}

const props = withDefaults(defineProps<Props>(), {
  srcDark: '',
  srcLight: '',
  icon: '',
  contentRoutes: () => ['/wiki', '/blog', '/showcase'],
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

const isContentSite = computed(() => props.contentRoutes.some(path => route.path.startsWith(path)))

provide('isContentSite', isContentSite)

const showIcon = computed(() => isContentSite.value && !!props.icon)
const showLogo = computed(() => !isContentSite.value)
</script>

<template>
  <div class="ml-2">
    <ClientOnly>
      <Transition name="fade-slide" class="sm:hidden">
        <NuxtLink  to="/" class="flex items-center">
          <NuxtImg
           v-if="!isScrolled && isContentSite"
            :src="props.icon"
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
        <UiColorModeImage
          :light="props.srcLight"
          :dark="props.srcDark"
          alt="Logo"
          class="h-7"
        />
        <NuxtImg
          :src="props.icon"
          alt="Logo Icon"
          class="hidden h-7"
        />
      </div>

      <template #fallback>
        <NuxtLink to="/" class="flex items-center">
          <NuxtImg
            v-if="showIcon"
            :src="icon"
            alt="Logo Icon"
            class="b h-7 sm:hidden"
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
