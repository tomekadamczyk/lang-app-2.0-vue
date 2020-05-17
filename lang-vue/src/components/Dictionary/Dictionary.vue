<template>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
        <Dropdown
            v-on:selectChange="selectChanges"
            :items="allLanguages"
        />
        <VTable
            v-bind:tableDataArray="dictionary"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import gql from 'graphql-tag';
import VTable from '../UI/Table/VTable.vue';
import Dropdown from '../UI/Dropdown/Dropdown.vue';
import store from '../../store';

export default {
  name: 'Dictionary',
  components: {
    VTable,
    Dropdown,
  },
  data() {
    return {
      languageId: 2,
      sharedState: store.state,
      checkRouter: 1,
      preparedData: [],
    };
  },
  apollo: {
    allLanguages: gql`
      query allLanguages {
      allLanguages {
        id,
        value,
        slug
      }
    }`,
    words: {
      query: gql`
        query words($langId: Int!) {
        words(languageId: $langId) {
          id,
          value,
          translation,
          wordSpecific
        }
      }`,
      variables() {
        return {
          langId: this.languageId,
        };
      },
    },
  },
  methods: {
    onUpdateDictionary(langName) {
      this.$store.dispatch('updateDictionary', langName);
    },
    selectChanges($event) {
      this.languageId = $event;
    },
    generateData() {
      const dictionary = { ...this.words };
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(dictionary).forEach((item) => {
        newDictionaryObjects[item] = {
          id: dictionary[item].id,
          value: dictionary[item].value,
          translation: dictionary[item].translation,
        };
        arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
      });
      this.preparedData = arrayOfDictionaryObjects;
      return this.preparedData;
    },
  },
  created() {
    store.state.dictionary = [];
    store.state.defaultLanguage = store.state.languages[0].name;
    this.onUpdateDictionary(store.state.defaultLanguage);
  },
  computed: {
    dictionary() {
      return this.generateData();
    },
    getWords() {
      return this.allWords;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>
