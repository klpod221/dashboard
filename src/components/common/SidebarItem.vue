<template>
  <a
    class="flex items-center md:justify-start justify-center w-full h-12 px-3 mt-2 rounded-md hover:bg-gray-300 group-hover:justify-start cursor-pointer"
    :class="{
      'bg-gray-300': isActive,
    }"
    @click.prevent="$router.push(route)"
  >
    <font-awesome-icon :icon="icon" class="text-base w-4" />
    <span class="ml-2 text-sm font-medium hidden group-hover:block md:block">{{ text }}</span>
  </a>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    route: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
