<script setup lang="ts">
import IllustrationMobile from "../assets/IllustrationMobile.vue";
</script>

<template>
  <main
    class="flex h-full w-full flex-col gap-10 bg-white text-dark-slate-gray"
  >
    <div class="rounded-b-2xl">
      <IllustrationMobile class="h-full w-full object-cover" />
    </div>
    <div class="flex flex-col gap-6 px-6">
      <h1 class="text-4.5xl font-bold leading-none">Stay updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>
      <ul class="list-outside" :class="$style.list">
        <li class="mx-4">Product discovery and building what matters</li>
        <li class="mx-4">Measuring to ensure updates are a success</li>
        <li class="mx-4">And much more!</li>
      </ul>
    </div>
  </main>
</template>

<style lang="css" module>
.list {
  list-style-image: url("../../public/icon-list.svg");
}
</style>
