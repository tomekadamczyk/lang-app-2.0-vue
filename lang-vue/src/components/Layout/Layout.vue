<template>
    <div class="layout-wrapper" v-bind:class="{ 'dark-mode' : darkMode }">
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
        <input type="checkbox" id="dark-mode" v-model="darkMode">
        <label for="dark-mode">Dark mode</label>
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
      darkMode: localStorage.getItem('darkMode') || false,
    };
  },
  watch: {
    darkMode() {
      localStorage.setItem('darkMode', this.darkMode)
    }
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
      background: var(--layout-backround);
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
