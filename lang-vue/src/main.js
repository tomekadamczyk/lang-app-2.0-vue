import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
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


const authLink = setContext((_, { headers }) => {
  const token = getCookie('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
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
