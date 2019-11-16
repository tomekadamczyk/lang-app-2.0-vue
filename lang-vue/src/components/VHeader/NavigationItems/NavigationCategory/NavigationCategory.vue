<template>
    <li>
        <span>{{linkCategory}}</span>
        <ul class="nav-items" v-if="renderByCategory">
            <NavigationItem
                v-for="(link, index) in renderByCategory"
                v-bind:key="index"
                v-bind:url="link.linkurl"
                v-bind:name="link.linkname"
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
            linkCategory: this.category,
            links: [
                {id: 0, linkname: 'Dashboard', linkurl: '/', category: general},
                {id: 1, linkname: 'Flashcards', linkurl: '/flashcards', category: excercises},
                {id: 2, linkname: 'Hangman', linkurl: '/hangman', category: excercises},
                {id: 3, linkname: 'test1', linkurl: '/hangman', category: test},
                {id: 4, linkname: 'test2', linkurl: '/hangman', category: test},
                {id: 5, linkname: 'fav', linkurl: '/hangman', category: favorites},
                {id: 6, linkname: 'fav2', linkurl: '/hangman', category: favorites},
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
    .nav-items {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        padding: 0;
        background: #349268;
        margin: 0;
    }
            span {
                margin-left: 20px;
                display: block;
            }
</style>
