import {createRouter, createWebHistory} from 'vue-router'

import HomePage from "../views/HomePage.vue";
import ClassDetail from "../views/ClassDetail.vue";
import TopicDetail from "../views/course_teaching/topic/TopicDetail.vue";
import Login from "@/views/login.vue";


const routes = [
    {
        path:'/topicDetail/:topicId/:noJoinNumber',
        name:'TopicDetail',
        component:TopicDetail,
        props: true,
    },
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/classDetail',
        name: 'ClassDetail',
        component: ClassDetail
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;


