import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // تأكد أن هذا الملف موجود
import '@fortawesome/fontawesome-free/css/all.min.css'

createApp(App).use(router).mount('#app');
