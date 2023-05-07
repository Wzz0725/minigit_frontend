import { login, getUserInfo,logout } from '@/api/auth/auth'
import { getAccountName, setAccountName, removeAccountName } from '@/utils/auth'

//定义全局数据
const state = {
  accountName: getAccountName(), // 用户对象
}

const mutations = {
  SET_ACCOUNTNAME_STATE: (state, accountName) => {
    state.accountName = accountName
  }
}

//actions解决异步请求（指请求数据后不等待数据返回，直接去做别的事，当数据返回时，再通过回调函数）
const actions = {
  // 用户登录
  login({ commit }, userInfo) {//这里的login是给dispatch调用的（dispatch("user/login", this.ruleForm)）
    console.log(userInfo)
    const { accountName, pwd} = userInfo
    return new Promise((resolve, reject) => {
      login({ accountName: accountName, pwd: pwd}).then(response => {//这里的login是'@/api/auth/auth'里的登录接口
        const { data } = response
        commit('SET_ACCOUNTNAME_STATE', data.accountName)   //存到store里
        setAccountName(data.accountName)    //存到cookie里
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((response) => {
          const { data } = response;
          if (!data) {
            commit("SET_ACCOUNTNAME_STATE", "");
            removeAccountName();
            resolve();
            reject("Verification failed, please Login again.");
          }
          commit("SET_ACCOUNTNAME_STATE", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((response) => {
          console.log(response);
          commit("SET_ACCOUNTNAME_STATE", "");
          removeAccountName();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}