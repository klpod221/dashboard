<template>
  <header class="bg-gray-300 fixed left-0 right-0 top-0 w-full z-20">
    <div
      class="flex items-center justify-between m-3 sm:ml-22 md:ml-56 h-12 rounded-md bg-gray-100 p-3 shadow-md"
    >
      <div class="flex items-center">
        <button @click="toggleSidebar" class="text-gray-700 focus:outline-none">
          <font-awesome-icon icon="bars" class="text-lg block sm:hidden" />
        </button>

        <!-- page title -->
        <div class="ml-2 sm:m-0 text-xl font-bold hidden sm:block md:block">
          {{ title }}
        </div>
      </div>

      <!-- timer and weather -->
      <div class="flex items-center text-sm font-medium">
        {{ datetime }}
      </div>

      <div class="flex items-center">
        <!-- notification -->
        <div class="flex items-center mr-6 relative">
          <font-awesome-icon icon="bell" class="text-lg" />

          <!-- notification badge -->
          <div class="absolute z-50 -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>

        <!-- user profile -->
        <div class="flex items-center group relative cursor-pointer">
          <!-- avatar with dropdown when hover avatar -->
          <img
            src="https://picsum.photos/200"
            class="w-8 h-8 rounded-full"
            v-if="!currentUser?.avatar"
          />
          <font-awesome-icon
            icon="user"
            class="text-base w-4 border border-gray-900 p-1 rounded-full"
            v-else
          />

          <!-- hi, user name -->
          <div class="ml-2 text-sm font-medium sm:hidden group-hover:sm:block md:block">
            Hi, <span class="font-bold">{{ currentUser?.name }}</span>
          </div>

          <!-- drop-down -->
          <div
            class="absolute z-50 left-0 top-8 w-100 bg-white border border-gray-300 rounded-md shadow-md group-hover:block hidden"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <font-awesome-icon icon="user" class="mr-2 w-4" /> Profile
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <font-awesome-icon icon="cog" class="mr-2 w-4" /> Settings
            </a>
            <a
              @click.prevent="logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <font-awesome-icon icon="sign-out-alt" class="mr-2 w-4" /> Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'DefaultHeader',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: this.$route.meta.title,
      datetime: '',
    };
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  created() {
    this.timer = setInterval(() => {
      // Oct 10, 2021 10:10:10
      const format = 'MMM DD, HH:mm:ss';
      this.datetime = this.$moment().format(format);
    }, 1000);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    $route() {
      this.title = this.$route.meta.title;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
