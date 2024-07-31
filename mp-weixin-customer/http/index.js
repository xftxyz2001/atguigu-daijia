"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const common_vendor = require("../common/vendor.js");
const http_type = require("./type.js");
const utils_storage = require("../utils/storage.js");
const store_modules_user = require("../store/modules/user.js");
const service = new common_vendor.Request();
service.setConfig((config) => {
  config.timeout = http_type.ResultEnum.TIMEOUT;
  config.baseURL = "http://localhost:8600/customer-api";
  return config;
});
service.interceptors.request.use(
  (config) => {
    config.header = __spreadValues({}, config.header);
    config.header.token = utils_storage.getToken();
    return config;
  },
  (config) => {
    common_vendor.index.showToast({
      title: "请求错误",
      icon: "error"
    }).then((r) => {
    });
    return Promise.reject(config);
  }
);
service.interceptors.response.use(
  (response) => {
    var _a;
    const { data } = response;
    if (http_type.ResultEnum.EXPIRE.includes(data.code)) {
      (_a = store_modules_user.useUserStore()) == null ? void 0 : _a.$reset();
      common_vendor.index.showModal({
        title: "提示",
        content: "登录过期，请重新登录",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          } else if (res.cancel) {
            console.log("用户不想登陆");
          }
        }
      });
      return Promise.reject(data);
    }
    if (data.code && data.code !== http_type.ResultEnum.SUCCESS) {
      common_vendor.index.showToast({
        title: data.message || http_type.ResultEnum.ERRMESSAGE,
        icon: "error"
      });
      return Promise.reject(data);
    }
    return data;
  },
  (response) => {
    const status = response == null ? void 0 : response.statusCode;
    let message = "";
    console.log("response", response);
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
    return Promise.reject(response);
  }
);
const http = {
  get(url, params, config) {
    return service.get(url, __spreadValues({ params }, config));
  },
  post(url, data, config) {
    return service.post(url, data, config);
  },
  put(url, data, config) {
    return service.put(url, data, config);
  },
  delete(url, data, config) {
    return service.delete(url, data, config);
  }
};
const http$1 = http;
exports.http = http$1;
