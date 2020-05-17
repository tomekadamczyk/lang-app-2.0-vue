<template>
  <div class="table">
      <h3 class="table__heading">{{counting}}</h3>
    <VTable
        v-bind:tableDataArray="preparedData"
        v-bind:dataToHide="propsToHide"
        v-bind:checkRouter="checkRouter"
        class="table"
    />
  </div>
</template>

<script>
import VTable from '../../UI/Table/VTable.vue';

export default {
  name: 'NounTable',
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
        // eslint-disable-next-line no-restricted-globals
        if (item === counting) {
          const singularGrammarCasesObject = this.selectedCard[counting];

          if (singularGrammarCasesObject !== undefined) {
            Object.keys(singularGrammarCasesObject).forEach((caseName) => {
              if (this.grammaticalCasesArray.includes(caseName)) {
                newDictionaryObjects[item] = {
                  case: caseName,
                  value: singularGrammarCasesObject[caseName],
                };
                arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
              }
            });
          }
        }
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

<style lang="scss" scoped>


  .table__heading {
    text-transform: capitalize;
  }
</style>
