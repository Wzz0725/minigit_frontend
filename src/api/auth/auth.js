import request from '@/utils/request'

export function userRegister(userDTO) {
  return request({
    url: '/register',
    method: 'post',
    data: userDTO
  })
}

export function sendMsg(user) {
  return request({
    url: '/sendMsg',
    method: 'post',
    data: user
  })
}

// 前台用户登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 登录后获取前台用户信息
export function getUserInfo() {
  return request({
      url: '/userinfo',
      method: 'get'
  })
}

// 前台用户注销
export function logout() {
  return request({
    url: '/logout',
    method: 'get',
  })
}