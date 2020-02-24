<template>
    <div style="width: 400px;">
        <div class="word__name"><strong>{{ wordName }}</strong> - {{ wordTranslation }}</div>
        <VTable
            v-bind:tableDataArray="preparedData"
            v-bind:dataToHide="propsToHide"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import VTable from '../../UI/Table/VTable.vue';
import store from '../../../store';

export default {
  name: 'WordView',
  components: {
    VTable,
  },
  props: {
    counting: {
      type: String,
    },
  },
  data() {
    return {
      sharedState: store.state,
      propsToHide: [],
      checkRouter: false,
      wordId: null,
      wordTable: [],
      selectedCard: {},
      wordName: '',
      wordTranslation: '',
      preparedData: [],
      grammaticalCasesArray: [],
    };
  },
  methods: {
    getWordId() {
      this.wordId = this.$route.params.wordId;
    },
    concatDataToHide() {
      store.state.partsOfSpeech.forEach((_, index) => {
        this.propsToHide.push(index + 1);
      });
    },
    generateWordData() {
      Object.keys(this.grammaticalCases).forEach((caseData) => {
        this.grammaticalCasesArray.push(this.grammaticalCases[caseData].value);
      });
      Object.keys(this.selectedCard).forEach((key) => {
        if (key === 'value') {
          this.wordName = this.selectedCard[key];
        }
        if (key === 'translation') {
          this.wordTranslation = this.selectedCard[key];
        }
        if (this.grammaticalCasesArray.includes(key)) {
          this.wordTable.push(this.selectedCard[key]);
        }
      });
    },
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
    this.getWordId();
    store.state.languages[0].cards.forEach((card) => {
      Object.keys(card).forEach((cardData) => {
        if (card[cardData] === Number(this.wordId)) {
          this.selectedCard = card;
        }
      });
    });
    this.generateWordData();
    this.createWordCases(this.counting);
    this.concatDataToHide();
  },
  computed: {
    grammaticalCases() {
      return this.$store.state.grammaticalCases;
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
