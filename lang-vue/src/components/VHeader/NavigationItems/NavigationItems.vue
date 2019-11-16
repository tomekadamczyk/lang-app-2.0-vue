<template>
    <NavigationCategories v-bind:activeHeader="activeHeader" />
</template>

<script>
import NavigationCategories from './NavigationCategory/NavigationCategories.vue';

export default {
    name: 'NavigationItems',
    components: {
        NavigationCategories,
    },
    props: {
        activeHeader: {
            type: Boolean,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/style.scss";

    .nav-items {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>
