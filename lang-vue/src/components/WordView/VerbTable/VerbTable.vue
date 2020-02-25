<template>
    <VTable
        v-bind:tableDataArray="preparedData"
        v-bind:checkRouter="checkRouter"
        class="table"
    />
</template>

<script>
import VTable from '../../UI/Table/VTable.vue';

export default {
  name: 'VerbTable',
  components: {
    VTable,
  },
  props: {
    selectedCard: {
      type: Object,
    },
    time: {
      type: String,
    },
  },
  data() {
    return {
      checkRouter: false,
      preparedData: [],
    };
  },
  methods: {
    createWordCases(time) {
      const arrayOfDictionaryObjects = [];
      const newDictionaryObjects = {};
      Object.keys(this.selectedCard).forEach((item) => {
        Object.keys(this.selectedCard[item]).forEach((key) => {
          if (key === time) {
            Object.keys(this.selectedCard[item][key]).forEach((verbTime) => {
              newDictionaryObjects[item] = {
                person: verbTime,
                value: this.selectedCard[item][key][verbTime],
              };
              if (newDictionaryObjects[item].person === 'youSingular') {
                newDictionaryObjects[item].person = 'You';
              }
              if (newDictionaryObjects[item].person === 'youPlural') {
                newDictionaryObjects[item].person = 'You';
              }
              arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
            });
          }
        });
      });
      this.preparedData = arrayOfDictionaryObjects;
      return this.preparedData;
    },
  },
  created() {
    this.createWordCases(this.time);
  },
};
</script>

<style lang="sass" scoped>

</style>
