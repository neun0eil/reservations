<template>
  <main>
    <NavBar />
    <main class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <CalendarMonth />
    </main>
  </main>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import CalendarMonth from "@/components/CalendarMonth.vue";
</script>
