<template>
  <div class="overflow-x-scroll">
    <table class="w-full text-sm text-left">
      <thead class="text-xs uppercase font-medium">
        <tr class="border-b border-gray-300">
          <th
            v-for="header in headers"
            :key="header.slot"
            scope="col"
            :class="`px-4 py-3 ${header.class || ''}`"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <template v-if="isLoading">
        <tbody>
          <tr v-for="n in 5" :key="n" class="border-b border-gray-200 last:border-none">
            <td v-for="header in headers" :key="header.slot" class="p-4">
              <div class="animate-pulse bg-gray-200 h-4 mb-2 rounded-md" />
            </td>
          </tr>
        </tbody>
      </template>

      <template v-else>
        <tbody v-if="data && data.length" class="divide-y divide-gray-200">
          <tr v-for="item in data" :key="item.id" class="border-b border-gray-200 last:border-none">
            <td v-for="header in headers" :key="header.slot" :class="`p-4 ${header.class || ''}`">
              <slot :name="header.slot" :item="item">
                {{ item[header.slot] }}
              </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="headers.length" class="p-4 text-center">No data available</td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
