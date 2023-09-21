/**
 * token操作的封装
 */
import { TOKEN_STORE_NAME } from "../config/setting";
import Cookies from 'js-cookie'

/**
 * 获取缓存的 token
 */
export function getToken() {
    const token = localStorage.getItem(TOKEN_STORE_NAME);
    if(!token){
        return sessionStorage.getItem(TOKEN_STORE_NAME);
    }
    return token;
    // return Cookies.get(TOKEN_STORE_NAME)
}

export function setToken(token, remeber) {
    removeToken();
    if(token){
        if(remeber){
            localStorage.setItem(TOKEN_STORE_NAME, token);
        }else{
            sessionStorage.setItem(TOKEN_STORE_NAME, token);
        }
    }
    // return Cookies.set(TOKEN_STORE_NAME, token)
}

/**
 * 移除 token
 */
export function removeToken() {
    localStorage.removeItem(TOKEN_STORE_NAME);
    sessionStorage.removeItem(TOKEN_STORE_NAME);
    // return Cookies.remove(TokenKey)
}
