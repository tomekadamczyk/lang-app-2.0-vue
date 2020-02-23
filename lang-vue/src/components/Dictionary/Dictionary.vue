<template>
    <div>
        <Dropdown
            v-on:selectChange="selectChanges"
        />
        <VTable
            v-bind:tableDataArray="dictionary"
            v-bind:dataToHide="propsToHide"
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
    concatDataToHide() {
      store.state.grammaticalCases.forEach((caseName) => {
        this.propsToHide.push(caseName.value);
      });
      store.state.partsOfSpeech.forEach((partName) => {
        this.propsToHide.push(partName.value);
      });
      store.state.grammaticalCases.forEach((caseName) => {
        store.state.dictionary.forEach((row) => {
          delete row[caseName.value];
        });
      });
    },
  },
  created() {
    store.state.dictionary = [];
    store.state.defaultLanguage = store.state.languages[0].name;
    this.onUpdateDictionary(store.state.defaultLanguage);
    this.concatDataToHide();
  },
  data() {
    return {
      sharedState: store.state,
      propsToHide: [],
      checkRouter: 1,
    };
  },
  computed: {
    dictionary() {
      return this.$store.state.dictionary;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>
