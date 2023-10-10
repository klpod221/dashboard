<template>
  <!-- filter -->
  <div
    class="flex flex-col items-left justify-between gap-x-2 gap-y-4 mb-4 sm:gap-y-2 sm:flex-row sm:items-center"
  >
    <form
      @submit.prevent="getUserList"
      class="flex flex-wrap items-left gap-2 flex-col sm:flex-row sm:items-center"
    >
      <!-- input -->
      <input
        v-model="query.search"
        type="text"
        class="py-3 px-5 rounded-md text-sm focus:outline-none w-auto bg-gray-100 shadow-md"
        placeholder="Search..."
      />

      <!-- select option -->
      <select
        v-model="query.status"
        class="py-3 px-5 rounded-md text-sm focus:outline-none bg-gray-100 shadow-md"
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <!-- select option -->
      <select
        v-model="query.roles"
        class="py-3 px-5 rounded-md text-sm focus:outline-none bg-gray-100 shadow-md"
      >
        <option value="">Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <!-- button -->
      <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md text-sm">
        <font-awesome-icon icon="search" class="mr-2" />
        Search
      </button>
    </form>

    <!-- button -->
    <button
      @click="toggleAddModal"
      class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md text-sm"
    >
      <font-awesome-icon icon="plus" class="mr-2" />
      Add User
    </button>
  </div>

  <my-card>
    <div class="overflow-x-scroll">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase font-medium">
          <tr class="border-b border-gray-300">
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Created At</th>
            <th scope="col" class="px-6 py-3 text-center">Role</th>
            <th scope="col" class="px-6 py-3 text-center">Status</th>
            <th scope="col" class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="userList.length > 0" class="divide-y divide-gray-200">
          <tr
            v-for="user in userList"
            :key="user.id"
            class="border-b border-gray-200 last:border-none"
          >
            <td scope="row" class="px-6 py-4 group">
              <span class="group-hover:hidden">
                {{ user.id.slice(0, 5) + '...' }}
              </span>
              <span class="hidden group-hover:inline">
                {{ user.id }}
              </span>
            </td>
            <td class="px-6 py-4 font-medium">
              {{ user.name }}
            </td>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ $formats.dateTime(user.createdAt) }}
            </td>
            <td class="px-6 py-4 capitalize text-center">
              {{ user.roles }}
            </td>
            <td class="px-6 py-4 text-center">
              <span
                v-if="user.status === 'active'"
                class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
              >
                {{ user.status }}
              </span>
              <span v-else class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <button class="text-blue-600 hover:text-blue-900 mr-2">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <button class="text-red-600 hover:text-red-900">
                <font-awesome-icon :icon="['fas', 'lock']" />
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7" class="text-center py-4">No data available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </my-card>

  <!-- pagination -->
  <div class="flex items-center mt-4">
    <my-pagination :pagination="pagination" @change="getUserList" />
  </div>

  <!-- modal -->
  <my-side-modal header="Add user" :is-open="isOpenAddModal" @close="toggleAddModal" custom-class="w-80">
    <add-user-form />
  </my-side-modal>
</template>

<script>
import AddUserForm from '../../components/pages/users/AddUserForm.vue';

export default {
  name: 'UserPage',
  components: {
    AddUserForm,
  },
  data() {
    return {
      userList: [],
      query: {
        search: '',
        status: '',
        roles: '',
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      },
      isOpenAddModal: false,
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      try {
        this.$loading.show();
        const { page, limit } = this.pagination;
        const { users, pagination } = await this.$service.user.getAll({
          page,
          limit,
          ...this.query,
        });
        this.userList = users;
        this.pagination = pagination;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      } finally {
        this.$loading.hide();
      }
    },
    toggleAddModal() {
      this.isOpenAddModal = !this.isOpenAddModal;
    },
  },
};
</script>
