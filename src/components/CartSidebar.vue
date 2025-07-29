<template>
  <section
    id="cartSlideBar"
    :class="[
      'fixed inset-y-0 right-0 z-60 bg-white shadow-lg p-4 overflow-y-auto border-l-4 border-indigo-600 transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : 'translate-x-full',
      'w-full md:w-1/4'
    ]"
  >
    <div class="flex justify-between items-center mt-4">
      <h2 class="text-xl font-semibold text-indigo-700">السلة</h2>
      <button
        @click="$emit('toggle')"
        class="text-gray-500 hover:text-indigo-700 transition text-2xl"
        aria-label="إغلاق السلة"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="space-y-4 max-h-[calc(100vh-56px)] overflow-y-auto ">
      <div v-if="cartItems.length === 0" class="text-center text-gray-500 mt-4">السلة فارغة.</div>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center gap-3 border border-gray-200 rounded-md p-2"
      >
        <img
          :src="item.image"
          class="w-16 h-16 object-contain rounded-md bg-white"
          loading="lazy"
          :alt="item.title"
        />
        <div class="flex flex-col flex-grow">
          <h4 class="text-sm font-semibold text-indigo-900 line-clamp-2" :title="item.title">
            {{ item.title }}
          </h4>
          <p class="text-indigo-700 font-bold">{{ item.price.toFixed(2) }} $ × {{ item.quantity }}</p>
        </div>
        <button
          @click="$emit('remove-item', item.id)"
          class="text-red-600 hover:text-red-800 transition text-lg p-1"
          aria-label="حذف من السلة"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div
      class="mt-4 border-t pt-4 flex justify-between items-center font-bold text-indigo-700 text-lg"
      aria-live="polite"
    >
      <span>الإجمالي:</span>
      <span>{{ cartTotal.toFixed(2) }} $</span>
    </div>
    <button
      @click="$emit('clear-cart')"
      class="mt-4 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 w-full transition"
      aria-label="حذف كل المنتجات من السلة"
    >
      حذف كل المنتجات من السلة
    </button>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  isOpen: Boolean,
  cartItems: Array,
  cartTotal: Number,
});

defineEmits(['toggle', 'remove-item', 'clear-cart']);
</script>
