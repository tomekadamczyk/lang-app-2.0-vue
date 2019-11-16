<template>
  <header class="header">
    <NavigationItems />
  </header>
</template>

<script>
import NavigationItems from './NavigationItems/NavigationItems.vue';

export default {
  name: 'VHeader',
  components: {
    NavigationItems,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/scss/style.scss";

  .header {
    width: 250px;
    height: 100vh;
    text-align: left;
  }
</style>
