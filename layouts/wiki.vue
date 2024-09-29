<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-[1900px] flex-row justify-center bg-yellow-400">
    <div
      id="sidenav"
      class="w-[310px] border-r border-gray-o-1 bg-red-500 lg:sticky lg:flex lg:h-screen lg:flex-col xl:w-[450px]"
    >
      <div class="pt-56">
        WLANASD
      </div>
    </div>
    <slot />
  </div>
</template>
