import {createRouter, createWebHistory} from 'vue-router'

import HomePage from "../views/HomePage.vue";
import ClassDetail from "../views/ClassDetail.vue";
import NoticeDetail from "../views/course_teaching/notice/NoticeDetail.vue";
import NoticeDialog from "../views/course_teaching/notice/NoticeDialog.vue";
import Login from "../views/login.vue"
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
    },
    {
        path: '/noticeDetail',
        name: 'NoticeDetail',
        component: NoticeDetail
    },{

        path: '/noticeDialog',
        name: 'NoticeDialog',
        component: NoticeDialog

    },
    {
        path: '/login',
        name:'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;


