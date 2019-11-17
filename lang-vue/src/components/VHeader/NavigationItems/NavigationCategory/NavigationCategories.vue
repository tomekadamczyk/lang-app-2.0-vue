<template>
    <ul class="nav-categories">
        <NavigationCategory 
            v-for="(category, index) in categories"
            v-bind:key="index" 
            v-bind:category="category"
            v-bind:activeHeader="activeHeader"
            v-bind:class="{active: activeHeader}"
            class="nav-categories__category"
            v-on:closeNav="$emit('closeNav')"
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
    props: {
        activeHeader: {
            type: Boolean,
        },
    },
    data() {
        return {
            categories: [ general, excercises, test, favorites ],
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/style.scss";

    .nav-categories {
        list-style-type: none;
        background: $primary;
        margin: 0;
        height: 100%;
        padding: 20px 0;

        @include media-screen(tablet-up) {
            padding: 100px 0;
        }

        &__category {
            &:not(:last-of-type) {
                padding-bottom: 7px;
                margin-bottom: 13px;

                &.active {
                    border-bottom: 1px solid $gray-light-1;
                }
            }
        }
    }
</style>
