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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
export default {
  setup() {
    const restdata = ref([]);
    const $q = useQuasar();
    const route = useRoute();
    const currentRouteID = route.params.id;
    console.log("orororodfsfsfs");
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

    return {
      restdata,
      tab: ref("mails"),
    };
  },
};
</script>
