<template>
  <div class="q-pa-md">
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
                props.row.planningDeclarationsId
              )
            "
          />
        </q-td>
      </template>
      <template v-slot:body-cell-approval="props">
        <q-td :props="props">
          <span v-if="props.row.approval === 0">
            <q-badge color="red" label="Onaylandı"
          /></span>
          <span v-if="props.row.approval === 1">
            <q-badge color="secondary" label="İptal"
          /></span>
          <span v-if="props.row.approval === 188">
            <q-badge color="primary" label="Gib Bekleniyor"
          /></span>
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
      {
        name: "declarationId",
        label: "ID",
        field: "planningDeclarationsId",
        style: "width: 10px",
      },
      {
        label: "Beyanname Türü",
        align: "left",
        field: "declarationComment",
      },

      { label: "Dönem", field: "period", style: "width: 10px" },
      {
        label: "Son Ödeme Tarihi",
        align: "left",
        field: "lastPaymentDate",
        style: "width: 10px",
      },
      {
        label: "Gib Tarihi",
        align: "left",
        field: "verificationDate",
        style: "width: 10px",
      },
      {
        name: "approval",
        label: "Durumu",
        align: "left",
        field: "approval",
        style: "width: 5px",
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
        console.log(firmDeclarationTableRows.value[index].period);
        this.firmDeclarationTableRows.splice(index, 1);
        console.log(firmDeclarationTableRows.value);
      },
    };
  },
};
</script>
