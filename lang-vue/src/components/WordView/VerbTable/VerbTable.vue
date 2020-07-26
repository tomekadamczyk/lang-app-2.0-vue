<template>
  <div class="table-container">
      <h3 class="table__heading">{{time}}</h3>
      <VTable
          v-bind:tableDataArray="preparedData"
          v-bind:checkRouter="checkRouter"
      />
  </div>
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
      Object.keys(this.selectedCard).forEach((key) => {
        if (key === time) {
          Object.keys(this.selectedCard[key]).forEach((verbTime) => {
            newDictionaryObjects[key] = {
              person: verbTime,
              value: this.selectedCard[key][verbTime],
            };
            if (newDictionaryObjects[key].person === 'singularFirst') {
              newDictionaryObjects[key].person = 'I';
            }
            if (newDictionaryObjects[key].person === 'singularSecond') {
              newDictionaryObjects[key].person = 'You';
            }
            if (newDictionaryObjects[key].person === 'singularThird') {
              newDictionaryObjects[key].person = 'He/She/It';
            }
            if (newDictionaryObjects[key].person === 'pluralFirst') {
              newDictionaryObjects[key].person = 'We';
            }
            if (newDictionaryObjects[key].person === 'pluralSecond') {
              newDictionaryObjects[key].person = 'You';
            }
            if (newDictionaryObjects[key].person === 'pluralThird') {
              newDictionaryObjects[key].person = 'They';
            }
            arrayOfDictionaryObjects.push(newDictionaryObjects[key]);
          });
        }
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

<style lang="scss" scoped>

  .table__heading {
    text-transform: capitalize;
  }

</style>
