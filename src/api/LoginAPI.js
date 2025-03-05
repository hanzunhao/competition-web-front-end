import request from '../utils/request';

// 常量定义
const JWT_STORAGE_KEY = 'jwt';

// 工具函数：设置JWT到LocalStorage和Axios请求头
const setJWT = (jwt) => {
    localStorage.setItem(JWT_STORAGE_KEY, jwt);
    request.defaults.headers.common['Token'] = `${jwt}`;
};

// 工具函数：清除JWT
const clearJWT = () => {
    localStorage.removeItem(JWT_STORAGE_KEY);
    delete request.defaults.headers.common['Token'];
};

// 登录函数
const login = async (router) => {
    try {
        const response = await request.get("/api/login");        
        const jwt = response.data;
        console.log("jwt:", jwt);

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

// 初始化函数：检查是否存在JWT并设置请求头
const initAuth = () => {
    const jwt = localStorage.getItem(JWT_STORAGE_KEY);
    if (jwt) {
        setJWT(jwt);
    }
};

export default {
    login,
    logout,
    initAuth,
};