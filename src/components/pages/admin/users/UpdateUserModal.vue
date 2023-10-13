<template>
    <my-side-modal
    :header="`Update user ${user.name}`"
    :is-open="isOpenModal"
    @close="closeModal"
    custom-class="w-80"
  >
    <user-form v-model="userForm" @submit="onSubmit" />
  </my-side-modal>
</template>

<script>
import UserForm from '../../../forms/UserForm.vue';

export default {
  name: 'UpdateUserModal',
  components: {
    UserForm,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      userForm: {},
    };
  },
  computed: {
    isOpenModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  emits: ['update:modelValue', 'success'],
  watch: {
    user: {
      handler(value) {
        this.userForm = { ...value };
      },
      immediate: true,
    },
  },
  methods: {
    closeModal() {
      this.isOpenModal = false;
    },
    async onSubmit() {
      try {
        this.$loading.show();
        const formData = { ...this.userForm };

        await this.$service.users.update(this.user.id, formData);

        this.closeModal();

        this.$toast.success('User has been updated');
        this.$emit('success');
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    },
  },
}
</script>
