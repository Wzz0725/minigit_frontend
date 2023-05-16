<template>
    <header class="header has-background-white has-text-black">
      <b-navbar
        class="container is-light"
        :fixed-top="true"
      >
        <template slot="brand">
          <b-navbar-item tag="div">
            <img :src="logo" alt="logo">
          </b-navbar-item>
  
        </template>
        <template slot="start">
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/' }"
          >
          <i class="el-icon-s-home"></i> 主页
          </b-navbar-item>
        </template>
  
        <template slot="end">
          <!-- <b-navbar-item tag="div">
            <b-field position="is-centered">
              <b-input
                v-model="searchKey"
                class="s_input"
                width="80%"
                placeholder="搜索帖子、标签和用户"
                rounded
                clearable
                @keyup.enter.native="search()"
              />
  
              <p class="control">
                <b-button
                  class="is-info"
                  @click="search()"
                >检索
                </b-button>
              </p>
            </b-field>
          </b-navbar-item> -->
  
          <b-navbar-item
            v-if="accountName == null || accountName === ''"
            tag="div"
          >
            <div class="buttons">
              <b-button
                class="is-light"
                tag="router-link"
                :to="{ name: 'register' }"
              >
                注册
              </b-button>
              <b-button
                class="is-light"
                tag="router-link"
                :to="{ path: '/login' }"
              >
                登录
              </b-button>
            </div>
          </b-navbar-item>
  
          <b-navbar-dropdown
            v-else
            :label="accountName"
          >
            <b-navbar-item
              tag="router-link"
              :to="{ path: `/${accountName}` }"
            >
              🧘 个人中心
            </b-navbar-item>
            <hr class="dropdown-divider">
            <b-navbar-item
              tag="a"
              @click="logout"
            > 👋 退出登录
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </header>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Header',
    data() {
      return {
        /* logoUrl: require('@/assets/logo.png'), */
        logo: require('@/assets/image/16gl-G.png'),
        //searchKey: '',
        //darkMode: false
      }
    },
    computed: {
      ...mapGetters(['accountName'])
    },
    watch: {

    },
    created() {

    },
    methods: {
      async logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$message.info('退出登录成功')
          setTimeout(() => {
            this.$router.push({ path: this.redirect || '/' })
          }, 500)
        })
      },
   /*    search() {
        console.log(this.token)
        if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
          this.$message.info({
            showClose: true,
            message: '请输入关键字搜索！',
            type: 'warning'
          })
          return false
        }
        this.$router.push({ path: '/search?key=' + this.searchKey })
      } */
    }
  }
  </script>
  
  <style scoped>
  input {
    width: 80%;
    height: 86%;
  }
  </style>