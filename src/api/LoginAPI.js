import request from '../utils/request';
import { JwtStore } from '../stores/jwtStore';

const jwtStore = JwtStore();

// 工具函数：设置JWT到LocalStorage和Axios请求头
const setJWT = (jwt) => {
    jwtStore.jwt = jwt
};

// 工具函数：清除JWT
const clearJWT = () => {
    jwtStore.jwt = null
};

// 登录函数
const login = async (router) => {
    try {
        const response = await request.get("/api/login");
        const jwt = response.data;

        // 设置JWT
        setJWT(jwt);

        // 跳转至Home页
        if (router) {
            router.push({ name: 'Home' });
        }
    } catch (error) {
        console.error("登录失败:", error);
        throw error; // 抛出错误，方便调用者处理
    }
};

// 注销函数
const logout = async (router) => {
    try {
        // 清除JWT
        clearJWT();

        // 跳转至登录页面
        if (router) {
            router.push({ name: 'Login' });
        }

        console.log("用户已注销");
    } catch (error) {
        console.error("注销失败:", error);
        throw error; // 抛出错误，方便调用者处理
    }
};

export default {
    login,
    logout
};