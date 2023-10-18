import {createRouter, createWebHistory} from 'vue-router'

import TopicDetail from "../views/course_teaching/topic/TopicDetail.vue";


import NoticeDetail from "../views/course_teaching/notice/NoticeDetail.vue";
import NoticeDialog from "../views/course_teaching/notice/NoticeDialog.vue";
import Login from "../views/login.vue"
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
        component: () => import("../views/HomePage.vue"),
        meta: {
            title: '我的课堂'
        }
    },
    {
        path: '/classDetail',
        name: 'ClassDetail',
        component: () => import("../views/ClassDetail.vue"),
        meta: {
            title: '课程内容'
        }
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
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/classSetting',
        name: 'ClassSetting',
        component: () => import("../views/ClassSetting.vue"),
        meta: {
            title: '课程设置'
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;


