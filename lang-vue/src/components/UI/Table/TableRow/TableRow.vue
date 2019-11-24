<template>
<tr class="table__row">
    <TableCell 
        v-bind:value="lp"
        class="table__lp"
    />
    <TableCell 
        v-bind:value="value"
        class="table__content"
    />
    <TableCell 
        v-bind:value="translation"
        class="table__content"
    />
</tr>
</template>

<script>
import TableCell from './TableCell/TableCell.vue';

export default {
    name: 'TableRow',
    components: {
        TableCell
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
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";


        .table__content {
            font-weight: bold;
        }

</style>