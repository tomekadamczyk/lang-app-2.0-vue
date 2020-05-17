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
  name: 'AdjectiveTable',
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
      checkRouter: false,
      preparedData: [],
    };
  },
  methods: {
    createWordCases(counting) {
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(this.selectedCard).forEach((item) => {
        if (typeof this.selectedCard[item] === 'object') {
          Object.keys(this.selectedCard[item]).forEach((key) => {
            if (item === counting) {
              const singularGrammarCasesObject = this.selectedCard[item][key];
              Object.keys(singularGrammarCasesObject).forEach((caseName) => {
                newDictionaryObjects[item] = {
                  case: caseName,
                  masculine: singularGrammarCasesObject.masculine,
                  feminine: singularGrammarCasesObject.feminine,
                  neuter: singularGrammarCasesObject.neuter,
                };
                arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
              });
            }
          });
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

<style lang="sass" scoped>

</style>
