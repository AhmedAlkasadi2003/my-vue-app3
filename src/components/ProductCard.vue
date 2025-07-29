<template>
  <div
    class="bg-white rounded-lg shadow-md flex flex-col p-4 hover:shadow-lg transition cursor-pointer relative"
  >
    <img
      :src="product.image"
      :alt="product.title"
      class="w-full h-48 object-contain mb-3"
      loading="lazy"
    />
    <h3
      class="text-sm font-semibold mb-1 line-clamp-2 text-indigo-900 flex-grow"
      :title="product.title"
    >
      {{ product.title }}
    </h3>
    <p class="text-indigo-700 font-bold mb-2">{{ product.price.toFixed(2) }} $</p>
    <p
      class="text-xs mb-3 text-center text-gray-700 border border-gray-300 rounded-md py-1 select-none"
    >
      {{ product.category }}
    </p>
    <div class="flex justify-between gap-2">
      <button
        @click="$emit('delete-product', product.id)"
        class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-1 transition"
        aria-label="حذف المنتج"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
      <button
        @click="$emit('edit-product', product)"
        class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md py-1 transition"
        aria-label="تعديل المنتج"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        @click="$emit('add-to-cart', product)"
        class="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-md py-1 transition"
        aria-label="إضافة إلى السلة"
      >
        <i class="fas fa-cart-plus"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  product: Object,
});

defineEmits(['delete-product', 'edit-product', 'add-to-cart']);
</script>
