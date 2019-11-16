<template>
    <div class="hamburger">
        <div class="hamburger__line"></div>
        <div class="hamburger__line"></div>
        <div class="hamburger__line"></div>
    </div>
</template>

<script>
export default {
    name: 'Hamburger',
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .hamburger {
        position: absolute;
        top: 20px;
        right: 30px;
        cursor: pointer;

        @include media-screen(tablet-up) {
            right: unset;
            left: 50%;
            transform: translateX(-50%);
        }

        &__line {
            width: 40px;
            height: 3px;
            border-radius: 20px;
            margin-bottom: 5px;
            background: $primary;
        }

        &.active &__line {
            background: $white;
        }
    }
</style>