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
    .nav-items {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>
