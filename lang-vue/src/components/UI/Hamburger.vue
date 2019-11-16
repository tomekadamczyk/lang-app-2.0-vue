<template>
    <div 
        class="hamburger" 
        v-bind:class="{active: activeHeader}"
        v-on:click="$emit('toggle')"
        >
        <div class="hamburger__line"></div>
        <div class="hamburger__line"></div>
        <div class="hamburger__line"></div>
    </div>
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        activeHeader: {
            type: Boolean,
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .hamburger {
        position: absolute;
        top: 20px;
        right: 30px;
        cursor: pointer;
        z-index: 10000;

        @include media-screen(tablet-up) {
            right: unset;
            left: 16px;
        }

        &__line {
            width: 40px;
            height: 3px;
            border-radius: 20px;
            margin-bottom: 5px;
            background: $primary;
            
            @include media-screen(tablet-up) {
                background: $white;
            }
        }

        &.active &__line {
            background: $white;
        }
    }
</style>