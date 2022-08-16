<template>
  <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

store.commit("removeJwt");
router.push({ name: "login" });
</script>
