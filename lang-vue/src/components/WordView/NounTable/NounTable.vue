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
        Object.keys(this.selectedCard[item]).forEach((key) => {
          const checkNumber = Number(key);

          // eslint-disable-next-line no-restricted-globals
          if (isNaN(checkNumber) && key === counting) {
            const singularGrammarCasesObject = this.selectedCard[item][counting];

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
