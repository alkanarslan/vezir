<template>
  <div class="q-pa-md">
    <span>{{ firmId }}</span>
    <q-table
      color="primary"
      :rows="firmDeclarationTableRows"
      :columns="firmDeclarationTableColumns"
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
                firmDeclarationTableRows.indexOf(props.row),
                props.row.id
              )
            "
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
export default {
  // name: 'ComponentName',

  props: {
    firmId: String,
  },

  setup(props) {
    const firmDeclarationTableRows = ref([]);
    const firmDeclarationTableColumns = [
      { name: "declarationId", label: "ID", field: "id", style: "width: 10px" },
      {
        name: "declarationComment",
        label: "Açıklama",
        align: "left",
        field: "declarationComment",
      },
      { name: "period", label: "Kod", field: "period", style: "width: 10px" },
      {
        name: "approval",
        label: "Zaman Tanımı",
        field: "approval",
        style: "width: 10px",
      },
      {
        name: "action",
        align: "right",
        field: "action",
        style: "width: 10px",
      },
    ];

    const fetchFirmDeclarationData = async (id = 0) => {
      const response = await api
        .get("/api/declarations/firm-of-declarations", {
          params: {
            firmId: id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      firmDeclarationTableRows.value = response.data;
    };

    fetchFirmDeclarationData(props.firmId);
    return {
      firmDeclarationTableRows,
      firmDeclarationTableColumns,
      deleteval(index, rowid) {
        console.log(rowid);
        this.firmDeclarationTableRows.splice(index, 1);
        console.log(firmDeclarationTableRows.value);
      },
    };
  },
};
</script>
