<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="model === 'register'"
        >
          <label>再次输入密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button type="success" class="block"
                >获取验证码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCode,
} from "@/utils/validate";
export default {
  name: "login",
  data() {
    // 验证用户名
    var validatesUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatesPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        callback(new Error("密码应为6至20位的数字和字母!"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatesPasswords = (rule, value, callback) => {
      // 如果模块之为login 直接通过
      if (this.mode === "login") {
        callback();
      } else if (!value === this.ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validatesCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (validateCode(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" },
      ],
      // 模块值
      model: "login",
      // 表单的数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        username: [{ validator: validatesUsername, trigger: "blur" }],
        password: [{ validator: validatesPassword, trigger: "blur" }],
        passwords: [{ validator: validatesPasswords, trigger: "blur" }],
        code: [{ validator: validatesCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  // 挂载完成后自动执行的
  mounted() {},
  // 写函数
  methods: {
    // 数据驱动视图
    toggleMenu(data) {
      this.menuTab.forEach((ele) => {
        ele.current = false;
      });
      data.current = true;
      // 修改模块值
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.model === "login"
            ? alert("submit login!")
            : alert("submit register!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      font-size: 14px;
      color: #fff;
    }
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
