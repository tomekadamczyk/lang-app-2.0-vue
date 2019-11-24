<template>
    <div>
        <Dropdown 
            v-on:selectChange="selectChanges"
        />
        <VTable 
            v-bind:dictionary="dictionary"
        />
    </div>
</template>

<script>
import VTable from '../UI/Table/VTable.vue';
import Dropdown from '../UI/Dropdown/Dropdown.vue';

export default {
    name: 'Dictionary',
    components: {
        VTable,
        Dropdown
    },
    methods: {
        cardsByLanguage(lang) {
            return this.languages.filter(language => {
                if(language.name === lang) {
                    return language.cards.forEach(card => {
                        return this.dictionary.push(card);
                    });
                }
            })
        },
        selectChanges($event) {
            this.dictionary = [];
            this.chosenLanguage = event.target.value;
            this.cardsByLanguage(this.chosenLanguage);
        }
    },
    created: function() {
        this.chosenLanguage = this.languages[0].name;
        this.cardsByLanguage(this.chosenLanguage);
    },
    data() {
        return {
            chosenLanguage: 'czech',
            dictionary: [],
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>