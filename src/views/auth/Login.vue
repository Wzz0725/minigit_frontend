<template>
    <div class="columns py-6">
      <div class="column is-half is-offset-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered has-text-weight-bold">
            用户登录
          </div>
          <div>
            <el-form
              v-loading="loading"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="accountName">
                <el-input v-model="ruleForm.accountName"></el-input>
              </el-form-item>
  
              <el-form-item label="密码" prop="pwd">
                <el-input
                  type="password"
                  v-model="ruleForm.pwd"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
  
              <el-form-item>
                <b-button type="is-primary" @click="submitForm('ruleForm')" class="mx-1"
                  >登录</b-button
                >
                <b-button @click="resetForm('ruleForm')" class="mx-1">重置</b-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        redirect: undefined,
        loading: false,
        ruleForm: {
          accountName: "",
          pwd: "",
        },
        rules: {
          accountName: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            {
              min: 2,
              max: 20,
              message: "长度在 2 到 20 个字符",
              trigger: "blur",
            },
          ],
          pwd: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 6,
              max: 20,
              message: "长度在 6 到 20 个字符",
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.ruleForm)
              .then(() => {
                /* this.$message({
                  message: "恭喜你，登录成功",
                  type: "success",
                  duration: 2000,
                }); */
                this.$buefy.snackbar.open({
                    message: "恭喜你，登录成功",
                    type: 'is-success',
                    position: 'is-top',
                    actionText: 'OK',
                    duration: 2000,
                })
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || "/" });
                }, 0.1 * 1000);
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  
  <style scoped>
  </style>