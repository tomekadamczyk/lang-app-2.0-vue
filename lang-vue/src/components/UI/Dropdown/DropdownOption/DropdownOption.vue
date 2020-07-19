<template>
    <div
      v-bind:id="id"
      v-bind:value="value"
      v-on:click="changeValue"
    >
      {{val}}
    </div>
</template>

<script>
export default {
    name: 'DropdownOption',
    props: {
        id: {
            type: Number,
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
    methods: {
        changeValue() {
            this.$emit('selectChange', {
              id: Number(this.id),
              value: this.value
            });
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
