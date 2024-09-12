<template>
  <h1 class="text-[2.5rem] font-bold leading-none lg:text-[3.5rem]">
    Stay updated!
  </h1>
  <p>Join 60,000+ product managers receiving monthly updates on:</p>
  <ul class="list-outside list-image-none">
    <li>Product discovery and building what matters</li>
    <li>Measuring to ensure updates are a success</li>
    <li>And much more!</li>
  </ul>
</template>

<style lang="css" scoped>
ul li {
  @apply relative mb-2 pl-[2.3125rem] last:mb-0;
}

ul li::before {
  background: url("../assets/icon-list.svg");
  @apply absolute left-0 size-[1.3125rem] bg-cover bg-center bg-no-repeat content-[''];
}
</style>
