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
import store from '../../store/index.js';

export default {
    name: 'Dictionary',
    components: {
        VTable,
        Dropdown
    },
    methods: {
        cardsByLanguage(lang) {
            return store.state.languages.filter(language => {
                if(language.name === lang) {
                    return language.cards.forEach(card => {
                        return store.state.dictionary.push(card);
                    });
                }
            })
        },
        selectChanges($event) {
            store.state.dictionary = [];
            store.state.defaultLanguage = event.target.value;
            this.cardsByLanguage(store.state.defaultLanguage);
        }
    },
    created: function() {
        store.state.defaultLanguage = store.state.languages[0].name;
        this.cardsByLanguage(store.state.defaultLanguage);
    },
    data() {
        return {
            sharedState: store.state,
        };
    },
    computed: {
        dictionary() {
            return store.state.dictionary;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>