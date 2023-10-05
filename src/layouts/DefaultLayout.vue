<template>
  <div class="flex h-screen">

    <default-sidebar />

    <default-header />

    <main class="mt-14 p-3">
      <slot />
    </main>

  </div>
</template>

<script>
import DefaultHeader from '../components/layouts/DefaultHeader.vue';
import DefaultSidebar from '../components/layouts/DefaultSidebar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultSidebar,
  },
};
</script>
