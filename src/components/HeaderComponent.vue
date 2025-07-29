<template>
  <header class="bg-indigo-700 text-white p-4 shadow-md sticky top-0 z-50">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
      <h1 class="text-2xl font-bold">متجر المنتجات</h1>
      <div class="flex items-center gap-2 w-full md:w-auto">
        <input
          :value="searchTerm"
          @input="$emit('update:searchTerm', $event.target.value)"
          type="text"
          placeholder="ابحث عن منتج..."
          class="flex-grow md:flex-grow-0 rounded-md px-1 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 lg:w-[500px]"
        />
        <select
          :value="selectedCategory"
          @change="$emit('update:selectedCategory', $event.target.value)"
          class="rounded-md px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-[90px] lg:w-[130px] h-[40px]"
        >
          <option value="">كل الفئات</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button
        @click="$emit('toggle-cart')"
        aria-label="عرض السلة"
        class="relative bg-indigo-600 hover:bg-indigo-800 transition-colors rounded-md p-2 "
      >
        <i class="fas fa-shopping-cart text-xl"></i>
        <span
          class="absolute -top-1 -left-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
          >{{ totalItems }}</span
        >
      </button>
      </div>
      
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  searchTerm: String,
  selectedCategory: String,
  categories: Array,
  totalItems: Number,
});

defineEmits(['toggle-cart', 'update:searchTerm', 'update:selectedCategory']);
</script>
