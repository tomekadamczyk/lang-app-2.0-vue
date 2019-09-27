<template>
    <li class="nav-item">
      <router-link to="linkUrl">{{linkName}}</router-link>
    </li>
</template>

<script>
export default {
    name: 'NavigationItem',
    props: {
        name: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    data() {
        return {
            linkName: this.name,
            linkUrl: this.url,
        };
    },
};
</script>

<style lang="scss" scoped>
    .nav-item {
        a {
            color: #fff;
            text-decoration: none;
            display: block;
            width: 100%;
            padding: 5px 8px;
        }
    }
</style>
