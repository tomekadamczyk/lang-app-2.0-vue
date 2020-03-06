<template>
    <input
      v-bind:id="id"
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

    input {
      border: 1px solid #ccc;
      padding: 10px 15px;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08);
      border-radius: 5px;
      background: #fafafa;
      color: #666;
      width: 100%;

        @media only screen and (min-width: 768px) {
            width: auto;
        }
    }

</style>
