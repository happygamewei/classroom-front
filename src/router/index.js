import {createRouter, createWebHistory} from 'vue-router'

import HomePage from "../views/HomePage.vue";
import ClassDetail from "../views/ClassDetail.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/classDetail',
        name: 'ClassDetail',
        component: ClassDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;


