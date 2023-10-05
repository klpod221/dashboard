<template>
  <h1>Home</h1>
  <p>Welcome, {{ currentUser?.name }} {{ currentUser?.roles }}</p>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  name: 'HomeAdminPage',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
