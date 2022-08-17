<template>
  <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

(async () => {
  await fetch("/auth/logout", {
    method: "POST",
  });
  store.commit("removeJwt");
  router.push({ name: "login" });
})();
</script>
