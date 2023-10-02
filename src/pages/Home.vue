<template>
  <main>
    <h1>Home</h1>
    <p>Welcome, {{ currentUser?.name }}</p>
    <button @click="logout">Logout</button>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  middleware: 'auth',
  computed: {
    currentUser () {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
