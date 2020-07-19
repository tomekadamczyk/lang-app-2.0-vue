<template>
    <button
        class="btn"
        v-on:click="$emit('clickButton')"
    >{{value}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonName: {
      type: String,
    },
  },
  data() {
    return {
      value: this.buttonName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

    .btn {
        padding: 4px 7px;
        background: $primary;
        color: $white;
        border-color: transparent;
        cursor: pointer;
        transition: background .3s;

        &:hover {
            background: darken($primary, 15%);
        }

        &--outline {
            background: $white;
            color: $black;
        }
    }
</style>
