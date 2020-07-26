<template>
  <div class="table-outer">
    <table class="table">
      <TableRow
        v-for="(item, index) in tableDataArray"
        v-bind:key="index"
        v-bind:routeIndex="item.id"
        v-bind:tableRow="removeRouteIndexFromSourceArray(item)"
        v-bind:index="index + 1"
        v-bind:checkRouter="checkRouter"
      />
    </table>
  </div>
</template>

<script>
import TableRow from './TableRow/TableRow.vue';

export default {
  name: 'VTable',
  components: {
    TableRow,
  },
  props: {
    tableDataArray: {
      type: Array,
    },
    checkRouter: {
      type: [Number, Boolean],
    },
  },
  methods: {
    removeRouteIndexFromSourceArray(obj) {
      delete obj['__typename'];
      return obj;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

  .table-outer {
    border-radius: .625rem;
    margin: 30px auto 0;
    overflow: hidden;
    box-shadow: $box-shadow;
    width: 100%;

    .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;

        &__row {
            line-height: 2;
            color: var(--text-color);
            width: 100%;
            display: block;
            padding: 0.3rem 0.635rem;
            background: var(--table-row-bg);

            &:hover {
                background: $primary;
            }

            &:not(:last-of-type) {
              border-bottom: 1px solid $gray-light-1;
            }
        }

        &__cell {
            border: 1px solid $gray;
        }
    }
  }

</style>
