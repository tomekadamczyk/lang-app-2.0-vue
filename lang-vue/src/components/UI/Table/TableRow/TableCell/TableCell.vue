<template>
  <td :class="[typeof cellValue === 'number' ? 'table__id' : 'table__content']">{{cellValue}}</td>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    tableCell: {
      type: [String, Number],
    },
    className: {
      type: String,
    },
  },
  computed: {
    cellValue() {
      return this.tableCell;
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../assets/scss/style.scss";

</style>
