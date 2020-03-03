<template>
  <div>
    Add new word
    <button @click="addWord">Add</button>
    <div class="addcontainer">
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
      <form class="add-word-form">
        <div class="add-form-column">
          <label for="new-word">Type new word</label>
          <input
          id="new-word"
          v-model="newWord" />

          <label for="new-word-translation">Type translation</label>
          <input
          id="new-word-translation"
          v-model="translation" />
        </div>
        <div class="add-form-column">
          <div v-if="partofspeechId === 1" class="times">
            <div>
              <div>
                <label for="nominative">nominative</label>
                <input id="nominative" v-model="nounCases.lp.nominative" />
              </div>
              <div>
                <label for="genitive">genitive</label>
                <input id="genitive" v-model="nounCases.lp.genitive" />
              </div>
              <div>
                <label for="accusative">accusative</label>
                <input id="accusative" v-model="nounCases.lp.accusative" />
              </div>
              <div>
                <label for="dative">dative</label>
                <input id="dative" v-model="nounCases.lp.dative" />
              </div>
              <div>
                <label for="locative">locative</label>
                <input id="locative" v-model="nounCases.lp.locative" />
              </div>
              <div>
                <label for="instrumental">instrumental</label>
                <input id="instrumental" v-model="nounCases.lp.instrumental" />
              </div>
              <div>
                <label for="vocative">vocative</label>
                <input id="vocative" v-model="nounCases.lp.vocative" />
              </div>
            </div>
            <div>
              <div>
                <label for="nominative">nominative</label>
                <input id="nominative" v-model="nounCases.lm.nominative" />
              </div>
              <div>
                <label for="genitive">genitive</label>
                <input id="genitive" v-model="nounCases.lm.genitive" />
              </div>
              <div>
                <label for="accusative">accusative</label>
                <input id="accusative" v-model="nounCases.lm.accusative" />
              </div>
              <div>
                <label for="dative">dative</label>
                <input id="dative" v-model="nounCases.lm.dative" />
              </div>
              <div>
                <label for="locative">locative</label>
                <input id="locative" v-model="nounCases.lm.locative" />
              </div>
              <div>
                <label for="instrumental">instrumental</label>
                <input id="instrumental" v-model="nounCases.lm.instrumental" />
              </div>
              <div>
                <label for="vocative">vocative</label>
                <input id="vocative" v-model="nounCases.lm.vocative" />
              </div>
            </div>
          </div>
          <div v-if="partofspeechId === 2">
            verb
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

    .times {
      display: flex;
    }
  }
</style>
