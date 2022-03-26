<template>
  <q-btn push color="white" text-color="primary" label="Kişi Ekle" icon="person_add" @click="dialog = true" />
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down">
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
        <div class="text-h6 text-center">Kişi Ekle</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div style="min-width: 300px">

          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Adı Soyadı*"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
            />
            <q-input
              filled
              v-model="email"
              label="E-Posta*"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
            />
            <q-input
            filled
            v-model="phonenumber"
            label="Telefon No*"
            lazy-rules
            mask="#(###) ### - ####"
            unmasked-value

          />


            <q-btn label="Kaydet" type="submit" style="min-width: 300px"  color="primary" />
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="firmContactTableRows" :columns="firmContactTableColumns" row-key="id">
      <template v-slot:top>
       <q-space />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import {useQuasar} from "quasar";
export default {
  name: 'FirmContacts',

  props: {
    firmId: String
  },
  setup(props) {
    const $q = useQuasar();
    const dialog = ref(false);
    const name = ref(null);
    const email = ref(null);
    const phonenumber = ref(null);
    const firmContactTableRows = ref([]);
    const firmContactTableColumns = [
      {

        label: "Kayıt ID",
        field: "id",
        style: "width: 10px",
      },
      {
        label: "Adı Soyadı",
        align: "left",
        field: "name",
      },

      {
        label: "Telefon No",
        align: "left",
        field: "phoneNumber",
        style: "width: 10px",
      },
      {
        label: "E-Posta",
        align: "left",
        field: "email",
        style: "width: 10px",
      }
    ];
    const fetchContactData = async (id = 0) => {
      const response = await api
        .get("/api/firmcontact", {
          params: {
            firmId: id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      firmContactTableRows.value = response.data;
    };
    fetchContactData(props.firmId);
    return {
      dialog,
      maximizedToggle: ref(false),
      firmContactTableRows,
      firmContactTableColumns,
      name,
      phonenumber,
      email,
      onSubmit() {
        const sendData = {
          name: name.value,
          phoneNumber: phonenumber.value,
          email: email.value,
          currentAccountId:props.firmId,

        };
        api
          .post("/api/firmcontact", sendData)
          .then((res) => {
            $q.notify({
              type: "positive",
              message: "Kayıt Başarılı",
              position: "center",
            });
            dialog.value = false;
            fetchContactData(props.firmId);
          })
          .finally(() => {})
          .catch((err) => {
            console.log(sendData);
            $q.notify({
              type: "negative",
              message: err.message,
              position: "center",
            });
            // console.log(err);
          });
      },
    };
  },
};
</script>
