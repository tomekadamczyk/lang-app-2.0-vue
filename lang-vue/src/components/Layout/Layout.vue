<template>
    <main class="layout">
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
        width: calc(100% - 250px);
    height: 100vh;
    }
</style>