import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import router from "./router/index.js";
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

createApp(App).use(Antd).use(ElementPlus).use(createPinia()).use(router).component('QuillEditor', QuillEditor).mount('#app')
