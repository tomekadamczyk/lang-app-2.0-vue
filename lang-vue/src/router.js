import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Flashcards from './views/Flashcards.vue';
import Hangman from './views/Hangman.vue';
import Dictionary from './views/Dictionary.vue';
import WordView from './views/WordView.vue';
import AddWord from './components/AddWord/AddWord.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Flashcards,
    },
    {
      path: '/hangman',
      name: 'hangman',
      component: Hangman,
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: Dictionary,
    },
    {
      path: '/dictionary/add',
      name: 'adddWord',
      component: AddWord,
    },
    {
      path: '/dictionary/:wordId',
      name: 'word',
      component: WordView,
    },
  ],
});
