<template>
  <div class="flex flex-wrap gap-2 items-center justify-center sm:justify-between relative w-full">
    <!-- item per page -->
    <div class="flex items-center justify-end w-full sm:w-auto rounded-md bg-gray-100 p-3">
      <select class="bg-transparent text-xs" @change="$emit('change', 1)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span class="text-sm ml-2">entries</span>
    </div>

    <!-- pagination -->
    <ul class="list-none flex gap-3 bg-gray-100 rounded-md shadow-md p-1 w-fit">
      <li class="inline-block">
        <button
          class="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 text-sm w-9 h-9 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isInFirstPage"
          @click.prevent="onClickFirstPage"
          aria-label="Go to first page"
        >
          <font-awesome-icon icon="angle-double-left" />
        </button>
      </li>

      <li class="inline-block">
        <button
          class="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 text-sm w-9 h-9 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isInFirstPage"
          @click.prevent="onClickPreviousPage"
          aria-label="Go to previous page"
        >
          <font-awesome-icon icon="angle-left" />
        </button>
      </li>

      <li v-for="page in pages" class="inline-block" :key="page.name">
        <button
          class="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 text-sm w-9 h-9 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'bg-gray-200 text-blue-500': isPageActive(page.name) }"
          :disabled="page.isDisabled"
          @click.prevent="onClickPage(page.name)"
          :aria-label="`Go to page ${page.name}`"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="inline-block">
        <button
          class="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 text-sm w-9 h-9 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isInLastPage"
          @click.prevent="onClickNextPage"
          aria-label="Go to next page"
        >
          <font-awesome-icon icon="angle-right" />
        </button>
      </li>

      <li class="inline-block">
        <button
          class="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 text-sm w-9 h-9 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isInLastPage"
          @click.prevent="onClickLastPage"
          aria-label="Go to last page"
        >
          <font-awesome-icon icon="angle-double-right" />
        </button>
      </li>
    </ul>

    <div class="hidden items-center sm:block p-3 bg-gray-100 rounded-md shadow-md">
      <span class="text-sm mr-2">Page</span>

      <select
        v-if="pagination.totalPages"
        class="bg-transparent text-sm"
        @change="onClickPage($event.target.value)"
      >
        <option v-for="page in pagination.totalPages" :key="page" :value="page">
          {{ page }}
        </option>
      </select>

      <span v-else class="text-sm">0</span>

      <span class="text-sm ml-2"> of {{ pagination.totalPages }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      default: 3,
    },
    pagination: {
      type: Object,
      required: true,
      default: () => ({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      }),
    },
    hasMorePages: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    startPage() {
      if (this.pagination.page === 1) {
        return 1;
      }

      if (this.pagination.page === this.pagination.totalPages) {
        return this.pagination.totalPages - this.maxVisibleButtons + 1;
      }

      return this.pagination.page - 1 > 0 ? this.pagination.page - 1 : 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.pagination.totalPages);
    },
    pages() {
      const pages = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        pages.push({
          name: i,
          isDisabled: i === this.pagination.page,
        });
      }
      return pages;
    },
    isInFirstPage() {
      return this.pagination.page <= 1;
    },
    isInLastPage() {
      return this.pagination.page >= this.pagination.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('change', 1);
    },
    onClickPreviousPage() {
      this.$emit('change', this.pagination.page - 1);
    },
    onClickPage(page) {
      this.$emit('change', page);
    },
    onClickNextPage() {
      this.$emit('change', this.pagination.page + 1);
    },
    onClickLastPage() {
      this.$emit('change', this.pagination.totalPages);
    },
    isPageActive(page) {
      return this.pagination.page === page;
    },
  },
};
</script>
