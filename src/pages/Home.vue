<template>
  <CardContainer>
    <h1>Home</h1>
    <p>Welcome, {{ currentUser?.name }}</p>
    <button @click="logout">Logout</button>
  </CardContainer>
</template>

<script>
import CardContainer from '../components/common/CardContainer.vue';

export default {
  name: 'HomePage',
  components: {
    CardContainer,
  },
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
