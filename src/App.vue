<template>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
store.commit("getJwt");
</script>
