<template>
  <q-card style="margin: 30px" align:stretch>
    <q-card-section>
      <div class="q-pa-md">
        <q-card-section>
          <div class="text-h4">
            {{ restdata.firmName }} ({{ restdata.firmDescription }})
          </div>
        </q-card-section>

        <q-separator inset />

        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
              >
                <q-tab name="mails" icon="mail" label="Beyanname" />
                <q-tab name="firms" icon="people" label="Firma Bilgileri" />
                <q-tab name="alarms" icon="people" label="İletişim Bilgileri" />
                <q-tab name="movies" icon="alarm" label="Bildirimler" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="mails">
                  <div class="text-h6">Beyanname</div>

                  <q-select
                    filled
                    v-model="declarationsSelectValue"
                    use-input
                    hide-selected
                    fill-input
                    label="Vergi Dairesi *"
                    input-debounce="0"
                    :options="declarationsValue"
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
                </q-tab-panel>
                <q-tab-panel name="firms">
                  <div class="text-h6">Firma Bilgileri</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                <q-tab-panel name="alarms">
                  <div class="text-h6">İletişim Bilgileri</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="movies">
                  <div class="text-h6">Bildirimler</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { HubConnectionBuilder } from "@microsoft/signalr";
const declarationsOptions = [];
export default {
  setup() {
    const restdata = ref([]);
    const declarationsSelectValue = ref(null);
    const declarationsValue = ref(declarationsOptions);
    const $q = useQuasar();
    const route = useRoute();
    const currentRouteID = route.params.id;

    const fetchData = (id = 0) => {
      api
        .get("/api/CurrentAccount", {
          params: { currentAccountId: id },
        })
        .then((res) => {
          restdata.value = res.data;
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

    fetchData(currentRouteID);

    const fetchDataDeclarations = (page = 1) => {
      api
        .get("/api/Declarations", {
          params: { pageNumber: page, pageSize: 120 },
        })
        .then((res) => {
          declarationsOptions.push(...res.data.data);
        })
        .finally(() => {
          //  loading.value = false;
        })
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

    fetchDataDeclarations();
    return {
      declarationsValue,
      declarationsSelectValue,
      restdata,
      tab: ref("mails"),
      filterFn(name, update, abort) {
        update(() => {
          const needle = name.toLowerCase();
          declarationsValue.value = declarationsOptions.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
