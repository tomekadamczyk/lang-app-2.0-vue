<template>
    <div>
        <NounTable v-bind:counting="singular" />
        <NounTable v-bind:counting="plural" />
    </div>
</template>

<script>
import NounTable from './NounTable/NounTable.vue';

export default {
  name: 'WordView',
  components: {
    NounTable,
  },
  data() {
    return {
      singular: 'lp',
      plural: 'lm',
    };
  },
};
</script>

<style lang="sass" scoped>

</style>
