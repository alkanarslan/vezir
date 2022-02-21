<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="firmName"
        label="Firma Adı *"
        hint="Firma adını giriniz."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
      />

      <q-input
        filled
        v-model="firmDescription"
        label="Firma Ünvanı *"
        hint="Firma ünvanını giriniz."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
      />

      <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        label="Vergi Dairesi *"
        input-debounce="0"
        :options="options"
        option-value="id"
        option-label="name"
        emit-value
        @filter="filterFn"
        hint="Vergi dairesini seçiniz."
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div>
        <q-btn label="Kaydet" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

const stringOptions = [];
export default {
  setup() {
    const $q = useQuasar();
    const firmName = ref(null);
    const firmDescription = ref(null);
    const options = ref(stringOptions);

    const fetchData = (page = 1) => {
      api
        .get("/api/TaxOffice")
        .then((res) => {
          // optionsvez.value = res.data;
          stringOptions.push(...res.data);
        })
        .finally(() => {})
        .catch((err) => {
          $q.notify({
            type: "negative",
            message: err.message,
            position: "center",
          });
          // loading.value = true;
          console.log(err);
        });
    };

    fetchData();

    return {
      firmName,
      firmDescription,
      model: ref(null),
      options,
      filterFn(name, update, abort) {
        update(() => {
          const needle = name.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      onSubmit() {
        if (false !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:
              "You need to accept the license and terms first" + firmName.value,
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
    };
  },
};
</script>
