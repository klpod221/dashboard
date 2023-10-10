<template>
  <div v-if="isOpen" class="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" @click="close"/>
    <div class="relative bg-white w-1/2 rounded-lg shadow-lg right-0">
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <h2 class="text-lg font-semibold">{{ header }}</h2>
        <button type="button" class="text-gray-500 hover:text-gray-600" @click="close">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModal',
  props: {
    header: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
