//路由（页面跳转）
import { createRouter, createWebHashHistory } from "vue-router";

//创建路由对象，填写配置信息
const routes = [
    {
        path: "/",
        redirect: "/home",  // 将根路径 / 重定向到 /home
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/HomePage.vue"),
    },
    {
        path: "/home/greenhousedetail",
        name: "GreenHouseDetail",
        component: () => import("../views/GreenHouseDetailPage.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginPage.vue"),
    },
    {
        path: "/page_2",
        name: "Page_2",
        component: () => import("../views/Page_2.vue"),
    },
    {
        path: "/page_3",
        name: "Page_3",
        component: () => import("../views/Page_3.vue"),
    },
    {
        path: "/page_4",
        name: "Page_4",
        component: () => import("../views/Page_4.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

