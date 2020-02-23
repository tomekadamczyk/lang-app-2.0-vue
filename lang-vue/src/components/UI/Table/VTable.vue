<template>
    <table class="table">
      <TableRow
        v-for="(item, index) in tableDataArray"
        v-bind:key="index"
        v-bind:routeIndex="index"
        v-bind:tableRow="item"
        v-bind:index="index + 1"
        v-bind:checkRouter="checkRouter"
      />
    </table>
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
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

    .table {
        width: 100%;
        margin: 30px auto 0;
        border-collapse: collapse;

        &__row {
            border-bottom: 1px solid $gray-light-1;
            line-height: 2;
            color: $gray;

            &:hover {
                background: $gray-light-1;
                color: $black;
            }
        }

        &__cell {
            border: 1px solid $gray;
        }
    }

</style>
