<template>
  <div id="app">
    <Layout>
      <router-view/>
    </Layout>
  </div>
</template>

<script>
import Layout from './components/Layout/Layout.vue';

export default {
  components: {
    Layout,
  },
};
</script>

<style lang="scss">
@import "assets/scss/style.scss";
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
  display: flex;
  flex-direction: column;

    @include media-screen(tablet-up) {
      flex-direction: row;
    }
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
