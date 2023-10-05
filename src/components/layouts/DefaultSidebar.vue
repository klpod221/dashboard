<template>
  <div class="w-16 md:w-48 group hover:w-48 m-3 transition-all duration-300 shadow-md">
    <div
      class="flex flex-col items-center w-full h-full overflow-hidden text-gray-700 bg-gray-100 rounded-md"
    >
      <a class="flex items-center justify-center w-auto md:w-full px-3 mt-3" href="#">
        <font-awesome-icon icon="coins" class="text-2xl text-indigo-500" />
        <span class="ml-2 text-sm font-bold hidden group-hover:block md:block"
          >Expense Tracker</span
        >
      </a>
      <div class="w-full px-2">
        <div
          v-for="group in sidebarGroup"
          :key="group"
          class="flex flex-col items-center w-full mt-3 border-t border-gray-300"
        >
          <sidebar-item
            v-for="item in group"
            :key="item.text"
            :icon="item.icon"
            :text="item.text"
            :route="item.route"
            :isActive="item.isActive"
          />
        </div>
      </div>
      <a
        class="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
        href="#"
      >
        <font-awesome-icon
          icon="user"
          class="text-base w-4 border border-gray-900 p-1 rounded-full"
        />
        <span class="ml-2 text-sm font-medium hidden group-hover:block md:block">Account</span>
      </a>
    </div>
  </div>
</template>

<script>
import SidebarItem from '../common/SidebarItem.vue';

export default {
  name: 'DefaultSidebar',
  components: {
    SidebarItem,
  },
  data() {
    return {
      sidebarGroup: [
        [
          {
            icon: 'home',
            text: 'Dashboard',
            route: {
              name: 'home',
            },
            isActive: true,
          },
          {
            icon: 'chart-line',
            text: 'Insights'
          },
          {
            icon: 'file-alt',
            text: 'Docs'
          },
        ],
        [
          {
            icon: 'user-friends',
            text: 'Team'
          },
          {
            icon: 'cog',
            text: 'Settings'
          },
        ],
      ],
    };
  },
};
</script>
