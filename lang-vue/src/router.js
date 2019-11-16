import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Flashcards from './views/Flashcards.vue';
import Hangman from './views/Hangman.vue';

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
  ],
});
