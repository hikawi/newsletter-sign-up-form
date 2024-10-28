<script setup lang="ts">
import illustrationDesktop from "../assets/illustration-desktop.svg";
import illustrationMobile from "../assets/illustration-mobile.svg";
</script>

<template>
  <div class="rounded-b-2xl lg:order-2" aria-hidden="true">
    <picture>
      <source :srcset="illustrationDesktop.src" media="(min-width: 1024px)" />
      <img
        :src="illustrationMobile.src"
        alt=""
        class="h-full w-full bg-cover"
      />
    </picture>
  </div>
</template>
