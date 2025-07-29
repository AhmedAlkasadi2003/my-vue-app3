<template>
  <div class="bg-gray-50 min-h-screen flex flex-col font-cairo">
    <HeaderComponent
      :searchTerm="searchTerm"
      :selectedCategory="selectedCategory"
      :categories="categories"
      :totalItems="totalItems"
      @toggle-cart="toggleCart"
      @update:searchTerm="val => searchTerm = val"
      @update:selectedCategory="val => selectedCategory = val"
    />

    <main class="container mx-auto flex-grow p-4 flex flex-col gap-6">
      <ProductList
        :products="filteredProducts"
        @delete-product="deleteProduct"
        @edit-product="openEdit"
        @add-to-cart="addToCart"
      />
    </main>

    <CartSidebar
      :isOpen="isCartOpen"
      :cartItems="cartItems"
      :cartTotal="cartTotal"
      @toggle="toggleCart"
      @remove-item="removeFromCart"
      @clear-cart="clearCart"
    />

    <EditProductModal
      v-if="editedProduct"
      :product="editedProduct"
      @save="saveEditedProduct"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent.vue';
import ProductList from './components/ProductList.vue';
import CartSidebar from './components/CartSidebar.vue';
import EditProductModal from './components/EditProductModal.vue';

import "@/assets/style.css";

const apiURL = 'https://fakestoreapi.com/products';
const categoryURL = 'https://fakestoreapi.com/products/categories';

const products = ref([]);
const categories = ref([]);
let searchTerm = ref('');
let selectedCategory = ref('');
const cart = reactive({});
const isCartOpen = ref(false);
const editedProduct = ref(null);

async function loadCategories() {
  try {
    const res = await axios.get(categoryURL);
    categories.value = res.data;
  } catch (error) {
    console.error('فشل تحميل الفئات:', error);
  }
}

async function loadProducts() {
  try {
    const res = await axios.get(apiURL);
    products.value = res.data;
  } catch (error) {
    console.error('فشل تحميل المنتجات:', error);
  }
}

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchCategory = selectedCategory.value ? p.category === selectedCategory.value : true;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity++;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }
  // تم حذف السطر التالي لمنع فتح السلة تلقائياً عند الإضافة
  // isCartOpen.value = true;
}

function removeFromCart(id) {
  if (cart[id]) {
    delete cart[id];
  }
}

function clearCart() {
  for (const key in cart) {
    delete cart[key];
  }
}

const cartItems = computed(() => Object.values(cart));
const cartTotal = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);
const totalItems = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

function deleteProduct(id) {
  products.value = products.value.filter((p) => p.id !== id);
  if (cart[id]) removeFromCart(id);
}

function openEdit(product) {
  editedProduct.value = { ...product }; // نسخة مستقلة للتعديل
}

function saveEditedProduct(updatedProduct) {
  const index = products.value.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products.value[index] = { ...updatedProduct };
  }
  editedProduct.value = null;
}

function cancelEdit() {
  editedProduct.value = null;
}

onMounted(() => {
  loadCategories();
  loadProducts();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap');
.font-cairo {
  font-family: 'Cairo', sans-serif;
}
</style>
