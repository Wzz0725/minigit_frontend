import Cookies from 'js-cookie'

const cAccountName = 'c_AccountName'


// 获取用户名
export function getAccountName() {
    return Cookies.get(cAccountName);
}

// 设置用户名，1天,与后端同步
export function setAccountName(accountName) {
    return Cookies.set(cAccountName, accountName, {expires: 1})
}

// 删除用户名
export function removeAccountName() {
    return Cookies.remove(cAccountName)
}

export function removeAll() {
    return Cookies.Cookies.removeAll()
}
