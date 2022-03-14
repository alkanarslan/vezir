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
                <q-tab
                  name="declarationNotify"
                  icon="assessment"
                  label="Beyanname Bildirimleri"
                />
                <q-tab name="firms" icon="domain" label="Firma Bilgileri" />
                <q-tab
                  name="alarms"
                  icon="settings_accessibility"
                  label="İletişim Bilgileri"
                />
                <q-tab name="movies" icon="alarm" label="Bildirimler" />
                <q-tab
                  name="mails"
                  icon="settings"
                  label="Beyanname Ayarları"
                />
              </q-tabs>
              <q-separator />
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="declarationNotify">
                  <div class="text-h6">Firma Bilgileri</div>
                  <FirmOfDeclaration
                    :firmId="currentRouteID"
                  ></FirmOfDeclaration>
                </q-tab-panel>
                <q-tab-panel name="mails">
                  <div class="text-h6">Beyanname Listesi</div>

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
                  <div class="q-pa-md">
                    <q-table
                      color="primary"
                      :rows="declarationTableRows"
                      :columns="declarationTableColumns"
                      row-key="id"
                      separator="cell"
                    >
                      <template v-slot:body-cell-action="props">
                        <q-td :props="props">
                          <q-btn
                            color="negative"
                            icon-right="clear"
                            no-caps
                            flat
                            dense
                            @click="
                              deleteval(
                                declarationTableRows.indexOf(props.row),
                                props.row.id
                              )
                            "
                          />
                        </q-td>
                      </template>
                    </q-table>
                  </div>
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
import FirmOfDeclaration from "../components/FirmOfDeclaration.vue";

const declarationsOptions = [];
export default {
  name: "CurrentAccount",
  setup() {
    const restdata = ref([]);
    const declarationTableRows = ref([]);
    const declarationsSelectValue = ref(null);
    const declarationsValue = ref(declarationsOptions);
    const $q = useQuasar();
    const route = useRoute();
    const currentRouteID = route.params.id;
    const declarationTableColumns = [
      { name: "id", label: "ID", field: "id", style: "width: 10px" },
      { name: "name", label: "Açıklama", align: "left", field: "name" },
      { name: "code", label: "Kod", field: "code", style: "width: 10px" },
      {
        name: "timeValue",
        label: "Zaman Tanımı",
        field: "timeValue",
        style: "width: 10px",
      },
      {
        name: "action",
        align: "right",
        field: "action",
        style: "width: 10px",
      },
    ];
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
    const declarationTableRowsData = (id = 0) => {
      api
        .get("/api/declarations/declarations-firm-list", {
          params: { firmId: id },
        })
        .then((res) => {
          declarationTableRows.value = res.data;
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
    declarationTableRowsData(currentRouteID);
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
      api
        .post(
          "/api/declarations/firm-assign?firmId=" + restdata.value.id,
          declarationsSelectValue.value
        )
        .then((res) => {
          $q.notify({
            type: "positive",
            message: "Kayıt Başarılı",
            position: "center",
          });
        })
        .finally(() => {
          declarationsSelectValue.value = null;
          submitting.value = false;
          declarationTableRowsData(currentRouteID);
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            message: err.message,
            position: "center",
          });
        });
    }
    fetchDataDeclarations();
    return {
      currentRouteID,
      declarationsValue,
      declarationsSelectValue,
      restdata,
      tab: ref("declarationNotify"),
      simulateSubmit,
      submitting,
      declarationTableColumns,
      declarationTableRows,
      deleteval(index, rowid) {
        console.log(rowid);
        this.declarationTableRows.splice(index, 1);
        console.log(declarationTableRows.value);
      },
      filterFn(name, update, abort) {
        update(() => {
          let locales = ["tr", "TR", "tr-TR", "tr-u-co-search", "tr-x-turkish"];
          const needle = name.toLowerCase(locales);
          declarationsValue.value = declarationsOptions.filter(
            (v) => v.name.toLowerCase(locales).indexOf(needle) > -1
          );
        });
      },
    };
  },
  components: { FirmOfDeclaration },
};
</script>
