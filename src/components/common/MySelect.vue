<template>
  <!-- my select -->
  <div class="relative">
    <select
      v-model="value"
      class="rounded-md pl-3 py-3 pr-6 text-sm focus:outline-none w-auto bg-gray-100 shadow-md appearance-none"
    >
      <option value="" selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <font-awesome-icon
      icon="chevron-down"
      class="absolute text-xs right-2 top-1/2 transform -translate-y-1/2"
    />
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select...'
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}
</script>
