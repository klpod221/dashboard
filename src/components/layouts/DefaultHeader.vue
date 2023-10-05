<template>
  <header class="bg-gray-300 fixed left-0 right-0 top-0 w-full">
    <div
      class="flex items-center justify-between m-3 sm:ml-22 md:ml-56 h-12 rounded-md bg-gray-100 p-3"
    >
      <div class="flex items-center">
        <button @click="toggleSidebar" class="text-gray-700 focus:outline-none">
          <svg
            class="w-6 h-6 sm:hidden md:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 4.5C3 4.22386 3.22386 4 3.5 4H16.5C16.7761 4 17 4.22386 17 4.5C17 4.77614 16.7761 5 16.5 5H3.5C3.22386 5 3 4.77614 3 4.5ZM3 9.5C3 9.22386 3.22386 9 3.5 9H16.5C16.7761 9 17 9.22386 17 9.5C17 9.77614 16.7761 10 16.5 10H3.5C3.22386 10 3 9.77614 3 9.5ZM3.5 14C3.22386 14 3 14.2239 3 14.5C3 14.7761 3.22386 15 3.5 15H16.5C16.7761 15 17 14.7761 17 14.5C17 14.2239 16.7761 14 16.5 14H3.5Z"
            />
          </svg>
        </button>

        <!-- page title -->
        <div class="ml-2 sm:m-0 text-xl font-bold hidden sm:block md:block">
          {{ title }}
        </div>
      </div>

      <!-- user profile -->
      <div class="flex items-center group relative cursor-pointer">
        <!-- hi, user name -->
        <div class="mr-2 text-sm font-medium sm:hidden group-hover:sm:block md:block">
          Hi, <span class="font-bold">{{ currentUser?.name }}</span>
        </div>

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

        <!-- drop-down -->
        <div
          class="absolute right-0 top-8 w-44 bg-white border border-gray-300 rounded-md shadow-md group-hover:block hidden"
        >
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <font-awesome-icon icon="user" class="mr-2 w-4" /> Profile
          </a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <font-awesome-icon icon="cog" class="mr-2 w-4" /> Settings
          </a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <font-awesome-icon icon="sign-out-alt" class="mr-2 w-4" /> Logout
          </a>
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
    };
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
  },
};
</script>
