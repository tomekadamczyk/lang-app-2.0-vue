<template>
    <div>
        <div class="word__name"><strong>{{ wordName }}</strong> - {{ wordTranslation }}</div>
        <NounTable
          v-bind:counting="singular"
          v-bind:selectedCard="selectedCard"
          v-bind:grammaticalCasesArray="grammaticalCasesArray"
        />
        <NounTable
          v-bind:counting="plural"
          v-bind:selectedCard="selectedCard"
          v-bind:grammaticalCasesArray="grammaticalCasesArray"
        />
    </div>
</template>

<script>
import NounTable from './NounTable/NounTable.vue';
import store from '../../store';

export default {
  name: 'WordView',
  components: {
    NounTable,
  },
  data() {
    return {
      singular: 'lp',
      plural: 'lm',
      selectedCard: {},
      wordName: '',
      wordTranslation: '',
      wordId: null,
      grammaticalCasesArray: [],
      sharedState: store.state,
    };
  },
  methods: {
    getWordId() {
      this.wordId = this.$route.params.wordId;
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
