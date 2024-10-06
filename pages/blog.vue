<script setup lang="ts">

</script>

<template>
  <div class="container relative w-full flex-grow px-0">
    <UiHeaderSpacer />
    <div class="h-screen bg-green-500" />
    <div class="h-screen bg-fuchsia-500" />
    <div class="h-screen bg-green-500" />
    <div class="h-screen bg-fuchsia-500" />
    <div class="h-screen bg-green-500" />
    <div class="h-screen bg-fuchsia-500" />
    <div class="h-screen bg-green-500" />
    <div class="h-screen bg-fuchsia-500" />
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
