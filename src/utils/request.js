//存放关于网络请求的工具的js文件
import axios from "axios";
import router from "../router";

// 错误处理函数
const errorHandle = (status, info) => {
    console.log('errorHandle called with status:', status); // 调试日志
    switch (status) {
        case 400:
            console.error('请求错误 (400):', info);
            break;
        case 401:
            console.error('未授权 (401):', info);
            break;
        case 403:
            console.error('禁止访问 (403):', info);
            break;
        case 404:
            console.error('未找到 (404):', info);
            break;
        case 500:
            console.error('服务器内部错误 (500):', info);
            break;
        case 502:
            console.error('网关错误 (502):', info);
            break;
    }
};

// 创建 axios 实例
const instance = axios.create({
    timeout: 5000  // 请求超时设置为 5000ms
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.data.msg === "NOT_LOGIN") {            
            localStorage.removeItem('Token'); // 清除 Token
            router.push({ name: 'Login' }); // 跳转到登录页

        }
        return response.data
    },
    error => {
        console.log("进入 Axios 错误拦截器:", error); // 确保拦截器被触发
        if (error.response) {
            console.log("服务器响应错误:", error.response);
            const { status, data } = error.response;
            errorHandle(status, data?.message || "请求出错");
        } else {
            console.error("网络错误，服务器未响应");
        }
        return Promise.reject(error);
    }
);

export default instance;