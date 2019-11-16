<template>
    <li class="nav-item">
      <router-link :to="linkUrl">{{linkName}}</router-link>
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
@import "../../../../assets/scss/style.scss";

    .nav-item {
        a {
            color: $white;
            text-decoration: none;
            display: block;
            width: 100%;
            padding: 8px 38px;
            line-height: 1;

            &:hover {
                background: lighten($primary, 15%);
            }
        }
    }
</style>
