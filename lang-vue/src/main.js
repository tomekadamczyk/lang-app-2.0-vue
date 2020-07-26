import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});


const getCookie = (cname) => {
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
};


const authLink = setContext((_, { headers }) => {
  const token = getCookie('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

const userId = getCookie('userId');
new Vue({
  router,
  store,
  apolloProvider,
  data: {
    userId,
  },
  render: h => h(App),
}).$mount('#app');
