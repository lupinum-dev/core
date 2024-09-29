<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="justify-cente mx-auto flex min-h-screen max-w-[1900px] flex-row ">
    <div
      id="sidenav"
      class="hidden w-[310px] border-x border-gray-200 bg-gray-100 lg:sticky lg:flex lg:h-screen lg:flex-col xl:w-[450px]"
    >
      <!-- Spacer for the header -->
      <UiHeaderSpacer />
      <div />
    </div>

    <slot />
  </div>
</template>
