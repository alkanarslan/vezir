<template>
  <img src="~assets/vezir-bg.jpeg" class="wave" />

  <div class="row fixed-center" style="left: 31%">
    <div>
      <img src="~assets/vezir-logo.svg" />
      <q-form class="q-gutter-md" @submit.prevent="submitForm">
        <q-input outlined label="Kullanıcı Adı" v-model="login.username" dark />
        <q-input
          outlined
          type="password"
          label="Şifre"
          v-model="login.password"
          dark
        />
        <q-btn
          style="background: #04c35c; color: white; width: 352px"
          size="md-lg"
          label="Giriş"
          class="center"
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
let $q;
export default {
  name: "Login",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: "negative",
          message: 'This is a "negative" type notification.',
        });
      }
    },
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>

<style scoped>
.wave {
  min-height: 100%;
  min-width: 100%;
  height: auto;
  width: auto;
  position: absolute;
  top: -100%;
  bottom: -100%;
  left: -100%;
  right: -100%;
  margin: auto;
  z-index: -1;
}
</style>
