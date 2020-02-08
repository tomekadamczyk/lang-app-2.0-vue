<template>
<tr class="table__row">
    <TableCell
        v-for="(data, index) in wordData"
        v-bind:value="data.output"
        v-bind:class="data.className"
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
    value: {
      type: String,
    },
    translation: {
      type: String,
    },
    lp: {
      type: Number,
    },
  },
  data() {
    return {
      wordData: [
        { output: this.lp, className: 'table__lp' },
        { output: this.value, className: 'table__content' },
        { output: this.translation, className: 'table__content' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";


        .table__content {
            font-weight: bold;
        }

</style>
