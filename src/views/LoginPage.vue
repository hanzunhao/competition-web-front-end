<template>
    <!-- 
        登录页面组件（Login.vue）
        功能说明：
        - loginForm: 登录表单的数据，包括账号和密码。
        - loginHandle: 登录处理函数，点击登录按钮时执行，模拟登录后跳转到首页。
    -->
    <div class="login-register-page">
        <el-row class="form-container">
            <el-col>
                <el-card class="form-card">
                    <div class="form-header">
                        <h3>Login</h3>
                    </div>
                    <el-form label-width="120px" :model="loginForm" :rules="rules" ref="loginFormRef">
                        <el-form-item label="Account" prop="account">
                            <el-input v-model="loginForm.account" placeholder="Enter your account" />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input type="password" v-model="loginForm.password" placeholder="Enter your password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" block @click="loginHandle" :loading="loading">Login</el-button>
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
const loginFormRef = ref(null); // 表单引用
const loading = ref(false); // 加载状态

// 登录表单的数据
const loginForm = ref({
    account: 'admin',
    password: '111111',
});

// 表单验证规则
const rules = {
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

// 登录处理函数
const loginHandle = async () => {
    try {
        // 验证表单
        await loginFormRef.value.validate();
        loading.value = true; // 开始加载

        // 调用登录API
        await api.LoginAPI.login(router);
        console.log('登录成功，跳转到首页');
    } catch (error) {
        console.error('登录失败:', error);
        // 可以根据需要提示用户登录失败
    } finally {
        loading.value = false; // 结束加载
    }
};
</script>

<style scoped>
.login-register-page {
    background-image: url('../assets/LoginBackground.jpg');
    /* 替换为你的背景图片URL */
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
    /* 调整透明度 */
    backdrop-filter: blur(5px);
    /* 调整模糊度 */
    z-index: 0;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    /* 确保表单在背景之上 */
}

.form-card {
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
}
</style>
