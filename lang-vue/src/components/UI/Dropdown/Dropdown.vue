<template>
    <div>
        <select 
            v-model="selected"
            v-on:change="changeValue"
            class="select"
        >
            <Option 
                v-for="(option, index) in options"
                v-bind:key="index" 
                v-bind:value="option.value"
            >{{option.name}}</Option>
        </select>
        <span>Selected: {{ selected }}</span>
    </div>
</template>

<script>
import DropdownOption from './DropdownOption/DropdownOption.vue';

export default {
    name: 'Dropdown',
    components: {
        DropdownOption,
    },
    data() {
        return {
            selected: 'czech',
            options: [
                { id: 0, name: 'Czech', value: 'czech' },
                { id: 1, name: 'English', value: 'english' },
                { id: 2, name: 'German', value: 'german' },
                { id: 3, name: 'Italian', value: 'italian' },
            ],
        };
    },
    methods: {
        changeValue() {
            this.$emit('selectChange', this.selected)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

    .select {
        margin-top: 10px;
        border: 1px solid $primary;
        padding: 3px 7px;

        option {
            color: $primary;
        }
    }
</style>
