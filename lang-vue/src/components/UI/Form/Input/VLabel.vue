<template>
    <label
      class="v-label"
      v-bind:for="labelFor"
    >
        <slot></slot>
    </label>
</template>

<script>

export default {
  name: 'VLabel',
  props: {
    labelFor: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>

    label {
      display: block;
      font-size: 12px;
      margin-bottom: 5px;
      color: #aaa;
      font-weight: bold;
    }

</style>
