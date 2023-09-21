import request from '../utils/request.js'

export async function login(data) {
    const res = await request.post('/login', data)
    if(res?.code === 200){
        return res
    }
    return Promise.reject(new Error(res?.msg));
}

export async function getCodeImg() {
    const res = await request.get('/captchaImage')
    if(res?.code === 200){
        return res?.uuid
    }
    return Promise.reject(new Error(res?.msg));
}

// 获取用户信息
export async function getInfo() {
    const res = await request.get('/getInfo')
    if(res?.code === 200){
        return res
    }
    return Promise.reject(new Error(res?.msg));
}
