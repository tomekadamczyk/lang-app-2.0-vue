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
            v-model="newWord" />
          </div>
          <div class="form-input-group">
            <label for="new-word-translation">Type translation</label>
            <input
            id="new-word-translation"
            v-model="translation" />
          </div>
        </div>
        <div class="add-form-column">
          <transition name="fade">
            <div v-if="partofspeechId === 1" class="times">
              <div class="inputs-set">
                <div class="form-input-group">
                  <label for="nominative">nominative</label>
                  <input id="nominative" v-model="nounCases.lp.nominative" />
                </div>
                <div class="form-input-group">
                  <label for="genitive">genitive</label>
                  <input id="genitive" v-model="nounCases.lp.genitive" />
                </div>
                <div class="form-input-group">
                  <label for="accusative">accusative</label>
                  <input id="accusative" v-model="nounCases.lp.accusative" />
                </div>
                <div class="form-input-group">
                  <label for="dative">dative</label>
                  <input id="dative" v-model="nounCases.lp.dative" />
                </div>
                <div class="form-input-group">
                  <label for="locative">locative</label>
                  <input id="locative" v-model="nounCases.lp.locative" />
                </div>
                <div class="form-input-group">
                  <label for="instrumental">instrumental</label>
                  <input id="instrumental" v-model="nounCases.lp.instrumental" />
                </div>
                <div class="form-input-group">
                  <label for="vocative">vocative</label>
                  <input id="vocative" v-model="nounCases.lp.vocative" />
                </div>
              </div>
              <div class="inputs-set">
                <div class="form-input-group">
                  <label for="nominative">nominative</label>
                  <input id="nominative" v-model="nounCases.lm.nominative" />
                </div>
                <div class="form-input-group">
                  <label for="genitive">genitive</label>
                  <input id="genitive" v-model="nounCases.lm.genitive" />
                </div>
                <div class="form-input-group">
                  <label for="accusative">accusative</label>
                  <input id="accusative" v-model="nounCases.lm.accusative" />
                </div>
                <div class="form-input-group">
                  <label for="dative">dative</label>
                  <input id="dative" v-model="nounCases.lm.dative" />
                </div>
                <div class="form-input-group">
                  <label for="locative">locative</label>
                  <input id="locative" v-model="nounCases.lm.locative" />
                </div>
                <div class="form-input-group">
                  <label for="instrumental">instrumental</label>
                  <input id="instrumental" v-model="nounCases.lm.instrumental" />
                </div>
                <div class="form-input-group">
                  <label for="vocative">vocative</label>
                  <input id="vocative" v-model="nounCases.lm.vocative" />
                </div>
              </div>
            </div>
          </transition>
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
    margin-right: 50px;

    .times {
      display: flex;
      position: relative;
      transform: translateX(50px);
    }
  }

  .form-input-group {
    margin-bottom: 15px;

    label {
      display: block;
      font-size: 12px;
      margin-bottom: 5px;
    }

    input {
      border: 1px solid #ccc;
      padding: 5px;
    }
  }

  .inputs-set {
    margin-right: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
