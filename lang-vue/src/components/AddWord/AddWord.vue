<template>
  <div>
    Add new word
    <button @click="addWord">Add</button>
    <div class="addcontainer">
      <div class="form-input-group">
      <label for="part-of-speech">Choose part of speech</label>
        <select
          id="part-of-speech"
          v-model="partofspeechId">
          <option
            v-for="(partOfSpeech, index) in allPartsOfSpeech"
            v-bind:key="index"
            v-bind:value="partOfSpeech.id"
          >
            {{ partOfSpeech.value }}
          </option>
        </select>
      </div>
      <form class="add-word-form">
        <div class="add-form-column">
          <div class="form-input-group">
            <label for="new-word">Type new word</label>
            <input
              id="new-word"
              v-model="newWord"
            />
          </div>
          <div class="form-input-group">
            <label for="new-word-translation">Type translation</label>
            <input
              id="new-word-translation"
              v-model="translation"
            />
          </div>
        </div>
        <div class="add-form-column">
            <div v-if="partofspeechId === 1" class="times">
              <div class="inputs-heading">L.p</div>
              <div class="inputs-set">
                <div
                  v-for="(value, index) in grammaticalCases"
                  v-bind:key="index"
                  class="form-input-group"
                >
                  <label for="nominative">{{ value.value }}</label>
                  <input
                    id="nominative"
                    v-model="nounCases.lp[value.value]"
                  />
                </div>
              </div>
              <div class="inputs-heading">L.m</div>
              <div class="inputs-set">
                <div
                  v-for="(value, index) in grammaticalCases"
                  v-bind:key="index"
                  class="form-input-group"
                >
                  <label for="nominative">{{ value.value }}</label>
                  <input
                    id="nominative"
                    v-model="nounCases.lm[value.value]"
                  />
                </div>
              </div>
            </div>
            <div v-if="partofspeechId === 2" class="times">
              <div class="inputs-heading">Present</div>
              <div class="inputs-set">
                <div
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  class="form-input-group"
                >
                  <label for="nominative">{{ replacePersonTimeLabel(value.value) }}</label>
                  <input
                    id="nominative"
                    v-model="verbPerson.present[value.value]"
                  />
                </div>
              </div>
              <div class="inputs-heading">Past</div>
              <div class="inputs-set">
                <div
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  class="form-input-group"
                >
                  <label for="nominative">{{ replacePersonTimeLabel(value.value) }}</label>
                  <input
                    id="nominative"
                    v-model="verbPerson.past[value.value]"
                  />
                </div>
              </div>
              <div class="inputs-heading">Future</div>
              <div class="inputs-set">
                <div
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  class="form-input-group"
                >
                  <label for="nominative">{{ replacePersonTimeLabel(value.value) }}</label>
                  <input
                    id="nominative"
                    v-model="verbPerson.future[value.value]"
                  />
                </div>
              </div>
            </div>
          <div v-if="partofspeechId === 3">
            adjective
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Add',
  apollo: {
    allPartsOfSpeech: gql`
      query allPartsOfSpeech {
      allPartsOfSpeech {
        id,
        value
      }
    }`,
    grammaticalCases: gql`
      query getGrammaticalCases {
      grammaticalCases {
        value
      }
    }`,
    allTimePersons: gql`
      query allTimePersons {
      allTimePersons {
        value
      }
    }`,
  },
  data() {
    return {
      newWord: '',
      translation: '',
      wordSpecific: '',
      partofspeechId: '',
      nounCases: {
        lp: {
          nominative: '',
          genitive: '',
          accusative: '',
          dative: '',
          locative: '',
          instrumental: '',
          vocative: '',
        },
        lm: {
          nominative: '',
          genitive: '',
          accusative: '',
          dative: '',
          locative: '',
          instrumental: '',
          vocative: '',
        },
      },
      verbPerson: {
        present: {
          i: '',
          youSingular: '',
          he: '',
          we: '',
          youPlural: '',
          they: '',
        },
        past: {
          i: '',
          youSingular: '',
          he: '',
          we: '',
          youPlural: '',
          they: '',
        },
        future: {
          i: '',
          youSingular: '',
          he: '',
          we: '',
          youPlural: '',
          they: '',
        },
      },
    };
  },
  methods: {
    addWord() {
      this.wordSpecific = this.nounCases;
      this.$apollo.mutate({
        mutation: gql`
          mutation addWord ($value: String!, $translation: String!, $wordSpecific: JSON, $partofspeechId: Int!) {
            addWord (value: $value, translation: $translation, wordSpecific: $wordSpecific, partofspeechId: $partofspeechId) {
              value,
              translation,
              wordSpecific,
              partofspeechId {
                id
              }
            }
          },
        `,
        variables: {
          value: this.newWord,
          translation: this.translation,
          wordSpecific: this.wordSpecific,
          partofspeechId: this.partofspeechId,
        },
      });
    },
    replacePersonTimeLabel(label) {
      switch (label) {
        case 'singularFirst':
          // eslint-disable-next-line no-param-reassign
          label = 'I';
          break;

        case 'singularSecond':
          // eslint-disable-next-line no-param-reassign
          label = 'You';
          break;

        case 'singularThird':
          // eslint-disable-next-line no-param-reassign
          label = 'He/She/It';
          break;

        case 'pluralFirst':
          // eslint-disable-next-line no-param-reassign
          label = 'We';
          break;

        case 'pluralSecond':
          // eslint-disable-next-line no-param-reassign
          label = 'You';
          break;

        case 'pluralThird':
          // eslint-disable-next-line no-param-reassign
          label = 'They';
          break;

        default:
          return null;
      }
      return label;
    },
  },
};
</script>

<style lang="scss" scoped>
  .addcontainer {
    padding: 50px 0;
    background: #f9f9f9;
    margin: 30px 0;
  }

  .add-word-form {
    display: flex;

    &__column {

    }
  }

  .add-form-column {

    &:first-of-type {
      max-width: 200px;
      flex: 0 0 200px;
    }

    &:nth-of-type(2) {
      max-width: calc(100% - 200px);
      flex: 0 0 calc(100% - 200px);
    }

    .times {
      display: flex;
      flex-direction: column;
    }
  }

  .form-input-group {
    margin-bottom: 15px;
    margin-right: 10px;

    label {
      display: block;
      font-size: 12px;
      margin-bottom: 5px;
      color: #aaa;
      font-weight: bold;
    }

    input {
      border: 1px solid #ccc;
      padding: 5px;
    }
  }

  .inputs-set {
    display: flex;
    justify-content: start;
    width: 100%;
    flex-wrap: wrap;
  }

  .inputs-heading {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }
</style>
