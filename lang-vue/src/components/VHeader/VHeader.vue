<template>
  <header class="header" v-bind:class="{active: activeHeader}">
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
  props: {
    activeHeader: {
        type: Boolean,
    },
  },
  // TO DO: check why not working
  // data() {
  //   return {
  //     isHeaderActive: this.$props.activeHeader,
  //   }
  // },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/style.scss";

  .header {
    width: 100%;
    height: auto;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    transform: translateY(-100%);
    transition: width .4s, transform .4s;

    &.active {
      transform: translateY(0);
    }
    

    @include media-screen(tablet-up) {
      width: 70px;
      top: 0;
      height: 100vh;
      text-align: left;
    transform: translateY(0);

      &.active {
        width: 250px;
        box-shadow: 3px 5px 66px 4px $gray;
      }
    }
  }
</style>
