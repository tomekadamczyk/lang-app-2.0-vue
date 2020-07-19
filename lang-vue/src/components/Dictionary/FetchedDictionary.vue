<template>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
        <VTable
            v-bind:tableDataArray="allWords"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import gql from 'graphql-tag';
import VTable from '../UI/Table/VTable.vue';
import store from '../../store';

export default {
  name: 'FechedDictionary',
  components: {
    VTable,
  },
  props: {
    languageVarId: {
        type: Number,
    },
  },
  data() {
    return {
      sharedState: store.state,
      checkRouter: 1,
      preparedData: [],
    };
  },
  apollo: {
    allWords: {
      query: gql`
        query allWords($langId: Int!) {
        allWords(LanguageId: $langId) {
          id
          value
          translation
        }
      }`,
      variables() {
        return {
          langId: this.languageVarId,
        };
      },
    },
  },
  methods: {
    generateData() {
      const dictionary = { ...this.allWords };
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(dictionary).forEach((item) => {
        newDictionaryObjects[item] = {
          id: dictionary[item].id,
          value: dictionary[item].value,
          translation: dictionary[item].translation,
        };
        arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
        console.log(newDictionaryObjects[item]);
      });
      this.preparedData = arrayOfDictionaryObjects;
      return this.preparedData;
    },
  },
  created() {
    this.generateData();
  },
};
</script>

<style lang="scss" scoped>

</style>
