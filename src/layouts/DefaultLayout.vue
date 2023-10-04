<template>
  <default-header />

  <main class="main">
    <slot />
  </main>

  <default-sidebar />
</template>

<script>
import DefaultHeader from '@/components/layouts/DefaultHeader.vue'
import DefaultSidebar from '@/components/layouts/DefaultSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultSidebar,
  },
};
</script>
