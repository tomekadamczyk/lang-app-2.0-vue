<template>
    <option value="val"></option>
</template>

<script>
export default {
    name: 'DropdownOption',
    props: {
        name: {
            type: String,
        },
        value: {
            type: String,
        },
    },
    data() {
        return {
            option: this.name,
            val: this.value,
        };
    },
}
</script>

<style lang="scss" scoped>

</style>
