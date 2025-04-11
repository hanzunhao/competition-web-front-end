<template>
    <div class="header">
        <el-button type="primary" @click="api.RaspberryPiAPI.move([1, 2, 3])">Move</el-button>
        <el-button type="warning" @click="api.RaspberryPiAPI.water()">Water</el-button>
        <el-button type="danger" @click="api.RaspberryPiAPI.detect()">Detect</el-button>
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-space>
                    <!-- 在此实现显示日期气温湿度时间地址等类似功能 -->
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