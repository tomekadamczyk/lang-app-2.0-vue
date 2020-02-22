<template>
  <tr class="table__row">
      <TableCell
          v-for="(data, index) in singleRowData"
          v-bind:tableCell="data"
          v-bind:key="index"
          v-bind:dataToHide="dataToHide"
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
      this.renderReadyData();
      return this.processedTableRowData;
    },
    renderReadyData() {
      return this.processedTableRowData.filter(data => !this.dataToHide.includes(data));
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
