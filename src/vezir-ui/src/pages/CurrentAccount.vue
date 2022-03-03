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
                  {{ declarationsSelectValue }}
                  <form @submit.prevent="simulateSubmit" class="q-pa-md">
                    <div class="q-pa-md">
                      <q-select
                        filled
                        v-model="declarationsSelectValue"
                        use-input
                        use-chips
                        multiple
                        label="Beyanname Ekleyin *"
                        input-debounce="0"
                        :options="declarationsValue"
                        option-value="id"
                        option-label="title"
                        @filter="filterFn"
                        emit-value
                        map-options
                        behavior="dialog"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Sonuç Bulunamadı
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>

                      <div class="row justify-end">
                        <q-btn
                          type="submit"
                          :loading="submitting"
                          label="Kaydet"
                          class="q-mt-md"
                          color="primary"
                        >
                          <template v-slot:loading>
                            <q-spinner-bars color="white" />
                          </template>
                        </q-btn>
                      </div>
                    </div>
                  </form>
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
    const submitting = ref(false);

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
    function simulateSubmit() {
      submitting.value = true;

      // Simulating a delay here.
      // When we are done, we reset "submitting"
      // Boolean to false to restore the
      // initial state.
      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
        submitting.value = false;
        var myJsonString = JSON.stringify(declarationsSelectValue.value);
        var myJsonString1 = JSON.stringify(restdata.value.id);
        console.log(myJsonString + myJsonString1);
      }, 1000);
    }

    fetchDataDeclarations();
    return {
      declarationsValue,
      declarationsSelectValue,
      restdata,
      tab: ref("mails"),
      simulateSubmit,
      submitting,

      filterFn(name, update, abort) {
        update(() => {
          let locales = ["tr", "TR", "tr-TR", "tr-u-co-search", "tr-x-turkish"];
          const needle = name.toLowerCase(locales);
          console.log(needle);
          declarationsValue.value = declarationsOptions.filter(
            (v) => v.name.toLowerCase(locales).indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
