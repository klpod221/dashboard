<template>
  <main class="flex items-center justify-center h-screen overflow-hidden">
    <div class="w-full max-w-xs">
      <h1 class="mb-5 text-3xl font-bold text-center">XLU Studio</h1>
      <form-validate
        @submit="onSubmit"
        :validation-schema="validationSchema"
        v-slot="{ errors }"
        class="bg-gray-100 shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="email">Email</label>
          <field
            type="email"
            name="email"
            autofocus
            placeholder="Email"
            class="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.email }"
          />
          <p class="text-red-500 text-xs italic mt-2">{{ errors.email }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2" for="password">Password</label>
          <field
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="******************"
            class="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.password }"
          />
          <p class="text-red-500 text-xs italic mt-2">{{ errors.password }}</p>
        </div>
        <div class="flex items-center w-full">
          <button
            class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form-validate>
      <p class="text-center text-gray-500 text-xs">&copy;2023 XLU Studio. All rights reserved.</p>
    </div>
  </main>
</template>

<script>
import { Form as FormValidate, Field } from 'vee-validate';

export default {
  name: 'AuthPage',
  components: {
    FormValidate,
    Field,
  },
  data() {
    return {
      validationSchema: {
        email: 'required|email',
        password: 'required|password',
      },
    };
  },
  methods: {
    async onSubmit(values) {
      try {
        this.$loading.show();
        await this.$store.dispatch('auth/login', values);
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    },
  },
};
</script>
