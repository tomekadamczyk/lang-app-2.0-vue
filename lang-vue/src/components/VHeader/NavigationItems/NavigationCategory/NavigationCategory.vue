<template>
    <li>
        <span
            v-bind:class="{active: activeHeader}"
            >{{linkCategory}}</span>
        <ul class="nav-items" v-if="renderByCategory">
            <NavigationItem
                v-bind:class="{active: activeHeader}"
                v-for="(link, index) in renderByCategory"
                v-bind:key="index"
                v-bind:url="link.url"
                v-bind:name="link.name"
                v-on:closeNav="$emit('closeNav')"
            >
            </NavigationItem>
        </ul>
    </li>
</template>

<script>
import NavigationItem from '../NavigationItem/NavigationItem.vue';
import NAV_CATEGORIES from '../../../../data/navCategories';

const {
  general, excercises, test, favorites, account
} = NAV_CATEGORIES;

export default {
  name: 'NavigationCategory',
  components: {
    NavigationItem,
  },
  props: {
    category: {
      type: String,
    },
    activeHeader: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeNavHeader: this.activeHeader,
      linkCategory: this.category,
      links: [
        {
          id: 0, name: 'Dashboard', placeholder: 'O', url: '/', category: general,
        },
        {
          id: 1, name: 'Flashcards', placeholder: 'O', url: '/flashcards', category: excercises,
        },
        {
          id: 2, name: 'Hangman', placeholder: 'O', url: '/hangman', category: excercises,
        },
        {
          id: 3, name: 'Dictionary', placeholder: 'O', url: '/dictionary', category: excercises,
        },
        {
          id: 4, name: 'Account', placeholder: 'O', url: '/account', category: account,
        },
        {
          id: 5, name: 'Settings', placeholder: 'O', url: '/settings', category: account,
        },
        {
          id: 6, name: 'Logout', placeholder: 'O', url: '/logout', category: account,
        },
      ],
    };
  },
  computed: {
    renderByCategory() {
      return this.links.filter(link => link.category === this.linkCategory);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

    .nav-items {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    span {
        display: block;
        color: $gray-light-1;
        font-weight: bold;
        font-size: 13px;
        position: relative;
        margin-bottom: 5px;
        text-transform: capitalize;

        @include media-screen(tablet-up) {
            transform: translateX(-200%);
            transition: transform .6s;

            &.active {
                transform: translateX(0);
            }
            margin: 0 0 5px 20px;
        }
    }
</style>
