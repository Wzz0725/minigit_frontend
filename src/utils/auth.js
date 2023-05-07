import Cookies from 'js-cookie'

const cAccountName = 'c_user'


// 获取Token
export function getAccountName() {
    return Cookies.get(cAccountName);
}

// 设置Token，1天,与后端同步
export function setAccountName(accountName) {
    return Cookies.set(cAccountName, accountName, {expires: 1})
}

// 删除Token
export function removeAccountName() {
    return Cookies.remove(cAccountName)
}

export function removeAll() {
    return Cookies.Cookies.removeAll()
}
