<template>
    <div>
        <div class="select__selected-value">Chosen language: <span>{{ selected }}</span></div>
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
    </div>
</template>

<script>

export default {
  name: 'Dropdown',
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
      this.$emit('selectChange', this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

    .select {
        margin-top: 10px;
        border: 1px solid $primary;
        padding: 3px 7px;

        &__selected-value {

            span {
                text-transform: capitalize;
                font-weight: bold;
            }
        }

        option {
            color: $primary;
        }
    }
</style>
