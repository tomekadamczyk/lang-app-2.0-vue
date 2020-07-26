<template>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
        <VTable
            v-bind:tableDataArray="allWords"
            v-bind:checkRouter="checkRouter"
        />
    </div>
</template>

<script>
import gql from 'graphql-tag';
import VTable from '../UI/Table/VTable.vue';
import store from '../../store';

export default {
  name: 'FechedDictionary',
  components: {
    VTable,
  },
  props: {
    languageVarId: {
      type: Number,
    },
  },
  data() {
    return {
      sharedState: store.state,
      checkRouter: 1,
      preparedData: [],
    };
  },
  apollo: {
    allWords: {
      query: gql`
        query allWords($langId: Int!, $userId: Int) {
        allWords(LanguageId: $langId, UserId: $userId) {
          id
          value
          translation
        }
      }`,
      variables() {
        console.log(Number(this.$store.state.userId))
        return {
          langId: this.languageVarId,
          userId: Number(this.getCookie('userId')),
        };
      },
    },
  },
  methods: {
    generateData() {
      const dictionary = { ...this.allWords };
      const newDictionaryObjects = {};
      const arrayOfDictionaryObjects = [];
      Object.keys(dictionary).forEach((item) => {
        newDictionaryObjects[item] = {
          id: dictionary[item].id,
          value: dictionary[item].value,
          translation: dictionary[item].translation,
        };
        arrayOfDictionaryObjects.push(newDictionaryObjects[item]);
      });
      this.preparedData = arrayOfDictionaryObjects;
      return this.preparedData;
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
  },
  created() {
    this.generateData();
  },
};
</script>

<style lang="scss" scoped>

</style>
