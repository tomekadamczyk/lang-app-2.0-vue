<template>
  <tr class="table__row">
      <TableCell
          v-for="(data, index) in singleRowData"
          v-bind:tableCell="data"
          v-bind:key="index"
      />
  </tr>
</template>

<script>
import TableCell from './TableCell/TableCell.vue';

export default {
  name: 'TableRow',
  components: {
    TableCell,
  },
  props: {
    tableRow: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      processedTableRowData: [],
    };
  },
  methods: {
    fillArrayByObjectKeys(destinationArray, sourceObject) {
      Object.keys(sourceObject).forEach((element) => {
        destinationArray.push(sourceObject[element]);
      });
    },
    generateDataFromObject() {
      this.processedTableRowData = [];
      this.processedTableRowData.push(this.index);
      this.fillArrayByObjectKeys(this.processedTableRowData, this.tableRow);
      return this.processedTableRowData;
    },
  },
  computed: {
    singleRowData() {
      this.generateDataFromObject();
      return this.processedTableRowData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

        .table__content {
            font-weight: bold;
        }

</style>
