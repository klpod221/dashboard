<template>
  <div class="bg-gray-100 rounded-md shadow-md p-4 overflow-hidden" :class="customClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    customClass: {
      type: String,
      default: '',
    },
  },
};
</script>
