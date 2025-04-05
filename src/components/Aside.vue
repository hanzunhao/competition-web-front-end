<template>
    <el-menu :default-active="activeRoute" class="aside-menu">
        <el-menu-item index="1" @click="homeHandle">
            <el-icon>
                <House />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="page1Handle">
            <el-icon>
                <Files />
            </el-icon>
            <span>温室数据</span>
        </el-menu-item>
        <el-menu-item index="3" @click="page2Handle">
            <el-icon>
                <Notebook />
            </el-icon>
            <span>任务与日志</span>
        </el-menu-item>
        <el-menu-item index="4" @click="page3Handle">
            <el-icon>
                <ChatLineSquare />
            </el-icon>
            <span>智能病虫害问答</span>
        </el-menu-item>
        <el-menu-item index="5" @click="page4Handle">
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

const router = useRouter();
const activeRoute = ref('1');

const homeHandle = () => router.push({ name: 'Home' });
const page1Handle = () => router.push({ name: 'Page_1' });
const page2Handle = () => router.push({ name: 'Page_2' });
const page3Handle = () => router.push({ name: 'Page_3' });
const page4Handle = () => router.push({ name: 'Page_4' });

watchEffect(() => {
    const currentRoute = router.currentRoute.value.name;
    if (currentRoute === 'Home') activeRoute.value = '1';
    else if (currentRoute === 'Page_1') activeRoute.value = '2';
    else if (currentRoute === 'Page_2') activeRoute.value = '3';
    else if (currentRoute === 'Page_3') activeRoute.value = '4';
    else if (currentRoute === 'Page_4') activeRoute.value = '5';
});
</script>

<style scoped>
.aside-menu {
    height: 100%;
}
</style>