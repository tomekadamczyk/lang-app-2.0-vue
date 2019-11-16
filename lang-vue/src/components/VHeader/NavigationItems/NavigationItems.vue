<template>
    <ul class="nav-items">
        <NavigationItem
            v-for="(link, index) in links"
            v-bind:key="index"
            v-bind:name="link.linkname"
            v-bind:url="link.linkurl"
        />
    </ul>
</template>

<script>
import NavigationItem from './NavigationItem/NavigationItem.vue';

export default {
    name: 'NavigationItems',
    components: {
        NavigationItem,
    },
    data() {
        return {
            links: [
                {id: 0, linkname: 'Dashboard', linkurl: '/'},
                {id: 1, linkname: 'Flashcards', linkurl: '/flashcards'},
                {id: 1, linkname: 'Hangman', linkurl: '/hangman'},
            ],
        };
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
</style>
