<template>
  <div class="flex flex-col relative">
    <form-validate
      @submit="onSubmit"
      :validation-schema="validationSchema"
      v-slot="{ errors }"
      class="flex flex-col gap-2"
    >
      <div>
        <label for="name" class="block text-sm font-medium mb-2"> Name </label>
        <field
          v-model="userFormData.name"
          type="text"
          name="name"
          placeholder="Name"
          class="shadow bg-white appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': errors.name }"
        />
        <p class="text-red-500 text-xs italic mt-2">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium mb-2"> Email </label>
        <field
          v-model="userFormData.email"
          type="email"
          name="email"
          placeholder="Email"
          class="shadow bg-white appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': errors.email }"
        />
        <p class="text-red-500 text-xs italic mt-2">{{ errors.email }}</p>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium mb-2">
          Password
        </label>
        <field
          v-model="userFormData.password"
          type="password"
          name="password"
          placeholder="******************"
          class="shadow bg-white appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': errors.password }"
        />
        <p class="text-red-500 text-xs italic mt-2">{{ errors.password }}</p>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="status" class="block text-sm font-medium mb-2"> Status </label>
          <field
            v-model="userFormData.status"
            name="status"
            as="select"
            placeholder="Status"
            class="shadow bg-white border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.status }"
          >
            <option value="">Status</option>
            <option v-for="option in options.status" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </field>
          <p class="text-red-500 text-xs italic mt-2">{{ errors.status }}</p>
        </div>

        <div>
          <label for="roles" class="block text-sm font-medium mb-2"> Roles </label>
          <field
            v-model="userFormData.roles"
            name="roles"
            as="select"
            placeholder="Roles"
            class="shadow bg-white border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.roles }"
          >
            <option value="">Roles</option>
            <option v-for="option in options.roles" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </field>
          <p class="text-red-500 text-xs italic mt-2">{{ errors.roles }}</p>
        </div>
      </div>

      <div class="flex items-center w-full">
        <button
          class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form-validate>
  </div>
</template>

<script>
import { Form as FormValidate, Field } from 'vee-validate';
import { USER_STATUS, USER_ROLE } from '../../constants/options';

export default {
  name: 'UserForm',
  components: {
    FormValidate,
    Field,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validationSchema: {
        name: 'required',
        email: 'required|email',
        password: this.isCreate ? 'required|password' : 'password',
        status: 'required',
        roles: 'required',
      },
      options: {
        status: USER_STATUS,
        roles: USER_ROLE,
      },
    };
  },
  computed: {
    userFormData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.userFormData);
    },
  },
};
</script>
