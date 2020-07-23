import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Flashcards from './views/Flashcards.vue';
import Hangman from './views/Hangman.vue';
import Dictionary from './views/Dictionary.vue';
import WordView from './views/WordView.vue';
import AddWord from './components/AddWord/AddWord.vue';
import Registration from './views/Registration.vue';
import store from './store.js';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Registration,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Flashcards,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/hangman',
      name: 'hangman',
      component: Hangman,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: Dictionary,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dictionary/add',
      name: 'adddWord',
      component: AddWord,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dictionary/:wordId',
      name: 'word',
      component: WordView,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

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

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(getCookie('token') == null) {
      next({
        path: '/register',
        params: { nextUrl: to.fullPath }
      })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
})

export default router;
