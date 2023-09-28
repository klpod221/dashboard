<template>
  <main>
    <h1>Home</h1>
    <p>Home page content</p>
  </main>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'HomeView',
  mounted() {
    if ($) {
      console.log('jQuery is loaded');
    }
  },
};
</script>
