<template>
  <q-card style="margin: 30px" align:stretch>
    <q-card-section>
      <div class="q-pa-md">
        <q-card-section>
          <div class="text-h4">Mükellef Kayıt</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
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
            <q-input
              filled
              v-model="firmName"
              label="Mükellefiyet Türü *"
              hint="Firma adını giriniz."
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
            />
            <q-input
              filled
              v-model="firmName"
              label="Firma Türü *"
              hint="Firma adını giriniz."
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
            />
            <q-select
              filled
              v-model="taxOffice"
              use-input
              hide-selected
              fill-input
              label="Vergi Dairesi *"
              input-debounce="0"
              :options="options"
              option-value="id"
              option-label="name"
              @filter="filterFn"
              hint="Vergi dairesini seçiniz."
              lazy-rules
              emit-value
              map-options
              clearable
              :rules="[(val) => !!val || 'Vergi dairesini seçiniz.']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sonuç Bulunamadı
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              filled
              v-model="vkntckn"
              label="VKN - TCKN"
              mask="###########"
              hint="VKN veya TCKN giriniz."
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Gerekli Alan...']"
            />

            <q-input
              filled
              v-model="firmCreateDate"
              label="Firma Açılış Tarihi"
              hint="Firma açılış tarihini giriniz."
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="firmCreateDate"
                      mask="YYYY-MM-DD"
                      today-btn
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <div>
              <q-btn label="Kaydet" type="submit" color="primary" size="md" />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar, date } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

const taxOfficeOptions = [];
export default {
  setup() {
    const $q = useQuasar();
    const firmName = ref(null);
    const firmDescription = ref(null);
    const taxOffice = ref(null);
    const vkntckn = ref(null);
    const options = ref(taxOfficeOptions);
    const firmCreateDate = ref(null);

    const fetchData = (page = 1) => {
      api
        .get("/api/TaxOffice")
        .then((res) => {
          taxOfficeOptions.push(...res.data);
        })
        .finally(() => {})
        .catch((err) => {
          $q.notify({
            type: "negative",
            message: err.message,
            position: "center",
          });
          // console.log(err);
        });
    };

    fetchData();

    return {
      firmName,
      firmDescription,
      taxOffice,
      vkntckn,
      options,
      firmCreateDate,
      filterFn(name, update, abort) {
        update(() => {
          const needle = name.toLowerCase();
          options.value = taxOfficeOptions.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      onSubmit() {
        api
          .post("/api/CurrentAccount", {
            firmName: firmName.value,
            firmDescription: firmDescription.value,
            taxOfficeId: taxOffice.value,
            taxNumber: vkntckn.value,
            firmOpenDate: firmCreateDate.value,
          })
          .then((res) => {
            $q.notify({
              type: "positive",
              message: "Kayıt Başarılı",
              position: "center",
            });
            // console.log(res);
          })
          .finally(() => {})
          .catch((err) => {
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
