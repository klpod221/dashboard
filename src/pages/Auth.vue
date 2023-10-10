<template>
  <main class="flex items-center justify-center h-screen overflow-hidden">
    <div class="flex flex-col w-full max-w-sm p-10 bg-white rounded-lg shadow-md">
      <h1 class="mb-5 text-3xl font-bold text-center">XLU Studio</h1>
      <FormValidate @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ errors }">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <Field
            type="email"
            name="email"
            autofocus
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <span class="text-red-500 text-xs"> {{ errors.email }} </span>
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-600"
            >Password</label
          >
          <Field
            type="password"
            name="password"
            autocomplete="current-password"
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <span class="text-red-500 text-xs"> {{ errors.password }} </span>
        </div>
        <div class="mb-5">
          <button
            class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      </FormValidate>
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
        this.$swal({
          icon: 'error',
          title: 'Login failed!',
          text: error.response.data.message || 'Something went wrong!',
        });
      } finally {
        this.$loading.hide();
      }
    },
  },
};
</script>
