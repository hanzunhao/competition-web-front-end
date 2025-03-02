//存放关于网络请求的工具的js文件
import axios from "axios";

// 错误处理函数
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.error('请求错误 (400):', info);
            break;
        case 401:
            console.error('未授权 (401):', info);
            history.push({ name: 'Login' });
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
        default:
            console.error('未知错误:', info);
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
        if (response.status === 200) {
            return Promise.resolve(response);  
        } else {
            return Promise.reject(response);  
        }
    },
    error => {
        const { response } = error;
        errorHandle(response.status, response.info);
    }
);

export default instance;
