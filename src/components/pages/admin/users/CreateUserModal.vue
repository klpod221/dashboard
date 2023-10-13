<template>
  <my-side-modal
    header="Add user"
    :is-open="isOpen"
    @close="closeModal"
    custom-class="w-80"
  >
    <user-form v-model="userForm" :is-create="true" @submit="onSubmit" />
  </my-side-modal>
</template>

<script>
import UserForm from '../../../forms/UserForm.vue';

export default {
  name: 'CreateUserModal',
  components: {
    UserForm,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userForm: {},
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  emits: ['update:modelValue', 'success'],
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    async onSubmit() {
      try {
        this.$loading.show();
        const formData = { ...this.addUserForm };

        await this.$service.users.create(formData);

        this.closeModal();

        this.$toast.success('User has been created');
        this.$emit('success');
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    }
  }
}
</script>
