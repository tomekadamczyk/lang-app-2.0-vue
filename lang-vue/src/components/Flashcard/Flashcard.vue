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
import store from '../../store.js';

export default {
  name: 'Flashcard',
  components: {
    Button,
    Dropdown,
  },
  data() {
    return {
      btnWordValue: 'Check translation',
      btnNextValue: 'Next word',
      flashcardValue: null,
      flashcardTranslation: null,
      isTranslationActive: false,
    };
  },
  computed: {
    dictionary() {
      return this.$store.state.dictionary;
    },
  },
  methods: {
    onUpdateDictionary(langName) {
      this.$store.dispatch('updateDictionary', langName);
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
      const card = this.dictionary[this.getRandomNumber(store.state.dictionary)];
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
      store.state.dictionary = [];
      store.state.defaultLanguage = event.target.value;
      this.onUpdateDictionary(store.state.defaultLanguage);
    },
  },
  created() {
    store.state.defaultLanguage = store.state.languages[0].name;
    this.onUpdateDictionary(store.state.defaultLanguage);
    this.getCard();
  },
};
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
        word-wrap: break-word;

        @include media-screen(tablet-up) {
            font-size: 30px;
            margin-bottom: 0;
            margin-right: 20px;
            width: 400px;
        }

        @include media-screen(desktop-up) {
            width: 500px;
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

            @include media-screen(tablet-up) {
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
