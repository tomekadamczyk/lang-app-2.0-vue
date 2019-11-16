<template>
    <ul class="nav-categories">
        <NavigationCategory 
            v-for="(category, index) in categories"
            v-bind:key="index" 
            v-bind:category="category"
            class="nav-categories__category"
        >
        </NavigationCategory>
    </ul>
</template>

<script>
import NavigationCategory from './NavigationCategory.vue';
import NAV_CATEGORIES from '../../../../data/navCategories';
const { general, excercises, test, favorites } = NAV_CATEGORIES;

export default {
    name: 'NavigationCategories',
    components: {
        NavigationCategory,
    },
    data() {
        return {
            categories: [ general, excercises, test, favorites ],
        };
    },
};
</script>

<style lang="scss" scoped>
    .nav-categories {
        list-style-type: none;
        padding: 0;
        background: #349268;
        margin: 0;
        height: 100%;

        &__category {
        }
    }
</style>
