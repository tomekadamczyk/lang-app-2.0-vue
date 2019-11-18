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
        v-bind:buttonName="btnWordValue"
        v-on:clickButton="showTranslation"
    />
    <Button 
        v-bind:buttonName="btnNextValue"
        v-on:clickButton="getCard"
        class="ml-3"
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
            cards: [
                { value: 'word', translation: 'slowo' },
                { value: 'tramwaj', translation: 'tramvaj' },
                { value: 'spodnie', translation: 'kalhoty' },
                { value: 'kurtka', translation: 'bunda' },
                { value: 'góry', translation: 'hory' },
            ],
            btnWordValue: 'Check translation',
            btnNextValue: 'Next word',
            flashcardValue: 'Word',
            flashcardTranslation: 'Translation',
            isTranslationActive: false,
        };
    },
    methods: {
        showTranslation() {
            return this.isTranslationActive = true;
        },
        getRandomNumber(arr) {
            const arrLength = arr.length;
            const random = Math.floor(Math.random() * arrLength);
            return random;
        },
        generateNewCard() {
            const card = this.cards[this.getRandomNumber(this.cards)];
            this.flashcardValue = card.value;
            this.flashcardTranslation = card.translation;
        },
        hideTranslation() {
            return this.isTranslationActive = false;
        },
        getCard() {
            this.hideTranslation();
            this.generateNewCard();
        },
    },
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
            transition: opacity 0s, transform 0s;

            &.active {
                opacity: 1;
                transform: translate(-50%, 0);
                transition: opacity .4s, transform .4s;
            }

            @media only screen and (min-width: 768px) {
                font-size: 20px;
            }
        }
    }
</style>