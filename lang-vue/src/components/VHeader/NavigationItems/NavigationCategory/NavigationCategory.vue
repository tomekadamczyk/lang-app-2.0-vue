<template>
    <li>
        <span>{{linkCategory}}</span>
        <ul class="nav-items" v-if="renderByCategory">
            <NavigationItem
                v-for="(link, index) in renderByCategory"
                v-bind:key="index"
                v-bind:url="link.url"
                v-bind:name="isHeaderWide ? link.name : link.placeholder"
            >
            </NavigationItem>
        </ul>
    </li>
</template>

<script>
import NavigationItem from '../NavigationItem/NavigationItem.vue';
import NAV_CATEGORIES from '../../../../data/navCategories';
const { general, excercises, test, favorites } = NAV_CATEGORIES;

export default {
    name: 'NavigationCategory',
    components: {
        NavigationItem,
    },
    props: {
        category: {
            type: String,
        },
    },
    data() {
        return {
            isHeaderWide: false,
            linkCategory: this.category,
            links: [
                {id: 0, name: 'Dashboard', placeholder: 'O', url: '/', category: general},
                {id: 1, name: 'Flashcards', placeholder: 'O', url: '/flashcards', category: excercises},
                {id: 2, name: 'Hangman', placeholder: 'O',kurl: '/hangman', category: excercises},
                {id: 3, name: 'test1', placeholder: 'O', url: '/hangman', category: test},
                {id: 4, name: 'test2', placeholder: 'O',url: '/hangman', category: test},
                {id: 5, name: 'fav', placeholder: 'O', url: '/hangman', category: favorites},
                {id: 6, name: 'fav2', placeholder: 'O', url: '/hangman', category: favorites},
            ],
        };
    },
    computed: {
        renderByCategory() {
            return this.links.filter(link => {
                return link.category === this.linkCategory;
            });
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
            opacity: 0;

            &.active {
                opacity: 1;
            }
            margin: 0 0 5px 20px;
        }
    }
</style>
