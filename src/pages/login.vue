<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    >
    </van-nav-bar>
    <div class="login-panel">
      <van-field
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        v-model="username"
        :error-message="usernameErrMsg"
        @click-icon="username=''"
      >
      </van-field>
      <van-field
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        :error-message="passwordErrMsg"
        v-model="password"
      >
      </van-field>
      <div class="login-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="loading">立即登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import url from '../config/api.config'
  import {Toast} from 'vant'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        loading: false,
        usernameErrMsg: '',
        passwordErrMsg: ''
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      loginAction () {
        if (this.checkForm()) {
          this.loginUser()
        }
      },
      loginUser () {
        this.loading = false
        this.$axios.post(url.loginUser, {
          username: this.username,
          password: this.password
        }).then(response => {
          let res = response.data
          console.log(res)
          if (res.code === 200) {
            Toast.success(res.message)
            this.$router.push('/')
          } else {
            Toast.fail('登录失败')
            this.loading = false
          }
        }).catch(err => {
          console.log(err)
        })
      },
      checkForm () {
        let isOk = true
        if (this.username.length < 2) {
          this.usernameErrMsg = '用户名长度不能小于2位'
          isOk = false
        } else {
          this.usernameErrMsg = ''
        }
        if (this.password.length < 6) {
          this.passwordErrMsg = '密码长度不能小于6位'
          isOk = false
        } else {
          this.usernameErrMsg = ''
        }
        return isOk
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
    .login-button {
      padding-top: 10px;
    }
  }
</style>
