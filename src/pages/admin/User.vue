<template>
  <card-container>
    <div class="overflow-x-scroll">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase font-bold">
          <tr class="border-b border-gray-300">
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="user.id" class="border-b border-gray-200 last:border-none">
            <th scope="row" class="px-6 py-4">
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4 font-medium">
              {{ user.name }}
            </td>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ user.roles }}
            </td>
            <td class="px-6 py-4">
              <span v-if="user.status === 'active'" class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
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
      </table>
    </div>
  </card-container>
</template>

<script>
import CardContainer from '../../components/common/CardContainer.vue';

export default {
  name: 'UserPage',
  components: {
    CardContainer,
  },
  data() {
    return {
      userList: [],
      search: '',
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0,
      },
    };
  },
  methods: {
    async getUserList() {
      try {
        this.$loading.show();
        const { page, limit } = this.pagination;
        const { users, pagination } = await this.$service.user.getAll({
          page,
          limit,
          search: this.search,
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
  },
  mounted() {
    this.getUserList();
  },
};
</script>
