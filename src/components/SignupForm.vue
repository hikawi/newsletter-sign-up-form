<script setup lang="ts">
import { computed, ref } from "vue";
import { z } from "zod";

const emit = defineEmits<{
  submit: [email: string];
}>();

const email = ref("");
const emailError = computed(
  () =>
    email.value !== "" &&
    z.string().email().safeParse(email.value).error !== undefined,
);

function validate() {
  emit("submit", email.value);
  email.value = "";
}
</script>

<template>
  <form class="mt-4 flex flex-col" name="Signup Form" novalidate>
    <div class="mb-2 flex w-full flex-row items-center justify-between">
      <label
        for="email"
        class="text-xs font-bold after:text-tomato after:content-['_*']"
        >Email address</label
      >
      <span
        class="text-xs font-bold text-tomato"
        id="errorMessage"
        :class="{ invisible: !emailError }"
        >Valid email required</span
      >
    </div>

    <input
      type="email"
      name="email"
      id="email"
      v-model="email"
      required
      class="w-full rounded-lg border-2 border-charcoal-gray border-opacity-[25%] px-6 py-4 text-opacity-50 focus:border-opacity-100 focus:outline-none"
      :class="{ 'border-2 border-tomato bg-tomato/15': emailError }"
      :aria-invalid="emailError"
      aria-errormessage="errorMessage"
      placeholder="email@company.com"
    />

    <button
      class="mb-10 mt-6 h-14 w-full rounded-lg bg-dark-slate-gray text-center font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 lg:mb-0"
      :class="$style.submitButton"
      type="submit"
      :disabled="emailError"
      @click.prevent="validate"
    >
      Subscribe to monthly newsletter
    </button>
  </form>
</template>

<style lang="css" module>
.submitButton:hover {
  background: linear-gradient(204deg, #ff6a3a 0%, #ff527b 100%);
  box-shadow: 0px 16px 32px 0px rgba(255, 97, 85, 0.5);
}

.submitButton:active {
  scale: 1.01;
}
</style>
