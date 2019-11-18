<template>
    <div>
    <div class="flashcard">{{flashcardValue}}
        <div 
            class="flashcard__translation"
            v-bind:class="{active: isTranslationActive}"
        >
            {{flashcardTranslation}}
        </div>
    </div>
    <Button 
        v-bind:buttonName="button"
        v-on:clickButton="showTranslation"
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
            flashcardValue: 'Word',
            flashcardTranslation: 'Translation',
            isTranslationActive: false,
        };
    },
    methods: {
        showTranslation() {
            return this.isTranslationActive = !this.isTranslationActive;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .flashcard {
        background: $primary;
        color: $white;
        padding: 50px 20px;
        max-width: 400px;
        margin: 0 auto 20px;
        position: relative;
        font-size: 20px;

        @media only screen and (min-width: 768px) {
            font-size: 30px;
        }

        &__translation {
            position: absolute;
            bottom: 20px;
            left: 50%;
            font-size: 14px;
            transform: translate(-50%, -20px);
            background: $white;
            padding: 4px 9px;
            color: $primary;
            opacity: 0;
            transition: opacity .4s, transform .4s;

            &.active {
                opacity: 1;
                transform: translate(-50%, 0);
            }

            @media only screen and (min-width: 768px) {
                font-size: 20px;
            }
        }
    }
</style>