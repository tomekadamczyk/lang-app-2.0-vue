<template>
    <VTable
        v-bind:tableDataArray="preparedData"
        v-bind:dataToHide="propsToHide"
        v-bind:checkRouter="checkRouter"
        class="table"
    />
</template>

<script>
import VTable from '../../UI/Table/VTable.vue';

export default {
  name: 'WordView',
  components: {
    VTable,
  },
  props: {
    counting: {
      type: String,
    },
    selectedCard: {
      type: Object,
    },
    grammaticalCasesArray: {
      type: Array,
    },
  },
  data() {
    return {
      propsToHide: [],
      checkRouter: false,
      preparedData: [],
    };
  },
  methods: {
    createWordCases(counting) {
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(this.selectedCard).forEach((item) => {
        Object.keys(this.selectedCard[item]).forEach((key) => {
          if (this.grammaticalCasesArray.includes(key) && item === counting) {
            newDictionaryObjects[item] = {
              case: key,
              value: this.selectedCard[item][key],
            };
            arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
          }
        });
      });
      this.preparedData = arrayOfDictionaryObjects;
      return this.preparedData;
    },
  },
  created() {
    this.createWordCases(this.counting);
  },
};
</script>

<style lang="sass" scoped>

</style>
