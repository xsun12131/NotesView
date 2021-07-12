<template>
  <div class="login">
    <div class="item">
      <form action="" method="post" @submit.prevent="userLogin()">
        <p>
          <label for="name" class="sr-only">用户名</label>
          <input
            type="text"
            id="name"
            name="username"
            v-model="user.username"
            placeholder="用户名"
            class="text-l w-100"
            autofocus=""
            autocomplete="new-password"
          />
        </p>
        <p>
          <label for="password" class="sr-only">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            class="text-l w-100"
            placeholder="密码"
            v-model="user.password"
            autocomplete="new-password"
          />
        </p>
        <p class="submit">
          <button type="submit" class="btn w-100">登录</button>
          <!-- <input type="hidden" name="referer" value="" /> -->
        </p>
        <p>
          <label for="remember"
            ><input
              type="checkbox"
              name="remember"
              class="checkbox"
              v-model="rememberCheck"
              id="remember"
            />
            下次自动登录</label
          >
        </p>
      </form>
      <p class="more-link">
        <a href="#/">返回首页</a>
      </p>
    </div>
    <Dialog
      v-model="sendVal"
      type="reminder"
      title="提示"
      content="登录成功"
    ></Dialog>
  </div>
</template>
<script scoped>
import { login } from "@/api/user.js";
import { setStore, getStore, removeStore } from "@/utils/commonUtils.js";
import Dialog from "@/components/common/Dialog.vue";

export default {
  name: "Login",
  components: {
    Dialog,
  },
  data() {
    return {
      user: {
        username: getStore("username"),
        password: getStore("password"),
      },
      rememberCheck: getStore("rememberCheck"),
      sendVal: false,
    };
  },
  methods: {
    userLogin() {
      login(this.user).then(() => {
        this.openMask();
        if (this.rememberCheck) {
          setStore("username", this.user.username);
          setStore("password", this.user.password);
          setStore("rememberCheck", this.rememberCheck);
        } else {
          removeStore("username");
          removeStore("password");
          removeStore("rememberCheck");
        }
      });
    },
    openMask() {
      this.sendVal = true;
    },
  },
};
</script>
<style scoped>
.login {
  width: 280px;
  display: table;
  margin: 0 auto;
  height: 100%;
}
.item {
  display: table-cell;
  vertical-align: middle;
}

.sr-only {
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

input.text-l,
textarea.text-l {
  padding: 10px;
  font-size: 1.14286em;
}

input[type="text"],
input[type="password"],
input[type="email"],
textarea {
  background: #fff;
  border: 1px solid #d9d9d6;
  padding: 7px;
  border-radius: 2px;
  box-sizing: border-box;
}

.submit .btn {
  border: none;
  background-color: #467b96;
  cursor: pointer;
  border-radius: 2px;
  color: #fff;
  height: 40px;
  font-size: 1.14286em;
  font-weight: bold;
  display: inline-block;
  padding: 0 12px;
  vertical-align: middle;
  zoom: 1;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.more-link a {
  color: #467b96;
}
</style>