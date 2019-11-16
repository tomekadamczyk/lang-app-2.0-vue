<template>
    <div class="layout-wrapper">
        <Hamburger 
            v-bind:activeHeader="isLayoutActive" 
            v-on:toggle="toggleNavigation" 
        />
        <VHeader 
            v-bind:activeHeader="isLayoutActive"
        />
        <main 
            class="layout" 
            v-bind:class="{active: isLayoutActive}"
        >
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
        };
    },
    methods: {
        toggleNavigation() {
            return this.isLayoutActive = !this.isLayoutActive;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .layout-wrapper {
        width: 100%;
    }

    .layout {
        width: 100%;
        height: auto;
        position: relative;

        @include media-screen(tablet-up) {
            width: calc(100% - 70px);
            height: 100vh;
            left: 70px;
        }
    }
</style>