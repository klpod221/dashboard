<template>
  <div class="flex h-screen">

    <default-sidebar :sidebar-open="sidebarOpen" />

    <default-header :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <main class="mt-14 ml-0 sm:ml-18 md:ml-52 p-3 pl-4 w-full">
      <slot />
    </main>

  </div>
</template>

<script>
import $ from 'jquery';
import DefaultHeader from '../components/layouts/DefaultHeader.vue';
import DefaultSidebar from '../components/layouts/DefaultSidebar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultSidebar,
  },
  data () {
    return {
      sidebarOpen: false,
    };
  },
  mounted () {
    if ($(window).width() < 768) {
      this.sidebarOpen = false;

      // Close sidebar when click outside
      $(document).mouseup(e => {
        const container = $('#default-sidebar');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          this.sidebarOpen = false;
        }
      });
    }
  },
  methods: {
    toggleSidebar () {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>
