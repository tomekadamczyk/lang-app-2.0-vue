<template>
  <div id="app">
    <VHeader />
    <Layout>
      <router-view/>
    </Layout>
  </div>
</template>

<script>
import VHeader from './components/VHeader/VHeader.vue';
import Layout from './components/Layout/Layout.vue';

export default {
  components: {
    VHeader,
    Layout,
  },
};
</script>

<style lang="scss">
*, *::after, *::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
