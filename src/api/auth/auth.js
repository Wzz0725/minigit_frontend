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