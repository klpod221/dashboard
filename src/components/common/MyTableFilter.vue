<template>
  <form
    @submit.prevent="$emit('submit')"
    class="flex flex-wrap items-left gap-2 flex-col sm:flex-row sm:items-center"
  >
    <!-- input -->
    <input
      v-model="query.search"
      type="text"
      class="py-3 px-5 rounded-md text-sm focus:outline-none w-auto bg-gray-100 shadow-md"
      placeholder="Search..."
    />

    <!-- option -->
    <select
      v-for="option in optionList"
      @change="$emit('submit')"
      :key="option"
      v-model="query[option]"
      class="py-3 px-5 rounded-md text-sm focus:outline-none w-auto bg-gray-100 shadow-md"
    >
      <option value="">{{ option }}</option>
      <option v-for="item in options[option]" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>

    <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md text-sm">
      <font-awesome-icon icon="search" class="mr-2" />
      Search
    </button>
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
    options: {
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
    optionList() {
      return Object.keys(this.options);
    },
  },
};
</script>
