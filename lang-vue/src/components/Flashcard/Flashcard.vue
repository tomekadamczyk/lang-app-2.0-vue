<template>
    <div class="flashcard-container flex-center">
    <div class="flashcard">{{flashcardValue}}
        <div 
            class="flashcard__translation"
            v-bind:class="{active: isTranslationActive}"
        >
            {{flashcardTranslation}}
        </div>
    </div>
    <div class="flashcard__options">
        <Button 
            v-bind:buttonName="btnWordValue"
            v-on:clickButton="showTranslation"
            class="flashcard__button"
        />
        <Button 
            v-bind:buttonName="btnNextValue"
            v-on:clickButton="getCard"
            class="flashcard__button"
        />
        <Dropdown 
            v-on:selectChange="selectChanges"
        />
    </div>
    </div>
</template>

<script>
import Button from '../UI/Button/Button.vue';
import Dropdown from '../UI/Dropdown/Dropdown.vue';
export default {
    name: 'Flashcard',
    components: {
        Button,
        Dropdown
    },
    data() {
        return {
            languages: [
                { name: 'czech',
                  cards: [
                    { value: 'word', translation: 'slowo' },
                    { value: 'tramwaj', translation: 'tramvaj' },
                    { value: 'spodnie', translation: 'kalhoty' },
                    { value: 'kurtka', translation: 'bunda' },
                    { value: 'góry', translation: 'hory' },
                 ]
                },
                { name: 'english',
                  cards: [
                    { value: 'word', translation: 'słowo' },
                    { value: 'tramwaj', translation: 'train' },
                    { value: 'spodnie', translation: 'pants' },
                    { value: 'kurtka', translation: 'jacket' },
                    { value: 'góry', translation: 'mountains' },
                 ]
                },
                { name: 'german',
                  cards: [
                    { value: 'word', translation: 'slowen' },
                    { value: 'tramwaj', translation: 'tramvajen' },
                    { value: 'spodnie', translation: 'kalhoten' },
                    { value: 'kurtka', translation: 'kurtken' },
                    { value: 'góry', translation: 'góren' },
                 ]
                },
                { name: 'italian',
                  cards: [
                    { value: 'word', translation: 'slovacoo' },
                    { value: 'tramwaj', translation: 'tramvajo' },
                    { value: 'spodnie', translation: 'spodniento' },
                    { value: 'kurtka', translation: 'kurtkando' },
                    { value: 'góry', translation: 'górento' },
                 ]
                },
            ],
            btnWordValue: 'Check translation',
            btnNextValue: 'Next word',
            flashcardValue: null,
            flashcardTranslation: null,
            isTranslationActive: false,
            chosenCards: [],
            chosenLanguage: null,
        };
    },
    methods: {
        cardsByLanguage(lang) {
            return this.languages.filter(language => {
                if(language.name === lang) {
                    return language.cards.forEach(card => {
                        return this.chosenCards.push(card);
                    });
                }
            })
        },
        showTranslation() {
            return this.isTranslationActive = true;
        },
        getRandomNumber(arr) {
            const arrLength = arr.length;
            const random = Math.floor(Math.random() * arrLength);
            return random;
        },
        generateNewCard() {
            const card = this.chosenCards[this.getRandomNumber(this.chosenCards)];
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
        selectChanges($event) {
            this.chosenCards = [];
            this.chosenLanguage = event.target.value;
            this.cardsByLanguage(this.chosenLanguage);
        }
    },
    created: function() {
        this.chosenLanguage = this.languages[0].name;
        this.cardsByLanguage(this.chosenLanguage);
        this.getCard();
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

    .flashcard-container {
        flex-direction: column;

        @include media-screen(tablet-up) {
            flex-direction: row;
        }
    }

    .flashcard {
        background: $primary;
        color: $white;
        padding: 50px 20px;
        position: relative;
        font-size: 20px;
        margin-bottom: 10px;

        @media only screen and (min-width: 768px) {
            font-size: 30px;
            margin-bottom: 0;
            margin-right: 20px;
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

        &__options {
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        &__button {
            margin-bottom: 12px;
        }
    }
</style>