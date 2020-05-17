<template>
    <div>
        <div class="select__selected-value">Chosen language: <span>{{ selected }}</span></div>
        <select
            v-model="itemId"
            v-on:change="changeValue"
            class="select"
        >
            <Option
                v-for="(option, index) in items"
                v-bind:key="index"
                v-bind:value="option.id"
            >{{option.value}}</Option>
        </select>
    </div>
</template>

<script>

export default {
  name: 'Dropdown',
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      selected: 'czech',
      itemId: 2,
    };
  },
  methods: {
    changeValue() {
      this.$emit('selectChange', Number(this.itemId));
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
