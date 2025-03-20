<template>
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
import api from '../api';

const router = useRouter();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

const logoutHandle = async () => {
    try {
        await api.LoginAPI.logout(router);
        console.log('注销成功，跳转到登录页面');
    } catch (error) {
        console.error('注销失败:', error);
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-icon--right {
    margin-left: 8px;
}
</style>