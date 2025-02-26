import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './assets/global.css';
import './axios';
import './index.css'


const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueSweetalert2);
app.mount('#app');
