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
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-toggle
            v-model="whatsapp"
            icon="whatsapp"
            color="green"
            size="xl"
            label="Whatsapp Bildirimi"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-toggle
            v-model="mail"
            color="blue"
            icon="mail"
            size="xl"
            label="Email Bildirimi"
          />
        </div>



      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
export default {
  // name: 'ComponentName',

  props: {
    id: Number,
  },
  setup(props) {
    const dialog = ref(props.openpopup);
    const firmDeclarationTableRows = ref([]);
    const firmDeclarationTableColumns = [
      {
        name: "declarationId",
        label: "ID",
        field: "planningDeclarationsId",
        style: "width: 10px",
      },
      {
        label: "Beyanname Türü",
        align: "left",
        field: "declarationComment",
      },

      { label: "Dönem", field: "period", style: "width: 10px" },
      {
        label: "Son Ödeme Tarihi",
        align: "left",
        field: "lastPaymentDate",
        style: "width: 10px",
      },
      {
        label: "Gib Tarihi",
        align: "left",
        field: "verificationDate",
        style: "width: 10px",
      },
      {
        name: "approval",
        label: "Durumu",
        align: "left",
        field: "approval",
        style: "width: 5px",
      },
    ];
    const fetchFirmDeclarationData = async (id = 0) => {
      const response = await api
        .get("/api/declarations/firm-of-declarations", {
          params: {
            firmId: id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      firmDeclarationTableRows.value = response.data;
    };
    //fetchFirmDeclarationData(props.firmId);
    return {
      dialog,
      maximizedToggle: ref(false),
      firmDeclarationTableRows,
      firmDeclarationTableColumns,
      whatsapp: ref(true),
      mail: ref(true),
      payment: ref(false),
      hand: ref(true),
    };
  },
};
</script>
