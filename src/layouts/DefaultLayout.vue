<template>
  <default-header />

  <main class="main">
    <slot />
  </main>

  <default-footer />
</template>

<script>
import DefaultHeader from '@/components/layouts/DefaultHeader.vue';
import DefaultFooter from '@/components/layouts/DefaultFooter.vue';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultFooter,
  },
};
</script>
