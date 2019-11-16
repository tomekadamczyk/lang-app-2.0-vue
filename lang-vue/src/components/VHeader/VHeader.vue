<template>
  <header class="header">
    <Hamburger />
    <NavigationItems />
  </header>
</template>

<script>
import Hamburger from '../UI/Hamburger.vue';
import NavigationItems from './NavigationItems/NavigationItems.vue';

export default {
  name: 'VHeader',
  components: {
    NavigationItems,
    Hamburger,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/scss/style.scss";

  .header {
    width: 100%;
    height: auto;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;

    @include media-screen(tablet-up) {
      position: relative;
      top: unset;
      left: unset;
      width: 180px;
      height: 100vh;
      text-align: left;
    }

    @include media-screen(desktop-up) {
        width: 250px;
    }
  }
</style>
