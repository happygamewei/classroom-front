import axios from "axios";

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 10000
})


/**
 * 添加响应拦截器
 */
service.interceptors.response.use((res) => {
        if(res.status === 200){
            return res.data
        }else {
            return res;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service
