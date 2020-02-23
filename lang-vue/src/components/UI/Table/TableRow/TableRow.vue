<template>
  <tr class="table__row">
      <TableCell
          v-for="(data, index) in singleRowData"
          v-bind:tableCell="data"
          v-bind:key="index"
          v-bind:routeIndex="routeIndex"
          v-bind:checkRouter="checkRouter"
          v-bind:cellToLink="cellToLink"
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
    checkRouter: {
      type: [Number, Boolean],
    },
    routeIndex: {
      type: Number,
    },
  },
  data() {
    return {
      processedTableRowData: [],
      cellToLink: null,
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
      this.getCellIndex();
      return this.processedTableRowData;
    },
    getCellIndex() {
      this.cellToLink = this.processedTableRowData[this.checkRouter];
    },
  },
  computed: {
    singleRowData() {
      this.generateDataFromObject();
      console.log(this.tableRow)
      console.log(this.processedTableRowData)
      return this.processedTableRowData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

</style>
