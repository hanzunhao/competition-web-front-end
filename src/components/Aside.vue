<template>
    <!-- 
        侧边栏菜单组件
        该组件包含三个导航项，每个项对应一个路由页面。通过点击不同的菜单项，会触发相应的路由跳转， 
        同时动态更新选中的菜单项，使其与当前路由同步高亮显示。

        功能说明：
        - homeHandle: 跳转到首页 (Home)
        - page2Handle: 跳转到第二页 (Page_2)
        - page3Handle: 跳转到第三页 (Page_3)
        - page4Handle: 跳转到第四页 (Page_4)

    -->
    <el-menu :default-active="activeRoute" class="aside-menu">
        <el-menu-item index="1" @click="homeHandle">
            <el-icon>
                <Files />
            </el-icon>
            <span>大棚数据</span>
        </el-menu-item>
        <el-menu-item index="2" @click="page2Handle">
            <el-icon>
                <Notebook />
            </el-icon>
            <span>任务与预警</span>
        </el-menu-item>
        <el-menu-item index="3" @click="page3Handle">
            <el-icon>
                <ChatLineSquare />
            </el-icon>
            <span>病虫害识别</span>
        </el-menu-item>
        <el-menu-item index="4" @click="page4Handle">
            <el-icon>
                <DataLine />
            </el-icon>
            <span>花卉价格预测</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

// 获取路由实例
const router = useRouter();

// 当前选中的路由名称
const activeRoute = ref('1');

// 路由跳转的处理函数
const homeHandle = () => {
    router.push({ name: 'Home' });
};

const page2Handle = () => {
    router.push({ name: 'Page_2' });
};

const page3Handle = () => {
    router.push({ name: 'Page_3' });
};
const page4Handle = () => {
    router.push({ name: 'Page_4' });
};

// 监听当前路由的变化，动态更新高亮菜单项
watchEffect(() => {
    const currentRoute = router.currentRoute.value.name;
    if (currentRoute === 'Home') activeRoute.value = '1';
    else if (currentRoute === 'Page_2') activeRoute.value = '2';
    else if (currentRoute === 'Page_3') activeRoute.value = '3';
    else if (currentRoute === 'Page_4') activeRoute.value = '4';
});
</script>

<style scoped>
.aside-menu {
    height: 100%;
}
</style>