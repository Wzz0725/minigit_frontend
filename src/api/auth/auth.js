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