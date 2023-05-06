import { login } from '@/api/auth/auth'
import { getToken, setToken } from '@/utils/auth'

//定义全局数据
const state = {
  token: getToken(), // token
  user: '', // 用户对象
}

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token
  }
}

//actions解决异步请求（指请求数据后不等待数据返回，直接去做别的事，当数据返回时，再通过回调函数）
const actions = {
  // 用户登录
  login({ commit }, userInfo) {//这里的login是给dispatch调用的（dispatch("user/login", this.ruleForm)）
    console.log(userInfo)
    const { email, pwd} = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email, pwd: pwd}).then(response => {//这里的login是'@/api/auth/auth'里的登录接口
        const { data } = response
        commit('SET_TOKEN_STATE', data.token)   //存到store里
        setToken(data.token)    //存到cookie里
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}