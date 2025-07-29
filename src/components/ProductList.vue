<script setup>
import { defineProps, defineEmits } from 'vue';
import ProductCard from './ProductCard.vue';

defineProps({
  products: Array,
});

defineEmits(['delete-product', 'edit-product', 'add-to-cart']);
</script>

<template>
  <section class="flex-1">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">المنتجات</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @delete-product="$emit('delete-product', $event)"
        @edit-product="$emit('edit-product', $event)"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </section>
</template>
