<template>
    <div>
        <Dropdown
          :items="allLanguages"
          v-on:selectChange="selectChanges"
        />
        <FechedDictionary
          :languageVarId="languageVarId"
        />
    </div>
</template>

<script>
import gql from 'graphql-tag';
import FechedDictionary from './FetchedDictionary.vue';
import Dropdown from '../UI/Dropdown/Dropdown.vue';
import store from '../../store';

export default {
  name: 'Dictionary',
  components: {
    Dropdown,
    FechedDictionary,
  },
  apollo: {
    allLanguages: gql`
      query allLanguages {
      allLanguages {
        id,
        value,
        slug
      }
    }`,
  },
  data() {
    return {
      languageVarId: 1,
      sharedState: store.state,
    };
  },
  methods: {
    selectChanges($event) {
      this.languageVarId = $event;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>
