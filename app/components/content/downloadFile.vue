<script setup lang="ts">
interface DownloadFileProps {
  src: string
  label: string
}

const props = defineProps<DownloadFileProps>()

const fileName = computed(() => props.src.split('/').pop() || 'file')
</script>

<template>
  <div class="mt-2 flex">
    <UiButton
      :href="src"
      :download="fileName"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      {{ label }}
    </UiButton>
  </div>
</template>
