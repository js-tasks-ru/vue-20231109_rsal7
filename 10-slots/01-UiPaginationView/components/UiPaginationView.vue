<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
      <slot :item="item"  v-for='item in currentItems'/>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentItems(){
      const start = this.perPage * (this.page - 1);
      const end = start + this.perPage;
      return this.items.slice(start, end)
    }
  },
  watch: {

  }
};
</script>

<style></style>
