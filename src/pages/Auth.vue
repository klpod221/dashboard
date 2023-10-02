<template>
  <main class="flex items-center justify-center h-screen bg-gray-200">
    <div class="flex flex-col w-full max-w-sm p-10 bg-white rounded-lg shadow-md">
      <h1 class="mb-5 text-3xl font-bold text-center">Expense Tracker</h1>
      <form @submit.prevent="login">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input v-model="email" type="email" id="email" autofocus class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input v-model="password" type="password" id="password" autocomplete="current-password" class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-5">
          <button type="button" @click="login" class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Login</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AuthPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const data = {
        email: this.email,
        password: this.password
      };

      if (!data.email || !data.password) {
        console.log('Email and password are required');
        return;
      }

      try {
        await this.$store.dispatch('auth/login', data);
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'Login failed!',
          text: error.response.data.message || 'Something went wrong!'
        });
      }
    }
  }
}
</script>
