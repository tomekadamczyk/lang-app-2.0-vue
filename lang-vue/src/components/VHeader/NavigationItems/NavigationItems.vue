<template>
    <NavigationCategories />
</template>

<script>
import NavigationCategories from './NavigationCategory/NavigationCategories.vue';

export default {
    name: 'NavigationItems',
    components: {
        NavigationCategories,
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
