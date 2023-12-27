import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import router from "./router/index.js";
import 'element-plus/theme-chalk/index.css';
import { createPinia } from 'pinia';

// eventBus.ts
import mitt from 'mitt'
const mitter = mitt();
export default mitter


createApp(App).use(Antd).use(ElementPlus).use(createPinia()).use(router).mount('#app')

