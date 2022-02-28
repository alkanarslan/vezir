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
            <q-select
              filled
              v-model="LiableTypeValue"
              :options="LiableTypeOption"
              label="Mükellefiyet Türü *"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              clearable
              :rules="[(val) => !!val || 'Mükellefiyet Türünü seçiniz.']"
              hint="Mükellefiyet Türünü seçiniz."
              @update:model-value="(val) => liableTypeSelected(val)"
            />

            <q-select
              v-if="firmTypeVisible"
              filled
              v-model="firmTypeSelectedOptionsValue"
              :options="firmTypeOptionsValue"
              label="Firma Türü *"
              option-value="lookupID"
              option-label="name"
              emit-value
              map-options
              clearable
              :rules="[(val) => !!val || 'Firma Türünü seçiniz.']"
              hint="Firma Türünü seçiniz."
            />
            <q-select
              filled
              v-model="taxOffice"
              use-input
              hide-selected
              fill-input
              label="Vergi Dairesi *"
              input-debounce="0"
              :options="taxOfficeOptionsValue"
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
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

const taxOfficeOptions = [];
const liableType = [
  { label: "Gelir Vergisi", value: "6" },
  { label: "Kurumlar Vergisi", value: "7" },
  { label: "Hiçbiri", value: "8" },
];
const firmTypeOptions = [];
export default {
  setup() {
    const $q = useQuasar();
    const firmName = ref(null);
    const firmDescription = ref(null);
    const taxOffice = ref(null);
    const taxOfficeOptionsValue = ref(taxOfficeOptions);
    const LiableTypeOption = ref(liableType);
    const LiableTypeValue = ref(null);
    const vkntckn = ref(null);
    const firmCreateDate = ref(null);
    const firmTypeOptionsValue = ref(firmTypeOptions);
    const firmTypeSelectedOptionsValue = ref(null);
    const firmTypeVisible = ref(null);

    const incomeTaxSubType = [
      {
        lookupID: 9,
        subLookupID: 6,
        name: "Gerçek Kişi/Bilanço Esası",
        visible: false,
      },
      {
        lookupID: 10,
        subLookupID: 6,
        name: "Kollektif",
        visible: false,
      },
      {
        lookupID: 11,
        subLookupID: 6,
        name: "Komandit",
        visible: false,
      },
      {
        lookupID: 12,
        subLookupID: 6,
        name: "Gerçek Kişi/İşletme Esası",
        visible: false,
      },
      {
        lookupID: 13,
        subLookupID: 6,
        name: "Serbest Meslek",
        visible: false,
      },
      {
        lookupID: 14,
        subLookupID: 6,
        name: "Basit Usul",
        visible: false,
      },
      {
        lookupID: 15,
        subLookupID: 6,
        name: "Adi Ortaklık",
        visible: false,
      },
    ];
    const taxDeptSubType = [
      {
        lookupID: 16,
        subLookupID: 7,
        name: "Anonim",
        visible: false,
      },
      {
        lookupID: 17,
        subLookupID: 7,
        name: "Eshamlı Komandit/Sermayesi paylara bölünmüş",
        visible: false,
      },
      {
        lookupID: 18,
        subLookupID: 7,
        name: "Limited",
        visible: false,
      },
      {
        lookupID: 19,
        subLookupID: 7,
        name: "Dernek",
        visible: false,
      },
      {
        lookupID: 20,
        subLookupID: 7,
        name: "Vakıf",
        visible: false,
      },
      {
        lookupID: 21,
        subLookupID: 7,
        name: "Kooperatif",
        visible: false,
      },
      {
        lookupID: 22,
        subLookupID: 7,
        name: "İş Ortaklığı",
        visible: false,
      },
    ];
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
      taxOfficeOptionsValue,
      vkntckn,
      firmCreateDate,
      LiableTypeOption,
      LiableTypeValue,
      firmTypeOptionsValue,
      firmTypeSelectedOptionsValue,
      firmTypeVisible,
      filterFn(name, update, abort) {
        update(() => {
          const needle = name.toLowerCase();
          taxOfficeOptionsValue.value = taxOfficeOptions.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      onSubmit() {
        const sendData = {
          firmName: firmName.value,
          firmDescription: firmDescription.value,
          taxOfficeId: taxOffice.value,
          taxNumber: vkntckn.value,
          firmOpenDate: firmCreateDate.value,
          firmTypeId: firmTypeSelectedOptionsValue.value
            ? firmTypeSelectedOptionsValue.value
            : 8,
        };
        api
          .post("/api/CurrentAccount", sendData)
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
            console.log(sendData);
            $q.notify({
              type: "negative",
              message: err.message,
              position: "center",
            });
            // console.log(err);
          });
      },
      liableTypeSelected(value) {
        firmTypeVisible.value = true;
        if (value == 6) {
          firmTypeOptionsValue.value = [];
          firmTypeSelectedOptionsValue.value = [];
          firmTypeOptionsValue.value.push(...incomeTaxSubType);
        } else if (value == 7) {
          firmTypeOptionsValue.value = [];
          firmTypeSelectedOptionsValue.value = [];
          firmTypeOptionsValue.value.push(...taxDeptSubType);
        } else {
          firmTypeSelectedOptionsValue.value = null;
          firmTypeVisible.value = false;
          //  firmTypeOptionsValue.value = [{ name: "Hiçbiri", lookupID: 14 }];
        }
      },
    };
  },
};
</script>
