<template>
  <div class="addWord">
      <AddWord />
  </div>
</template>

<script>
// @ is an alias to /src
import AddWord from '../components/AddWord/AddWord.vue';

export default {
  name: 'addWord',
  components: {
    AddWord,
  },
};
</script>
