<template>
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
            <span>任务与日志</span>
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

const router = useRouter();
const activeRoute = ref('1');

const homeHandle = () => router.push({ name: 'Home' });
const page2Handle = () => router.push({ name: 'Page_2' });
const page3Handle = () => router.push({ name: 'Page_3' });
const page4Handle = () => router.push({ name: 'Page_4' });

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