<template>
    <div class="form-input-group">
        <VLabel v-bind:labelFor="id">
            <slot></slot>
        </VLabel>
        <VInput v-bind:id="id" v-bind:model="vModel" v-on:input="vModel = $event" />
    </div>
</template>

<script>
import VInput from './VInput.vue';
import VLabel from './VLabel.vue';

export default {
  name: 'InputGroup',
  components: {
    VLabel,
    VInput,
  },
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

  .form-input-group {
    margin-bottom: 15px;
    margin-right: 10px;
  }

</style>
