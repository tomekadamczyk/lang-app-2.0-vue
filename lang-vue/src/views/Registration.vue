<template>
  <div class="registration">
      <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '../components/Register/Register.vue';

export default {
  name: 'register',
  components: {
    Register,
  },
};
</script>

<style lang="scss" scoped>
  .registration {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
