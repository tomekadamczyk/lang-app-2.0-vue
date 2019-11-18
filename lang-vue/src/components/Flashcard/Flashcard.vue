<template>
    <div>
    <div class="flashcard">Flashcard</div>
    <Button 
        v-bind:buttonName="button"
    />
    </div>
</template>

<script>
import Button from '../UI/Button/Button.vue';
export default {
    name: 'Flashcard',
    components: {
        Button,
    },
    data() {
        return {
            button: 'Check translation',
        };
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .flashcard {
        background: $primary;
        color: $white;
        padding: 20px;
        max-width: 400px;
        margin: 0 auto 20px;

        @media only screen and (min-width: 768px) {
            font-size: 20px;
        }
    }
</style>