<template>
    <div>
        <div class="word__name">{{ wordName }}</div>
        <VTable
            v-bind:tableDataArray="wordPageData"
            v-bind:dataToHide="propsToHide"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import VTable from '../UI/Table/VTable.vue';
import store from '../../store';

export default {
  name: 'WordView',
  components: {
    VTable,
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
        if (this.grammaticalCasesArray.includes(key)) {
          this.wordTable.push(this.selectedCard[key]);
        }
      });
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
    this.concatDataToHide();
  },
  computed: {
    grammaticalCases() {
      return this.$store.state.grammaticalCases;
    },
    wordPageData() {
      return this.$store.state.wordPageData;
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
