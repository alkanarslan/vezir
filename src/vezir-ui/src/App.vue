<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "App",
  beforeCreate() {
    this.$store.dispatch("auth/init");
    const token = this.$store.getters.getToken;
    if (token) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.accessToken}`;
    } else {
      api.defaults.headers.common.Authorization = "";
    }
  },
  mounted() {
    this.$q.dark.set(false);
  },
});
</script>
