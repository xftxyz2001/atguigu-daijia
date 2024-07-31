"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
const common_vendor = require("../../../common/vendor.js");
let config = {
  url: "",
  data: {},
  statusCode: 200,
  header: {
    // "content-type":"application/json"
  },
  method: "POST",
  timeout: 6e4,
  dataType: "json",
  responseType: "text",
  sslVerify: true,
  withCredentials: false,
  firstIpv4: false
};
function request(cog = config, complete, beforeRequest2, afterRequest2) {
  let newConfig = __spreadValues(__spreadValues({}, config), cog);
  return new Promise((resolve, reject) => __async(this, null, function* () {
    if (typeof beforeRequest2 === "function") {
      let opts = yield beforeRequest2(newConfig);
      if (typeof opts !== "object") {
        opts = {};
      }
      newConfig = __spreadValues(__spreadValues({}, newConfig), opts);
    }
    common_vendor.index.request({
      url: newConfig.url || "",
      data: newConfig.data,
      header: newConfig.header,
      method: newConfig.method,
      timeout: newConfig.timeout,
      dataType: newConfig.dataType,
      responseType: newConfig.responseType,
      sslVerify: newConfig.sslVerify,
      withCredentials: newConfig.withCredentials,
      firstIpv4: newConfig.firstIpv4,
      success(result) {
        return __async(this, null, function* () {
          var _a2;
          if (result.statusCode !== (newConfig == null ? void 0 : newConfig.statusCode)) {
            reject(result);
            return;
          }
          if (typeof afterRequest2 === "function") {
            let opts = yield afterRequest2(result);
            try {
              if (typeof opts !== "object") {
                opts = result;
              }
              if (typeof opts === "object" && ((_a2 = Object.keys(opts)) == null ? void 0 : _a2.length) == 0) {
                opts = result;
              }
            } catch (e) {
              console.error("tmui:", e);
            }
            result = __spreadValues({}, opts);
          }
          resolve(result);
        });
      },
      fail(result) {
        reject(result);
      },
      complete(result) {
        if (typeof complete === "function") {
          complete(result);
        }
      }
    });
  }));
}
var beforeRequest = (val) => val;
var afterRequest = (val) => val;
class fetchNet {
  /**
   * 构建新的请求
   * @param cog 请示配置见：fetchConfig
   * @param beforeRequest 访问前执行的函数，可以是Promise,你可以对执行前的参数进行修改之类的，将以你最新的修改参数为准进行请求。
   * @param afterRequest 访问后执行的函数，可以是Promise,提供请示后的数据，你可以在这里修改，返回，这样所有请求的数据返回后都为返回你修改后的数据。
   */
  constructor(cog, beforeRequestFun, afterRequesFunt) {
    config = __spreadValues(__spreadValues({}, config), cog || {});
    if (typeof beforeRequestFun == "function") {
      beforeRequest = beforeRequestFun;
    }
    if (typeof afterRequesFunt == "function") {
      afterRequest = afterRequesFunt;
    }
  }
  static get(url, data = {}, opts = {}) {
    let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "GET", data });
    return request(cfg);
  }
  static post(url, data = {}, opts = {}) {
    let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "POST", data });
    return request(cfg);
  }
  /**
   * 请求
   * @param cog 配置
   * @param complete 访问结束后执行的函数
   */
  static request() {
    return __async(this, arguments, function* (cog = config, beforeFun, afterFun, complete) {
      let newConfig = __spreadValues(__spreadValues({}, config), cog);
      if (typeof beforeFun == "function") {
        let testFun = yield beforeFun();
        let cb = { errMsg: "中止请求" };
        if (!testFun)
          return cb;
      }
      return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
    });
  }
}
exports.fetchNet = fetchNet;
