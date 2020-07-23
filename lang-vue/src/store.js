import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
       c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
       return c.substring(name.length, c.length);
      }
  }
  return "";
}

const userToken = getCookie('token');
const userId = getCookie('userId');

export default new Vuex.Store({
  state: {
    defaultLanguage: 'czech',
    token: userToken || '',
    userId: userId || '',
    dictionary: [],
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
            id: 0,
            value: 'word',
            translation: 'slowo',
            partOfSpeech: 'noun',
            wordSpecific: {
              lp: {
                nominative: 'słowo', genitive: 'słowa', dative: 'słowu', accusative: 'słowo', instrumental: 'słowie', locative: 'słowem', vocative: 'słowo!',
              },
              lm: {
                nominative: 'słowa', genitive: 'słów', dative: 'słowom', accusative: 'słowa', instrumental: 'słowach', locative: 'słowami', vocative: 'słowa!',
              },
            },
          },
          {
            id: 1,
            value: 'tramwaj',
            translation: 'tramvaj',
            partOfSpeech: 'noun',
            wordSpecific: {
              lp: {
                nominative: 'tramwaj', genitive: 'tramwaju', dative: 'tramwajowi', accusative: 'tramwaj', instrumental: 'tramwaju', locative: 'tramwajem', vocative: 'tramwaju!',
              },
              lm: {
                nominative: 'tramwaje', genitive: 'tramwajów', dative: 'tramwajom', accusative: 'tramwaje', instrumental: 'tramwajach', locative: 'tramwajami', vocative: 'tramwaje!',
              },
            },
          },
          {
            id: 2,
            value: 'spodnie',
            translation: 'kalhoty',
            partOfSpeech: 'noun',
            wordSpecific: {
              lp: {
                nominative: 'spodnie', genitive: 'spodni', dative: 'spodniom', accusative: 'spodnie', instrumental: 'spodniach', locative: 'spodniami', vocative: 'spodnie!',
              },
            },
          },
          {
            id: 3,
            value: 'kurtka',
            translation: 'bunda',
            partOfSpeech: 'noun',
            wordSpecific: {
              lp: {
                nominative: 'kurtka', genitive: 'kurtki', dative: 'kurtce', accusative: 'kurtkę', instrumental: 'kurtce', locative: 'kurtką', vocative: 'kurtko!',
              },
              lm: {
                nominative: 'kurtki', genitive: 'kurtek', dative: 'kurtom', accusative: 'kurtki', instrumental: 'kurtkami', locative: 'kurtkom', vocative: 'kurtki!',
              },
            },
          },
          {
            id: 4,
            value: 'góra',
            translation: 'hora',
            partOfSpeech: 'noun',
            wordSpecific: {
              lp: {
                nominative: 'góra', genitive: 'góry', dative: 'górze', accusative: 'górę', instrumental: 'górze', locative: 'górą', vocative: 'góro!',
              },
              lm: {
                nominative: 'góry', genitive: 'gór', dative: 'górom', accusative: 'góry', instrumental: 'górach', locative: 'górami', vocative: 'góry!',
              },
            },
          },
          {
            id: 5,
            value: 'robić',
            translation: 'dělat',
            partOfSpeech: 'verb',
            wordSpecific: {
              present: {
                i: 'dělam',
                youSingular: 'dělaš',
                he: 'děla',
                we: 'dělame',
                youPlural: 'dělate',
                they: 'dělaji',
              },
              past: {
                i: 'dělal',
                youSingular: 'dělal',
                he: 'dělal',
                we: 'dělali/dělaly jsme',
                youPlural: 'dělali/dělaly jste',
                they: 'dělali/dělaly/dělala',
              },
              future: {
                i: 'budu dělat',
                youSingular: 'budeš dělat',
                he: 'bude dělat',
                we: 'budeme dělat',
                youPlural: 'budete dělat',
                they: 'budou dělat',
              },
            },
          },
          {
            id: 6,
            value: 'velký',
            translation: 'duży',
            partOfSpeech: 'adjective',
            wordSpecific: {
              lp: {
                nominative: {
                  masculine: 'velký', feminine: 'velká', neuter: 'velké',
                },
                genitive: {
                  masculine: 'velkého', feminine: 'velké', neuter: 'velkého',
                },
                dative: {
                  masculine: 'velkému', feminine: 'velké', neuter: 'velkému',
                },
                accusative: {
                  masculine: 'velkého', feminine: 'velkou', neuter: 'velké',
                },
                instrumental: {
                  masculine: 'velkým', feminine: 'velkou', neuter: 'velkým',
                },
                locative: {
                  masculine: 'velkém', feminine: 'velké', neuter: 'velkém',
                },
                vocative: {
                  masculine: 'velký', feminine: 'velká', neuter: 'velké',
                },
              },
              lm: {
                nominative: {
                  masculine: 'velcí', feminine: 'velké', neuter: 'velká',
                },
                genitive: {
                  masculine: 'velkých', feminine: 'velkých', neuter: 'velkých',
                },
                dative: {
                  masculine: 'velkým', feminine: 'velkým', neuter: 'velkým',
                },
                accusative: {
                  masculine: 'velké', feminine: 'velké', neuter: 'velké',
                },
                instrumental: {
                  masculine: 'velkými', feminine: 'velkými', neuter: 'velkými',
                },
                locative: {
                  masculine: 'velkých', feminine: 'velkých', neuter: 'velkých',
                },
                vocative: {
                  masculine: 'velcí', feminine: 'velké', neuter: 'velká',
                },
              },
            },
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
    GET_ACTIVE_USER_ID(state, id) {
      state.activeUserId = id;
    },
    AUTHENTICATE_USER(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    updateDictionary(context, payload) {
      context.commit('UPDATE_DICTIONARY', payload);
    },
  },
});
