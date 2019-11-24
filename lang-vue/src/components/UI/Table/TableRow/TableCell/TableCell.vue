<template>
    <td class="table__cell">{{value}}</td>
</template>

<script>
export default {
    name: 'TableCell',
    props: {
        value: {
            type: [String, Number],
        },
    },
}
</script>

<style lang="scss">
@import "../../../../../assets/scss/style.scss";

</style>