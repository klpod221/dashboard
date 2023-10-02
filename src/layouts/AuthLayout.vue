<template>
  <main class="auth">
    <slot />
  </main>

  <auth-footer />
</template>

<script>
import AuthFooter from '../components/layouts/AuthFooter.vue';

export default {
  name: 'AuthLayout',
  components: {
    AuthFooter,
  },
};
</script>
