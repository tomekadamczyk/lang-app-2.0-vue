<template>
    <div v-if="$apollo.loading">Loading...</div>
    <div class="word" v-else>
        <h1 class="word__name">
          <strong>{{ wordFromDatabase.value }}</strong>
           - {{ wordFromDatabase.translation }}
        </h1>
        <div
          class="word-tables"
          v-if="wordFromDatabase.PartofspeechId === 1"
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
          class="word-tables"
          v-if="wordFromDatabase.PartofspeechId === 2"
        >
          <VerbTable
            v-for="(item, index) in time"
            v-bind:key="index"
            v-bind:time="item"
            v-bind:selectedCard="JSON.parse(wordFromDatabase.wordSpecific)"
          />
        </div>
        <div
          class="word-tables"
          v-if="wordFromDatabase.PartofspeechId === 3"
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
    Word: {
      query: gql`
        query Word($id: Int!) {
        Word(id: $id) {
          id,
          value,
          translation,
          PartofspeechId
          wordSpecific
        }
      }`,
      variables() {
        return {
          id: this.wordId,
        };
      },
    },
    allGrammaticalCases: gql`
      query allGrammaticalCases {
      allGrammaticalCases {
        value
      }
    }`,
    allPartOfSpeeches: gql`
      query allPartOfSpeeches {
      allPartOfSpeeches {
        id,
        value
      }
    }`,
  },
  methods: {
    generateWord() {
      return this.Word;
    },
    generateWordData() {
      Object.keys(this.allGrammaticalCases).forEach((caseData) => {
        this.grammaticalCasesArray.push(this.allGrammaticalCases[caseData].value);
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

  .word-tables {
    width: 100%;
    display: flex;
    flex-direction: column;

    @include media-screen(phone-wide-up) {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .table {
      box-shadow: none;
    }

    .table-container {
      width: 100%;
      margin-bottom: 2.5rem;
      display: inline-block;
      vertical-align: top;
      border-radius: $border-radius;
      
      @include media-screen(phone-wide-up) {
        width: auto;
      }
        
      &:not(:last-child) {
        @include media-screen(phone-wide-up) {
          margin-right: 1rem;
        }

        @include media-screen(tablet-up) {
          margin-right: 6.25rem;
        }
      }
    }
  }

  .word__name {

    strong {
      text-transform: capitalize;
    }
  }
</style>
