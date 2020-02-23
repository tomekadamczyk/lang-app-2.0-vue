<template>
  <td v-if="checkRouter !== false"
    :class="[typeof cellValue === 'number' ? 'table__id' : 'table__content']"
  >
    <span>
      <router-link v-if="typeof tableCell === 'string' && cellValue === cellToLink" :to="cellValue">
        {{cellValue}}
      </router-link>
      <span v-else>
        {{cellValue}}
      </span>
    </span>
  </td>
  <td
    v-else
    :class="[typeof cellValue === 'number' ? 'table__id' : 'table__content']"
  >
    {{cellValue}}
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

  .table__id {
    width: 30px;
  }

  .table__content {
    width: 120px;
    font-weight: bold;

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
