<template>
    <div class="layout-wrapper">
        <Hamburger
            v-bind:activeHeader="isLayoutActive"
            v-on:toggle="toggleNavigation"
            v-if="isAuthenticated"
        />
        <VHeader
            v-bind:activeHeader="isLayoutActive"
            v-on:closeNav="closeNav"
            v-if="isAuthenticated"
        />
        <main
            class="layout"
            v-bind:class="{active: isLayoutActive}"
        >
            <slot/>
        </main>
    </div>
</template>

<script>
import VHeader from '../VHeader/VHeader.vue';
import Hamburger from '../UI/Hamburger.vue';

export default {
  name: 'Layout',
  components: {
    VHeader,
    Hamburger,
  },
  data() {
    return {
      isLayoutActive: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  created() {
    console.log(this.isAuthenticated)
  },
  methods: {
    toggleNavigation() {
      this.isLayoutActive = !this.isLayoutActive;
    },
    closeNav() {
      this.isLayoutActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .layout-wrapper {
        width: 100%;
    }

    .layout {
        width: 100%;
        height: auto;
        position: relative;
        padding: 20px;

        @include media-screen(tablet-up) {
            width: calc(100% - 70px);
            height: 100vh;
            left: 70px;
        }
    }
</style>
