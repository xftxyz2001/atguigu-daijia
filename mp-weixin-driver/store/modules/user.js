"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const api_user_index = require("../../api/user/index.js");
const useUserStore = common_vendor.defineStore({
  id: "app-user",
  state: () => ({
    token: "",
    user: {}
  }),
  actions: {
    // 微信登陆
    loginWithWechat(callback) {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => __async(this, null, function* () {
          yield this.getToken(loginRes.code);
          yield this.getUserInfo();
          this.goHome();
        }),
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // 获取token
    getToken(code) {
      return __async(this, null, function* () {
        const res = yield api_user_index.getLogin(code);
        if (res.data) {
          utils_storage.setToken(res.data);
          this.token = res.data;
        }
      });
    },
    // 获取用户信息
    getUserInfo() {
      return __async(this, null, function* () {
        const res = yield api_user_index.getUserInfo();
        if (!res.data.nickname || !res.data.avatarUrl) {
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (infoRes) => __async(this, null, function* () {
              const params = {
                avatarUrl: infoRes.userInfo.avatarUrl,
                nickname: infoRes.userInfo.nickName
              };
              yield this.updateUserInfo(params);
              yield this.getUserInfo();
            })
          });
        } else {
          this.user = res.data;
          utils_storage.setUser(res.data);
        }
      });
    },
    // 更新用户信息
    updateUserInfo(userInfo) {
      return __async(this, null, function* () {
        yield api_user_index.updateUserInfo(userInfo);
      });
    },
    // 退出登陆
    logout() {
      this.clearAllOfUser();
      this.goHome();
    },
    // 清空用户所有信息
    clearAllOfUser() {
      utils_storage.removeToken();
      utils_storage.removeUser();
      this.user = {};
      this.token = "";
    },
    //   去首页
    goHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  },
  // 设置为true，缓存state
  persist: {
    storage: {
      getItem: common_vendor.index.getStorageSync,
      setItem: common_vendor.index.setStorageSync
    }
  }
});
exports.useUserStore = useUserStore;
