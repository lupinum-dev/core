<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const route = useRoute()
const config = useRuntimeConfig()
const fullUrl = `${config.public.siteUrl}${route.path}`

function copyLink() {
  navigator.clipboard.writeText(fullUrl)
}

async function shareContent() {
  const shareData = {
    title: props.title,
    text: `Check out this: ${props.title}`,
    url: fullUrl,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    }
    catch (error) {
      console.error('Error sharing:', error)
    }
  }
  else {
    copyLink()
  }
}

function shareToTwitter() {
  const text = encodeURIComponent(`Check out this: ${props.title}`)
  const url = encodeURIComponent(fullUrl)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

function shareToFacebook() {
  const url = encodeURIComponent(fullUrl)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

function shareToLinkedIn() {
  const url = encodeURIComponent(fullUrl)
  const title = encodeURIComponent(props.title)
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank')
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 lg:justify-end">
    <LibButton variant="outline" size="sm" @click="copyLink">
      <Icon class="text-gray-t-1" name="heroicons:link-16-solid" />
      <span>Copy Link</span>
    </LibButton>
    <LibPopover>
      <LibPopoverTrigger as-child>
        <LibButton variant="outline" size="sm">
          <Icon class="text-gray-t-1" name="heroicons:share-16-solid" />
          <span>Share</span>
        </LibButton>
      </LibPopoverTrigger>
      <LibPopoverContent class="w-72">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-heading leading-none text-gray-t-1">
              Share Content
            </h4>
            <p class="text-sm text-gray-t-3">
              Choose a sharing option
            </p>
          </div>
          <div class="grid gap-x-20">
            <LibButton variant="ghost" class="w-full justify-start" @click="shareContent">
              <Icon name="heroicons:share-20-solid" class="mr-4 size-4" />
              Share via...
            </LibButton>
            <LibButton variant="ghost" class="w-full justify-start" @click="shareToTwitter">
              <Icon name="mdi:twitter" class="mr-4 size-4" />
              Twitter
            </LibButton>
            <LibButton variant="ghost" class="w-full justify-start" @click="shareToFacebook">
              <Icon name="mdi:facebook" class="mr-4 size-4" />
              Facebook
            </LibButton>
            <LibButton variant="ghost" class="w-full justify-start" @click="shareToLinkedIn">
              <Icon name="mdi:linkedin" class="mr-4 size-4" />
              LinkedIn
            </LibButton>
            <LibButton variant="ghost" class="w-full justify-start" @click="copyLink">
              <Icon name="heroicons:link-16-solid" class="mr-4 size-4" />
              Copy Link
            </LibButton>
          </div>
        </div>
      </LibPopoverContent>
    </LibPopover>
  </div>
</template>
