<template>
    <router-link
      v-if="routeIndex !== undefined"
      :to="`/dictionary/${routeIndex}`"
      class="table__row"
    >
      <tr>
        <TableCell
            v-for="(data, index) in singleRowData"
            v-bind:tableCell="data"
            v-bind:key="index"
            v-bind:routeIndex="routeIndex"
            v-bind:checkRouter="checkRouter"
            v-bind:cellToLink="cellToLink"
        />
      </tr>
    </router-link>
    <tr v-else class="table__row">
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
      link: `/dictionary/${this.routeIndex}`,
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
      return this.processedTableRowData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

  a {
    text-decoration: none;
  }
</style>
