<template>
  <tr class="table__row">
      <TableCell
          v-for="(data, index) in singleRowData"
          v-bind:tableCell="data"
          v-bind:key="index"
          v-bind:dataToHide="dataToHide"
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
    dataToHide: {
      type: Array,
    },
    checkRouter: {
      type: [Number, Boolean],
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
      this.renderReadyData();
      this.getCellIndex();
      return this.processedTableRowData;
    },
    renderReadyData() {
      return this.processedTableRowData.filter(data => !this.dataToHide.includes(data));
    },
    getCellIndex() {
      this.cellToLink = this.processedTableRowData[this.checkRouter];
    },
  },
  computed: {
    singleRowData() {
      this.generateDataFromObject();
      return this.renderReadyData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

</style>
