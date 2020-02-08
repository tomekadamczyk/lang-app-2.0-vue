import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    defaultLanguage: 'czech',
    dictionary: [],
    languages: [
      {
        name: 'czech',
        cards: [
          { value: 'word', translation: 'slowo' },
          { value: 'tramwaj', translation: 'tramvaj' },
          { value: 'spodnie', translation: 'kalhoty' },
          { value: 'kurtka', translation: 'bunda' },
          { value: 'góry', translation: 'hory' },
        ],
      },
      {
        name: 'english',
        cards: [
          { value: 'word', translation: 'słowo' },
          { value: 'tramwaj', translation: 'train' },
          { value: 'spodnie', translation: 'pants' },
          { value: 'kurtka', translation: 'jacket' },
          { value: 'góry', translation: 'mountains' },
        ],
      },
      {
        name: 'german',
        cards: [
          { value: 'word', translation: 'slowen' },
          { value: 'tramwaj', translation: 'tramvajen' },
          { value: 'spodnie', translation: 'kalhoten' },
          { value: 'kurtka', translation: 'kurtken' },
          { value: 'góry', translation: 'góren' },
        ],
      },
      {
        name: 'italian',
        cards: [
          { value: 'word', translation: 'slovacoo' },
          { value: 'tramwaj', translation: 'tramvajo' },
          { value: 'spodnie', translation: 'spodniento' },
          { value: 'kurtka', translation: 'kurtkando' },
          { value: 'góry', translation: 'górento' },
        ],
      },
    ],
  },
  mutations: {
    UPDATE_DICTIONARY(state, lang) {
      // eslint-disable-next-line array-callback-return
      state.languages.filter((language) => {
        if (language.name === lang) {
          language.cards.forEach((card) => {
            state.dictionary.push(card);
          });
        }
      });
    },
  },
  actions: {
    updateDictionary(context, payload) {
      context.commit('UPDATE_DICTIONARY', payload);
    },
  },
});
