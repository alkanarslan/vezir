<template>
  <div class="q-pa-md">
    <q-table
      title="Beyannameler"
      :rows="data"
      :columns="columns"
      row-key="id"
      :loading="loading"
      binary-state-sort
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Ara"
        >
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

export default {
  data() {
    return {
      data: [],
      columns: [
        { name: "id", label: "id", field: "id" },
        { name: "name", label: "name", align: "left", field: "name" },
        { name: "code", label: "code", field: "code" },
      ],
    };
  },
  methods: {
    getAll() {
      api.get("/api/Declarations").then((res) => {
        console.log(res.data.data);
        this.data = res.data.data;
      });
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>
