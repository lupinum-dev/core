<script setup lang="ts">
definePageMeta({
  layout: 'wiki',
})
</script>

<template>
  <div class="container relative w-full flex-grow px-0">
    <UiHeaderSpacer />
    <div class="h-screen bg-red-500" />
    <div class="h-screen bg-blue-500" />
  </div>

  <!-- TOC visibility is now controlled by isSidebarOpen -->
  <div
    id="toc"
    class=" hidden w-[300px] lg:block xl:w-[420px]"
  >
    <UiHeaderSpacer />
    <h1>Toc</h1>
  </div>
</template>
