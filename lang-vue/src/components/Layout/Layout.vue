<template>
    <main class="layout">
<Hamburger/>
        <slot/>
    </main>
</template>

<script>

export default {
    name: 'Layout',
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .layout {
        width: 100%;
        height: auto;

        @include media-screen(tablet-up) {
            width: calc(100% - 180px);
            height: 100vh;
        }

        @include media-screen(desktop-up) {
            width: calc(100% - 250px);
        }
    }
</style>