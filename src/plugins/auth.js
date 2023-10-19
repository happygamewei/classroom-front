import {userInfo} from "@/store/index.js";

function authPermission(permission) {
    const all_permission = "*:*:*";
    const permissions = userInfo().getPermissions()
    if (permission && permission.length > 0) {
        return permissions.some(v => {
            return all_permission === v || v === permission
        })
    } else {
        return false
    }
}

function authRole(role) {
    const super_admin = "admin";
    const roles = userInfo().getRoles()
    if (role && role.length > 0) {
        return roles.some(v => {
            return super_admin === v || v === role
        })
    } else {
        return false
    }
}

export default {
    // 验证用户是否具备某权限
    hasPermi(permission) {
        return authPermission(permission);
    },
    // 验证用户是否含有指定权限，只需包含其中一个
    hasPermiOne(permissions) {
        return permissions.some(item => {
            return authPermission(item)
        })
    },
    // 验证用户是否含有指定权限，必须全部拥有
    hasPermiAll(permissions) {
        return permissions.every(item => {
            return authPermission(item)
        })
    },
    // 验证用户是否具备某角色
    hasRole(role) {
        return authRole(role);
    },
    // 验证用户是否含有指定角色，只需包含其中一个
    hasRoleOne(roles) {
        return roles.some(item => {
            return authRole(item)
        })
    },
    // 验证用户是否含有指定角色，必须全部拥有
    hasRoleAll(roles) {
        return roles.every(item => {
            return authRole(item)
        })
    }
}
