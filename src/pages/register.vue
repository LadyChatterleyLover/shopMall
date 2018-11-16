<template>
  <div>
    <van-nav-bar
    title="用户注册"
    left-text="返回"
    left-arrow
    @click-left="goBack"
    >
    </van-nav-bar>
    <div class="register-panel">
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
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="loading">立即注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import url from '../config/api.config'
  import {Toast} from 'vant'
  export default {
    name: 'register',
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
      registerAction () {
        if (this.checkForm()) {
          this.registerUser()
        }
      },
      registerUser () {
        this.loading = false
        this.$axios.post(url.registerUser, {
          username: this.username,
          password: this.password
        }).then(response => {
          let res = response.data
          console.log(res)
          if (res.code === 200) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = {
                userName: this.username
              }
              setTimeout(() => {
                resolve()
              }, 500)
            }).then(() => {
              Toast.success(res.message)
              this.$router.push('/login')
            }).catch(err => {
              Toast.fail('登录状态保存失败')
              console.log(err)
            })
          } else {
            Toast.fail('注册失败')
            this.loading = false
          }
        }).catch(err => {
          Toast.fail('登录失败')
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
    },
    created () {
      if (localStorage.userInfo) {
        Toast.success('您已经登录')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
    .register-button {
      padding-top: 10px;
    }
  }
</style>
