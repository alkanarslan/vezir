<template>
  <div class="q-pa-md">
    <q-table
      color="secondary"
      title="Beyannameler"
      :rows="restdata"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
      binary-state-sort
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" placeholder="Ara">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from "boot/axios";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { HubConnectionBuilder } from "@microsoft/signalr";
let $q;

export default defineComponent({
  setup() {
    const loading = ref(true);
    const restdata = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const columns = [
      { name: "id", label: "ID", field: "id" },
      { name: "name", label: "Açıklama", align: "left", field: "name" },
      { name: "code", label: "Kod", field: "code" },
    ];

    const fetchData = (page = 1) => {
      api
        .get("/api/Declarations", {
          params: { pageNumber: page },
        })
        .then((res) => {
          restdata.value = res.data.data;
          pagination.value.page = res.data.pageNumber;
          pagination.value.rowsPerPage = res.data.pageSize;
          pagination.value.rowsNumber = res.data.totalRecords;
        })
        .finally(() => {
          loading.value = false;
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

    function onRequest(props) {
      fetchData(props.pagination.page);
    }
    fetchData();

    $q = useQuasar();
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5092/vezirhub")
      .withAutomaticReconnect()
      .build();

    console.log("Conn" + connection);

    connection.start();
    connection.on("SendMessage", (data) => {
      //fetchData(data);
      $q.notify({
        type: "negative",
        message: "Al tarrak " + data,
        position: "center",
      });
      console.log(data);
    });

    return {
      onRequest,
      loading,
      restdata,
      columns,
      pagination,
    };
  },
});
</script>
