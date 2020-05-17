<template>
    <div v-if="$apollo.loading">Loading...</div>
    <div class="word" v-else>
        <h1 class="word__name">
          <strong>{{ wordFromDatabase.value }}</strong>
           - {{ wordFromDatabase.translation }}
        </h1>
        <div
          class="tables"
          v-if="wordFromDatabase.partofspeechId.id === 1"
        >
          <NounTable
            v-for="(count, index) in counting"
            v-bind:key="index"
            v-bind:counting="count"
            v-bind:selectedCard="JSON.parse(wordFromDatabase.wordSpecific)"
            v-bind:grammaticalCasesArray="grammaticalCasesArray"
          />
        </div>
        <div
          class="tables"
          v-if="wordFromDatabase.partofspeechId.id === 2"
        >
          <VerbTable
            v-for="(item, index) in time"
            v-bind:key="index"
            v-bind:time="item"
            v-bind:selectedCard="JSON.parse(wordFromDatabase.wordSpecific)"
          />
        </div>
        <div
          class="tables"
          v-if="wordFromDatabase.partofspeechId.id === 3"
        >
          <AdjectiveTable
            v-for="(count, index) in counting"
            v-bind:key="index"
            v-bind:counting="count"
            v-bind:selectedCard="JSON.parse(wordFromDatabase.wordSpecific)"
            v-bind:grammaticalCasesArray="grammaticalCasesArray"
          />
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import NounTable from './NounTable/NounTable.vue';
import VerbTable from './VerbTable/VerbTable.vue';
import AdjectiveTable from './AdjectiveTable/AdjectiveTable.vue';
import store from '../../store';

export default {
  name: 'WordView',
  components: {
    NounTable,
    VerbTable,
    AdjectiveTable,
  },
  data() {
    return {
      counting: {
        singular: 'lp',
        plural: 'lm',
      },
      wordId: null,
      partOfSpeech: null,
      grammaticalCasesArray: [],
      sharedState: store.state,
      time: {
        present: 'present',
        past: 'past',
        future: 'future',
      },
    };
  },
  apollo: {
    word: {
      query: gql`
        query word($id: Int!) {
        word(id: $id) {
          id,
          value,
          translation,
          partofspeechId {
            id
          },
          wordSpecific
        }
      }`,
      variables() {
        return {
          id: this.wordId,
        };
      },
    },
    grammaticalCases: gql`
      query getGrammaticalCases {
      grammaticalCases {
        value
      }
    }`,
    allPartsOfSpeech: gql`
      query allPartsOfSpeech {
      allPartsOfSpeech {
        id,
        value
      }
    }`,
  },
  methods: {
    generateWord() {
      return this.word;
    },
    generateWordData() {
      Object.keys(this.grammaticalCases).forEach((caseData) => {
        this.grammaticalCasesArray.push(this.grammaticalCases[caseData].value);
      });
    },
  },
  computed: {
    wordFromDatabase() {
      this.generateWordData();
      return this.generateWord();
    },
  },
  beforeMount() {
    this.wordId = Number(this.$route.params.wordId);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

  .tables {
    width: 100%;

    .table {
      width: auto;
      display: inline-block;
      margin-right: 100px;
      vertical-align: top;
      border: 1px solid $primary;
      border-radius: 10px;
      padding: 10px 27px;
      box-shadow: 3px 3px 24px 1px $gray-light-2;
    }
  }

  .word__name {

    strong {
      text-transform: capitalize;
    }
  }
</style>
