<script setup lang="ts">

</script>

<template>
  <div class="bg-svg dark:bg-svg-dark w-full">
    <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-background ">
      <UiWikiSideNav />
      <div class="mx-auto mt-24 flex w-full max-w-7xl flex-col justify-between  px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>
</template>
