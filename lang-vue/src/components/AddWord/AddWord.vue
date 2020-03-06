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
          <InputGroup
            v-bind:id="`new-word`"
            v-bind:model="newWord"
            v-on:input="newWord = $event"
          >
            Type new word
          </InputGroup>
          <InputGroup
            v-bind:id="`new-word-translation`"
            v-bind:model="translation"
            v-on:input="translation = $event"
          >
            Type translation
          </InputGroup>
        </div>
        <div class="add-form-column">
            <div v-if="partofspeechId === 1" class="times">
              <div class="inputs-heading">L.p</div>
              <div class="inputs-set">
                <InputGroup
                  v-for="(value, index) in grammaticalCases"
                  v-bind:key="index"
                  v-bind:id="`new-word-translation`"
                  v-bind:model="nounCases.lp[value.value]"
                  v-on:input="nounCases.lp[value.value] = $event"
                >
                  {{ value.value }}
                </InputGroup>
              </div>
              <div class="inputs-heading">L.m</div>
              <div class="inputs-set">
                <InputGroup
                  v-for="(value, index) in grammaticalCases"
                  v-bind:key="index"
                  v-bind:id="`new-word-translation`"
                  v-bind:model="nounCases.lm[value.value]"
                  v-on:input="nounCases.lm[value.value] = $event"
                >
                  {{ value.value }}
                </InputGroup>
              </div>
            </div>
            <div v-if="partofspeechId === 2" class="times">
              <div class="inputs-heading">Present</div>
              <div class="inputs-set">
                <InputGroup
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  v-bind:id="`nominative`"
                  v-bind:model="verbPerson.present[value.value]"
                  v-on:input="verbPerson.present[value.value] = $event"
                >
                  {{ replacePersonTimeLabel(value.value) }}
                </InputGroup>
              </div>
              <div class="inputs-heading">Past</div>
              <div class="inputs-set">
                <InputGroup
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  v-bind:id="`nominative`"
                  v-bind:model="verbPerson.past[value.value]"
                  v-on:input="verbPerson.past[value.value] = $event"
                >
                  {{ replacePersonTimeLabel(value.value) }}
                </InputGroup>
              </div>
              <div class="inputs-heading">Future</div>
              <div class="inputs-set">
                <InputGroup
                  v-for="(value, index) in allTimePersons"
                  v-bind:key="index"
                  v-bind:id="`nominative`"
                  v-bind:model="verbPerson.future[value.value]"
                  v-on:input="verbPerson.future[value.value] = $event"
                >
                  {{ replacePersonTimeLabel(value.value) }}
                </InputGroup>
              </div>
            </div>
          <div v-if="partofspeechId === 3" class="form-container">
            <div class="form-container-data">
              <div
                v-for="(singleCase, index) in grammaticalCases"
                v-bind:key="index"
                class="grammaticalCases"
              >
                <div class="inputs-heading">{{ singleCase.value }}</div>
                <div class="inputs-set">
                  <InputGroup
                    v-for="(sexType, index) in allSexTypes"
                    v-bind:key="index"
                    v-bind:id="`nominative`"
                    v-bind:model="adj.lp[singleCase.value][sexType.value]"
                    v-on:input="adj.lp[singleCase.value][sexType.value] = $event"
                  >
                    {{ sexType.value }}
                  </InputGroup>
                </div>
              </div>
            </div>
            <div class="form-container-data">
              <div
                v-for="(singleCase, index) in grammaticalCases"
                v-bind:key="index"
                class="grammaticalCases"
              >
                <div class="inputs-heading">{{ singleCase.value }}</div>
                <div class="inputs-set">
                  <InputGroup
                    v-for="(sexType, index) in allSexTypes"
                    v-bind:key="index"
                    v-bind:id="`nominative`"
                    v-bind:model="adj.lm[singleCase.value][sexType.value]"
                    v-on:input="adj.lm[singleCase.value][sexType.value] = $event"
                  >
                    {{ sexType.value }}
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import InputGroup from '../UI/Form/Input/InputGroup.vue';

export default {
  name: 'Add',
  components: {
    InputGroup,
  },
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
    allSexTypes: gql`
      query allSexTypes {
      allSexTypes {
        value
      }
    }
    `,
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
          singularFirst: '',
          singularSecond: '',
          singularThird: '',
          pluralFirst: '',
          pluralSecond: '',
          pluralThird: '',
        },
        past: {
          singularFirst: '',
          singularSecond: '',
          singularThird: '',
          pluralFirst: '',
          pluralSecond: '',
          pluralThird: '',
        },
        future: {
          singularFirst: '',
          singularSecond: '',
          singularThird: '',
          pluralFirst: '',
          pluralSecond: '',
          pluralThird: '',
        },
      },
      adj: {
        lp: {
          nominative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          genitive: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          accusative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          dative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          locative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          instrumental: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          vocative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
        },
        lm: {
          nominative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          genitive: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          accusative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          dative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          locative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          instrumental: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
          vocative: {
            masculine: '',
            feminine: '',
            neuter: '',
          },
        },
      },
    };
  },
  computed: {
    getCases() {
      return this.grammaticalCases;
    },
    getSexTypes() {
      return this.allSexTypes;
    },
  },
  methods: {
    addWord() {
      if (this.partofspeechId === 1) {
        this.wordSpecific = this.nounCases;
      }
      if (this.partofspeechId === 2) {
        this.wordSpecific = this.verbPerson;
      }
      if (this.partofspeechId === 3) {
        this.wordSpecific = this.adj;
      }
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
    padding: 50px;
    margin: 30px 0;
  }

  .add-word-form {
    display: flex;
    flex-direction: column;

    &__column {

    }
  }

  .add-form-column {

    &:first-of-type {
    display: flex;
    }

    &:nth-of-type(2) {
      position: relative;
    }

    .times {
      display: flex;
      flex-direction: column;
    }
  }


  .form-input {
    border-right: 1px solid;
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

  .form-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .times {
      flex-direction: row;
    }
  }
</style>
