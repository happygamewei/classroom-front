/**
 * user操作的封装
 */
import { USER_ID } from "../config/setting";
import { ROLES } from "../config/setting";

/**
 * 获取缓存的 userId
 */
export function getUserId() {
    const userId = localStorage.getItem(USER_ID);
    if(!userId){
        return sessionStorage.getItem(USER_ID);
    }
    return userId;
}

export function setUserId(userId, remeber) {
    removeUserId();
    if(userId){
        if(remeber){
            localStorage.setItem(USER_ID, userId);
        }else{
            sessionStorage.setItem(USER_ID, userId);
        }
    }
}

/**
 * 移除 userId
 */
export function removeUserId() {
    localStorage.removeItem(USER_ID);
    sessionStorage.removeItem(USER_ID);
}



/**
 * 获取缓存的 userId
 */
export function getRoles() {
    const roles = localStorage.getItem(ROLES);
    if(!roles){
        return sessionStorage.getItem(ROLES);
    }
    return roles;
}

export function setRoles(roles, remeber) {
    removeRoles();
    if(roles){
        if(remeber){
            localStorage.setItem(ROLES, roles);
        }else{
            sessionStorage.setItem(ROLES, roles);
        }
    }
}

/**
 * 移除 userId
 */
export function removeRoles() {
    localStorage.removeItem(ROLES);
    sessionStorage.removeItem(ROLES);
}
