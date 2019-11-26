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
import store from '../../store.js';

export default {
    name: 'Dictionary',
    components: {
        VTable,
        Dropdown
    },
    methods: {
        onUpdateDictionary(langName) {
            this.$store.dispatch('updateDictionary', langName);
        },
        selectChanges($event) {
            store.state.dictionary = [];
            store.state.defaultLanguage = event.target.value;
            this.onUpdateDictionary(store.state.defaultLanguage)
        }
    },
    created: function() {
        store.state.dictionary = [];
        store.state.defaultLanguage = store.state.languages[0].name;
        this.onUpdateDictionary(store.state.defaultLanguage);
    },
    data() {
        return {
            sharedState: store.state,
        };
    },
    computed: {
        dictionary() {
            return this.$store.state.dictionary;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";

</style>