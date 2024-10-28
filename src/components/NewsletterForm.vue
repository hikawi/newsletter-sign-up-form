<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from "vue";
import IllustrationDiv from "./IllustrationDiv.vue";
import SignupForm from "./SignupForm.vue";
import SignupText from "./SignupText.vue";
import IconSuccess from "./icons/IconSuccess.vue";

const submitted = ref("");
const dialogRef = useTemplateRef("thanksDialog");

function onSubmit(email: string) {
  submitted.value = email;
}

watchEffect(
  () => {
    if (submitted.value !== "") {
      dialogRef.value?.focus(); // Focus on the popup dialog.
    } else {
      document.getElementById("email")?.focus(); // Focus on the input again.
    }
  },
  { flush: "post" },
);
</script>

<template>
  <!-- This is the confirmation module -->
  <main
    class="relative flex h-screen w-full flex-col justify-between rounded-none bg-white px-6 py-10 text-dark-slate-gray lg:size-[32rem] lg:rounded-[2.5rem] lg:p-16"
    :class="$style.animatePopup"
    v-if="submitted !== ''"
  >
    <!-- Empty div to put the text center and the button at bottom. This isn't needed in lg+ sizes -->
    <div class="lg:hidden"></div>

    <div
      class="flex flex-col gap-6"
      role="dialog"
      ref="thanksDialog"
      aria-labelledby="thanks-popup-heading"
      aria-describedby="thanks-popup-description"
    >
      <IconSuccess class="lg:-mt-4" />
      <h2
        class="mt-4 text-[2.5rem] font-bold leading-none lg:text-[3.5rem]"
        id="thanks-popup-heading"
      >
        Thanks for subscribing!
      </h2>
      <p class="break-words" id="thanks-popup-description">
        A confirmation email has been sent to
        <strong>{{ submitted }}</strong
        >. Please open it and click the button inside to confirm your
        subscription
      </p>
    </div>

    <button
      class="h-14 w-full rounded-lg bg-dark-slate-gray text-center font-bold text-white lg:mb-0"
      :class="$style.dismissButton"
      @click="submitted = ''"
    >
      Dismiss Message
    </button>
  </main>

  <!-- The newsletter sign up form normally. -->
  <main
    class="flex h-full w-full flex-col gap-10 rounded-none bg-white p-0 text-dark-slate-gray lg:w-[58rem] lg:flex-row lg:gap-x-16 lg:rounded-[2.25rem] lg:p-6"
    v-else
  >
    <IllustrationDiv />
    <div class="flex flex-col justify-start gap-6 px-6 lg:justify-center">
      <SignupText />
      <SignupForm @submit="onSubmit" />
    </div>
  </main>
</template>

<style lang="css" module>
.dismissButton:hover {
  background: linear-gradient(204deg, #ff6a3a 0%, #ff527b 100%);
  box-shadow: 0px 16px 32px 0px rgba(255, 97, 85, 0.5);
}

.dismissButton:active {
  scale: 1.01;
}

.animatePopup {
  animation: popup 0.2s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .animatePopup {
    animation: none;
  }
}

@keyframes popup {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
