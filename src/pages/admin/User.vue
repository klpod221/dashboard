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
            <th scope="col" class="px-4 py-3">Name</th>
            <th scope="col" class="px-4 py-3">Email</th>
            <th scope="col" class="px-4 py-3">Created At</th>
            <th scope="col" class="px-4 py-3 text-center">Role</th>
            <th scope="col" class="px-4 py-3 text-center">Status</th>
            <th scope="col" class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <template v-if="isLoading">
          <tbody>
            <!-- loading skeleton -->
            <tr v-for="n in 5" :key="n" class="border-b border-gray-200 last:border-none">
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
              <td class="p-4">
                <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md"></div>
              </td>
            </tr>
          </tbody>
        </template>

        <template v-else>
          <tbody v-if="userList.length > 0" class="divide-y divide-gray-200">
            <tr
              v-for="user in userList"
              :key="user.id"
              class="border-b border-gray-200 last:border-none"
            >
              <td class="p-4 font-medium">
                {{ user.name }}
              </td>
              <td class="p-4">
                {{ user.email }}
              </td>
              <td class="p-4 whitespace-nowrap">
                {{ $formats.dateTime(user.createdAt) }}
              </td>
              <td class="p-4 capitalize text-center">
                {{ user.roles }}
              </td>
              <td class="p-4 text-center">
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
              <td class="p-4 text-center">
                <button
                  @click="toggleUpdateModal(user)"
                  class="text-blue-600 hover:text-blue-900 mr-2"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <button
                  v-if="user.status === 'active'"
                  @click="toggleUpdateModal(user)"
                  class="text-red-600 hover:text-red-900"
                >
                  <font-awesome-icon icon="lock" />
                </button>
                <button
                  v-else
                  @click="toggleUpdateModal(user)"
                  class="text-green-600 hover:text-green-900"
                >
                  <font-awesome-icon icon="unlock-alt" />
                </button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center py-4">No data available</td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>
  </my-card>

  <!-- pagination -->
  <div class="flex items-center mt-4">
    <my-pagination :pagination="pagination" @change="getUserList" />
  </div>

  <!-- modal -->
  <my-side-modal
    header="Add user"
    :is-open="isOpenAddModal"
    @close="toggleAddModal"
    custom-class="w-80"
  >
    <user-form v-model="addUserForm" :is-create="true" @submit="onAddUserSubmit" />
  </my-side-modal>

  <my-side-modal
    :header="`Update user ${updateUserForm.name}`"
    :is-open="isOpenUpdateModal"
    @close="toggleUpdateModal"
    custom-class="w-80"
  >
    <user-form v-model="updateUserForm" @submit="onUpdateUserSubmit" />
  </my-side-modal>
</template>

<script>
import MySideModal from '../../components/common/MySideModal.vue';
import UserForm from '../../components/forms/UserForm.vue';
import { USER_STATUS, USER_ROLE } from '../../constants/options';

export default {
  name: 'UserPage',
  components: {
    UserForm,
    MySideModal,
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
      addUserForm: {},
      updateUserForm: {},
      isOpenAddModal: false,
      isOpenUpdateModal: false,
      options: {
        status: USER_STATUS,
        roles: USER_ROLE,
      },
      isLoading: false,
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
    toggleAddModal() {
      this.isOpenAddModal = !this.isOpenAddModal;
    },
    async onAddUserSubmit() {
      try {
        this.$loading.show();
        const formData = { ...this.addUserForm };

        await this.$service.users.create(formData);

        this.getUserList();

        this.isOpenAddModal = false;
        this.$toast.success('User has been created');
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    },
    toggleUpdateModal(user) {
      this.updateUserForm = { ...user };
      this.isOpenUpdateModal = !this.isOpenUpdateModal;
    },
    async onUpdateUserSubmit() {
      try {
        this.$loading.show();
        const formData = { ...this.updateUserForm };
        const { id } = formData;
        await this.$service.users.update(id, formData);

        this.getUserList();

        this.isOpenUpdateModal = false;
        this.$toast.success('User has been updated');
      } catch (error) {
        this.$toast.error(error);
      } finally {
        this.$loading.hide();
      }
    },
  },
};
</script>
