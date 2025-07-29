<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h3 class="text-lg font-bold mb-4 text-indigo-700">تعديل المنتج</h3>
      <div class="space-y-3">
        <input
          v-model="edited.title"
          type="text"
          placeholder="اسم المنتج"
          class="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
        />
        <input
          v-model.number="edited.price"
          type="number"
          placeholder="السعر"
          class="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="edited.category"
          type="text"
          placeholder="الفئة"
          class="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="edited.image"
          type="text"
          placeholder="رابط الصورة"
          class="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
        />
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <button
          @click="emit('cancel')"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 py-2"
        >
          إلغاء
        </button>
        <button
          @click="emit('save', edited)"
          class="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2"
        >
          حفظ التعديلات
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';

const props = defineProps({
  product: Object,
});

const emit = defineEmits(['save', 'cancel']);

const edited = reactive({
  id: '',
  title: '',
  price: 0,
  category: '',
  image: '',
});

watch(
  () => props.product,
  (val) => {
    if (val) {
      Object.assign(edited, val); // نسخ بيانات المنتج
    }
  },
  { immediate: true }
);
</script>
