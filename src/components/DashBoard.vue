<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl tracking-tight font-bold text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>
    <main class="flex-1 flex flex-col">
      <div class="w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <slot>
          <div class="px-4 py-6 sm:px-0">
            <div
              class="border-4 border-dashed border-gray-200 rounded-lg h-96"
            />
          </div>
        </slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
});
</script>
