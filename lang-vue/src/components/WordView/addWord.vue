<template>
  <div>
    Add new word
    <button @click="addWord">Add</button>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Add',
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
      this.partofspeechId = 0;
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
