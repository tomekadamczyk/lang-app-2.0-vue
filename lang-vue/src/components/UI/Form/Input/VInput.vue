<template>
    <input
      v-bind:id="id"
      v-bind:name="name"
      v-model="vModel"
    />
</template>

<script>

export default {
  name: 'VInput',
  props: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    model: {
      type: String,
    },
  },
  computed: {
    vModel: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

    input {
      border: 1px solid #ccc;
      padding: 10px 15px;
      box-shadow: $box-shadow;
      border-radius: 5px;
      background: #fff;
      color: #666;
      width: 100%;
    }

</style>
