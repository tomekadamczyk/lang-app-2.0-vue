<template>
    <div>
        <Dropdown
            v-on:selectChange="selectChanges"
        />
        <VTable
            v-bind:tableDataArray="dictionary"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import VTable from '../UI/Table/VTable.vue';
import Dropdown from '../UI/Dropdown/Dropdown.vue';
import store from '../../store';

export default {
  name: 'Dictionary',
  components: {
    VTable,
    Dropdown,
  },
  methods: {
    onUpdateDictionary(langName) {
      this.$store.dispatch('updateDictionary', langName);
    },
    selectChanges($event) {
      store.state.dictionary = [];
      store.state.defaultLanguage = $event;
      this.onUpdateDictionary(store.state.defaultLanguage);
    },
    generateData() {
      const dictionary = { ...store.state.dictionary };
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(dictionary).forEach((item) => {
        newDictionaryObjects[item] = {
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
  data() {
    return {
      sharedState: store.state,
      checkRouter: 1,
      preparedData: [],
    };
  },
  computed: {
    dictionary() {
      return this.generateData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>
