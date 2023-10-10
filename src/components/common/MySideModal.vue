<template>
  <div>
    <div
      class="fixed z-50 w-60 h-full top-0 right-0 transition-all duration-300"
      :class="`${customClass} transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`"
    >
      <div class="relative bg-white w-full h-full shadow-lg right-0">
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
    <div class="fixed z-40 inset-0 bg-black opacity-50 block" v-if="isOpen" @click="close" />
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
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      console.log('close');
      this.$emit('close');
    },
  },
};
</script>
