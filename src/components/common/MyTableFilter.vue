<template>
  <form class="flex flex-wrap items-left gap-2 flex-col sm:flex-row sm:items-center">
    <!-- input -->
    <input
      v-model="query.search"
      type="text"
      class="py-3 px-5 rounded-md text-sm focus:outline-none w-auto bg-gray-100 shadow-md"
      placeholder="Search..."
    />
    <slot />
  </form>
</template>

<script>
export default {
  name: 'MyTableFilter',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    query: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
