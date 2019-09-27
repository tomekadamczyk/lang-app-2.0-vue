<template>
  <div class="dashboard">
    <VHeader msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VHeader from '@/components/VHeader.vue';

export default {
  name: 'dashboard',
  components: {
    VHeader,
  },
};
</script>
