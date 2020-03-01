<template>
  <div>
    Add new word
    <button @click="addWord">Add</button>
    <div class="addcontainer">
      <select v-model="partofspeechId">
        <option
          v-for="(partOfSpeech, index) in allPartsOfSpeech"
          v-bind:key="index"
          v-bind:value="partOfSpeech.id"
        >
          {{ partOfSpeech.value }}
        </option>
      </select>
      {{ partofspeechId }}
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
    };
  },
  methods: {
    addWord() {
      this.newWord = '';
      this.wordTranslation = '';
      this.wordSpecific = '';
      this.$apollo.mutate({
        mutation: gql`
          mutation addWord ($value: String!, $translation: String!, $wordSpecific: JSON!, $partofspeechId: Int!) {
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
          translation: this.wordTranslation,
          wordSpecific: this.wordSpecific,
          partofspeechId: this.partofspeechId,
        },
      }).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
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
</style>
