import axios from "axios";
import {getToken} from "../utils/token-utils.js";
import {TOKEN_HEADER_NAME} from "../config/setting.js";

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(config => {
    const token = getToken()
    if(getToken && config.headers){
        config.headers[TOKEN_HEADER_NAME] = "Bearer " + token
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)


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
