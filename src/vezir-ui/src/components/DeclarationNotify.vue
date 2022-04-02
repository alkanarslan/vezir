<template>
  <q-btn
    color="primary"
    icon-right="alarm"
    no-caps
    flat
    dense
    @click="dialog = true"
  />
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space />
        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6 text-center">Bildirim Ayarları</div>
        <div class="text-h7 text-center">{{title}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Katma Deger Vergisi Beyanname 1
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
export default {
  name: 'DeclarationNotify',

  props: {
    firmId: Number,
    title: String,
    declarationId: Number,
  },
  setup(props) {
    const dialog = ref(props.openpopup);
    return {
      dialog,
      maximizedToggle: ref(false),
    };
  },
};
</script>
