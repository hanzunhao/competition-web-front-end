<template>
     <!-- 
        头部用户下拉菜单组件
        该组件展示了用户头像以及下拉菜单，用户可以通过点击头像图标进入下拉菜单并选择"Logout"退出登录。
        点击"Logout"后将跳转到登录页面。

        功能说明：
        - circleUrl: 用户头像的图片地址
        - logoutHandle: 退出登录后跳转到登录页面
    -->
    <div class="header">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-space>
                    <el-avatar :size="30" :src="circleUrl" />
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-space>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logoutHandle">Logout</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const logoutHandle=()=>{
    router.push({ name: 'Login' });
}

</script>

<style scoped>
.header {
    display: flex;
    justify-content: flex-end;
    box-shadow: none;
    align-items: center;
    height: 100%;
}
</style>