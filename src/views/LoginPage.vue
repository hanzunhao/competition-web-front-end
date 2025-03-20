<template>
    <div class="login-register-page">
        <el-row class="form-container">
            <el-col>
                <el-card class="form-card">
                    <template #header>
                        <div class="card-header">
                            <h3>登录</h3>
                        </div>
                    </template>

                    <el-form label-width="80px" :model="loginForm" :rules="rules" ref="loginFormRef">
                        <el-form-item label="用户名" prop="account">
                            <el-input v-model="loginForm.account" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="loginHandle" :loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const loginFormRef = ref(null);
const loading = ref(false);

const loginForm = ref({
    account: 'admin',
    password: '111111',
});

const rules = {
    account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const loginHandle = async () => {
    try {
        await loginFormRef.value.validate();
        loading.value = true;
        await api.LoginAPI.login(router);
    } catch (error) {
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-register-page {
    background-image: url('../assets/LoginBackground.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.login-register-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    z-index: 0;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}

.form-card {
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
    text-align: center;
    font-size: 18px;
    color: rgb(0, 123, 128);
    font-weight: bold;
}

.el-button--primary {
    background-color: rgb(0, 123, 128);
    border-color: rgb(0, 123, 128);
}

.el-button--primary:hover {
    background-color: rgb(0, 123, 128);
    border-color: rgb(0, 123, 128);
}

:deep(.el-form-item__content) {
    margin-left: 0 !important;
    display: flex;
    justify-content: center;
}
</style>