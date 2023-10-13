<template>
  <div
    class="flex flex-col items-left justify-between gap-x-2 gap-y-4 mb-4 sm:gap-y-2 sm:flex-row sm:items-center"
  >
    <!-- filter -->
    <my-table-filter
      v-model="query"
    >
      <!-- select option -->
      <select
        v-model="query.status"
        @change="getUserList"
        class="py-3 px-5 rounded-md text-sm focus:outline-none bg-gray-100 shadow-md"
      >
        <option value="">Status</option>
        <option v-for="option in options.status" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- select option -->
      <select
        v-model="query.roles"
        @change="getUserList"
        class="py-3 px-5 rounded-md text-sm focus:outline-none bg-gray-100 shadow-md"
      >
        <option value="">Role</option>
        <option v-for="option in options.roles" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- button -->
      <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md text-sm">
        <font-awesome-icon icon="search" class="mr-2" />
        Search
      </button>
    </my-table-filter>

    <!-- button -->
    <button
      @click="toggleCreateModal"
      class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md text-sm"
    >
      <font-awesome-icon icon="plus" class="mr-2" />
      Create User
    </button>
  </div>

  <my-card>
    <my-table :headers="tableHeaders" :is-loading="isLoading" :data="userList">
      <template #createdAt="{ item }">
        {{ $formats.dateTime(item.createdAt) }}
      </template>
      <template #status="{ item }">
        <span
          v-if="item.status === 'active'"
          class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
        >
          {{ item.status }}
        </span>
        <span v-else class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
          {{ item.status }}
        </span>
      </template>
      <template #actions="{ item }">
        <button @click="toggleUpdateModal(item)" class="text-blue-600 hover:text-blue-900 mr-2">
          <font-awesome-icon icon="edit" />
        </button>
        <button
          v-if="item.status === 'active'"
          @click="updateUserStatus(item)"
          class="text-red-600 hover:text-red-900"
        >
          <font-awesome-icon icon="lock" />
        </button>
        <button v-else @click="updateUserStatus(item)" class="text-green-600 hover:text-green-900">
          <font-awesome-icon icon="unlock-alt" />
        </button>
      </template>
    </my-table>
  </my-card>

  <!-- pagination -->
  <div class="flex items-center mt-4">
    <my-pagination :pagination="pagination" @change="getUserList" />
  </div>

  <!-- modal -->
  <create-user-modal v-model="isOpenCreateModal" @success="getUserList" />
  <update-user-modal v-model="isOpenUpdateModal" :user="selectedUser" @success="getUserList" />
</template>

<script>
import CreateUserModal from '../../components/pages/admin/users/CreateUserModal.vue';
import UpdateUserModal from '../../components/pages/admin/users/UpdateUserModal.vue';
import { USER_STATUS, USER_ROLE } from '../../constants/options';

export default {
  name: 'UserPage',
  components: {
    CreateUserModal,
    UpdateUserModal,
  },
  data() {
    return {
      userList: [],
      query: {
        search: '',
        status: '',
        roles: '',
      },
      pagination: {},
      selectedUser: {},
      isOpenCreateModal: false,
      isOpenUpdateModal: false,
      options: {
        status: USER_STATUS,
        roles: USER_ROLE,
      },
      isLoading: false,
      tableHeaders: [
        { label: 'Name', slot: 'name' },
        { label: 'Email', slot: 'email' },
        { label: 'Created At', slot: 'createdAt', class: 'whitespace-nowrap' },
        { label: 'Role', slot: 'roles', class: 'text-center' },
        { label: 'Status', slot: 'status', class: 'text-center' },
        { label: 'Actions', slot: 'actions', class: 'text-center' },
      ],
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      try {
        this.isLoading = true;
        const { page, limit } = this.pagination;
        const { users, pagination } = await this.$service.users.getAll({
          page,
          limit,
          ...this.query,
        });
        this.userList = users;
        this.pagination = pagination;
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleCreateModal() {
      this.isOpenCreateModal = !this.isOpenCreateModal;
    },
    toggleUpdateModal(user) {
      this.selectedUser = user;
      this.isOpenUpdateModal = !this.isOpenUpdateModal;
    },
    async updateUserStatus(user) {
      try {
        const confirm = await this.$toast.confirm(
          `Do you want to ${user.status === 'active' ? 'lock' : 'unlock'} this user?`
        );

        if (!confirm) return;

        this.$loading.show();

        await this.$service.users.updateStatus(user.id);

        this.getUserList();
        this.$toast.success('User status has been updated');
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    },
  },
};
</script>
