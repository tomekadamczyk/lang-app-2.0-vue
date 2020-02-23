import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    defaultLanguage: 'czech',
    dictionary: [],
    wordPageData: [],
    partsOfSpeech: [
      { value: 'noun' },
      { value: 'verb' },
      { value: 'adjective' },
      { value: 'adverb' },
      { value: 'pronoun' },
      { value: 'preposition' },
      { value: 'conjunction' },
    ],
    grammaticalCases: [
      { value: 'nominative' },
      { value: 'genitive' },
      { value: 'dative' },
      { value: 'accusative' },
      { value: 'instrumental' },
      { value: 'locative' },
      { value: 'vocative' },
    ],
    languages: [
      {
        name: 'czech',
        cards: [
          {
            id: 0, value: 'word', translation: 'slowo', partOfSpeech: 'noun', grammaticalCase: 'nominative', nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
          },
          {
            id: 1, value: 'tramwaj', translation: 'tramvaj', partOfSpeech: 'noun', grammaticalCase: 'nominative', nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
          },
          {
            id: 2, value: 'spodnie', translation: 'kalhoty', partOfSpeech: 'noun', grammaticalCase: 'nominative', nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
          },
          {
            id: 3, value: 'kurtka', translation: 'bunda', partOfSpeech: 'noun', grammaticalCase: 'nominative', nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
          },
          {
            id: 4, value: 'góry', translation: 'hory', partOfSpeech: 'noun', grammaticalCase: 'nominative', nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
          },
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
