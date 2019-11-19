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
    <Dropdown 
        v-on:selectChange="selectChanges"
    />
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
            flashcardValue: 'Pick a word',
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