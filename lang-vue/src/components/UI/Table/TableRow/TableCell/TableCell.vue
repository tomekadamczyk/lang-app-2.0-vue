<template>
  <td
    v-if="tableCell != '__typename'"
    :class="[typeof tableCell === 'number' ? 'table__id' : 'table__content']"
  >
    {{tableCell}}
  </td>
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
    checkRouter: {
      type: [Number, Boolean],
    },
    cellToLink: {
      type: [String, Number],
    },
    routeIndex: {
      type: Number,
    },
    index: {
      type: Number,
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../assets/scss/style.scss";

  .table__id {
    width: 1.875rem;
  }

  .table__content {
    width: 7.5rem;
    &:first-of-type {
      font-weight: bold;
    }

    span {
      display: block;
      width: 100%;

      a {
        display: block;
        width: 100%;
      }
    }
  }

</style>
