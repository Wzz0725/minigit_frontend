<template>
  <div class="columns py-6">
    <!--py-6: padding-top and padding-bottom : 3rem ,设置内边距 -->
    <div class="column is-half is-offset-one-quarter">
      <!-- is-half：设置列宽为一半，is-offset-one-quarter：设置偏移量为1/4 -->
      <el-card shadow="never"
        ><!-- 设置卡片阴影从不显示 -->
        <div slot="header" class="has-text-centered has-text-weight-bold">
          <!-- slot不懂，class里是用设置字体居中、加粗 -->
          用户注册
        </div>
        <div>
          <el-form
            ref="ruleForm"
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="accountName">
              <el-input v-model="ruleForm.accountName" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" />
            </el-form-item>

            <el-form-item label="密码" prop="pwd">
              <el-input
                v-model="ruleForm.pwd"
                type="password"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item label="验证码" prop="code">
              <el-input v-model="ruleForm.code">
                <template slot="append">
                  <el-button
                    @click.native.prevent="bindforgetSendCode('ruleForm')"
                    :disabled="disabled"
                    >{{ btnText }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即注册</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
  
<script>
import { userRegister } from "@/api/auth/auth";
import { sendMsg } from "@/api/auth/auth";
export default {
  name: "Register",
  data() {
    return {
      loading: false,
      disabled: false,
      btnText: "发送验证码",
      ruleForm: {
        /* name: '',
          pass: '',
          checkPass: '',
          email: '' */
        email: "",
        code: "",
        accountName: "",
        pwd: "",
      },

      rules: {
        accountName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
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
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4位",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
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
          userRegister(this.ruleForm)
            .then((value) => {
              const { code, message } = value;
              if (code === 1) {
                this.$message({
                  message: "账号注册成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || "/login" });
                }, 0.1 * 1000);
              } else {
                this.$message.error("注册失败，" + message);
              }
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
    // 发送验证码
    bindforgetSendCode(formName) {
      this.$refs[formName].validateField('email', (valid) => {
        if (!valid) {
          this.disabled = true;
          sendMsg(this.ruleForm).then((value) => {
            const { code, message } = value;

            if (code == 1) {
              this.$message({
                  message: "已发送验证码，请查收",
                  type: "success",
                });
              this.btnText = "请稍候...";
              setTimeout(() => {
                this.doLoop(60);
              }, 500);
            } else {
              this.$message.error("发送验证码失败，" + message);
            }
          });
        }
      });
    },
    // 手机验证码的倒计时
    doLoop: function (seconds) {
      seconds = seconds ? seconds : 60;
      this.btnText = seconds + "s后获取";
      // this.code = code
      let countdown = setInterval(() => {
        if (seconds > 0) {
          this.btnText = seconds + "s后获取";
          --seconds;
        } else {
          this.btnText = "获取验证码";
          this.disabled = false;
          clearInterval(countdown);
        }
      }, 1000);
    },
  },
};
</script>
  
  <style scoped>
</style>