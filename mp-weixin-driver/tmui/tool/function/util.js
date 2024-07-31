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
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_function_preview = require("./preview.js");
function isNumber(arg, defaultNum = 0) {
  const p = Number(arg);
  return p || defaultNum;
}
function isString(arg, defaultStr = "") {
  let p = "";
  if (typeof arg === "string" && arg != null) {
    p = String(arg);
  } else
    p = defaultStr;
  return p;
}
function paginate(total, pageSize) {
  const pages = Math.ceil(total / pageSize);
  const pageArr = [];
  for (let i = 0; i < pages; i++) {
    pageArr.push(i + 1);
  }
  return pageArr;
}
function getValue(data, keys) {
  const keyArr = keys.split(".");
  let result = __spreadValues({}, data);
  for (const key of keyArr) {
    result = result[key];
    if (result === void 0 || result === null) {
      return result;
    }
  }
  return result;
}
function setValue(data, keys, value) {
  const keyArr = keys.split(".");
  let obj = data;
  for (let i = 0; i < keyArr.length - 1; i++) {
    const key = keyArr[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyArr[keyArr.length - 1]] = value;
}
function getMaxDepth(data) {
  let maxDepth = 0;
  function traverse(obj, depth) {
    if (typeof obj !== "object" || obj === null) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        traverse(obj[key], depth + 1);
      }
    }
  }
  traverse(data, 0);
  return maxDepth;
}
function deepObjectMerge(FirstOBJ, SecondOBJ) {
  var _a;
  for (var key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && ((_a = FirstOBJ[key]) == null ? void 0 : _a.toString()) === "[object Object]" ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
  }
  return FirstOBJ;
}
function splitData(arr = [], size = 1) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
function deepClone(data) {
  if (data === null || typeof data !== "object") {
    return data;
  }
  if (Array.isArray(data)) {
    const clone2 = [];
    for (const item of data) {
      clone2.push(deepClone(item));
    }
    return clone2;
  }
  if (data instanceof Date) {
    return new Date(data.getTime());
  }
  if (data instanceof RegExp) {
    const flags = data.flags;
    return new RegExp(data.source, flags);
  }
  if (typeof data === "function") {
    return data;
  }
  const clone = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      clone[key] = deepClone(data[key]);
    }
  }
  return clone;
}
function timeMuch(t) {
  let format = {
    d: "00",
    h: "00",
    m: "00",
    s: "00"
  };
  if (t > 0) {
    let d = Math.floor(t / 86400);
    let h = Math.floor(t / 3600 % 24);
    let m = Math.floor(t / 60 % 60);
    let s = Math.floor(t % 60);
    format.d = d < 10 ? "0" + d : d;
    format.h = h < 10 ? "0" + h : h;
    format.m = m < 10 ? "0" + m : m;
    format.s = s < 10 ? "0" + s : s;
  }
  return format;
}
function getDateToNewData(timestamp = (/* @__PURE__ */ new Date()).getTime()) {
  if (typeof timestamp == "string") {
    timestamp = new Date(timestamp).getTime();
  }
  var arrTimestamp = (timestamp + "").split("");
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = "0";
    }
  }
  timestamp = Number(arrTimestamp.join("")) * 1;
  var minute = 1e3 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = (/* @__PURE__ */ new Date()).getTime();
  var diffValue = now - timestamp;
  if (diffValue < 0) {
    return "不久前";
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var zero = function(value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };
  if (monthC > 12) {
    return function() {
      var date = new Date(timestamp);
      return date.getFullYear() + "年" + zero(date.getMonth() + 1) + "月" + zero(date.getDate()) + "日";
    }();
  } else if (monthC >= 1) {
    return parseInt(monthC + "") + "月前";
  } else if (weekC >= 1) {
    return parseInt(weekC + "") + "周前";
  } else if (dayC >= 1) {
    return parseInt(dayC + "") + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC + "") + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC + "") + "分钟前";
  }
  return "刚刚";
}
function callPhone(phoneNumber = "") {
  let num = phoneNumber.toString();
  return new Promise((rs, rj) => {
    common_vendor.index.makePhoneCall({
      phoneNumber: num,
      success: () => rs(true),
      fail: (err) => rj(err)
    });
  });
}
function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
  return new Promise((rs, rj) => {
    common_vendor.index.scanCode({
      onlyFromCamera,
      scanType,
      success: (res) => rs(res),
      fail: (error) => rj(error)
    });
  });
}
function setClipboardData(data) {
  return new Promise((rs, rj) => {
    common_vendor.index.setClipboardData({
      data,
      success: () => rs(true),
      fail: (error) => rj(error)
    });
  });
}
function getClipboardData() {
  return new Promise((rs, rj) => {
    common_vendor.index.getClipboardData({
      success: (res) => rs(res.data),
      fail: (error) => rj(error)
    });
  });
}
function setCookie(key, data) {
  try {
    common_vendor.index.setStorageSync(key, data);
    return true;
  } catch (e) {
    return false;
  }
}
function delCookie(key) {
  try {
    common_vendor.index.removeStorageSync(key);
    return true;
  } catch (e) {
    return false;
  }
}
function getCookie(key) {
  try {
    const value = common_vendor.index.getStorageSync(key);
    try {
      let val = JSON.parse(value);
      return val;
    } catch (e) {
      return value;
    }
  } catch (e) {
    return void 0;
  }
}
function httpUrlAddKey(uri, key, value) {
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
function getQueryString(url, key) {
  var query_string = url.substring(url.indexOf("?"));
  if (!query_string)
    return "";
  var re = /[?&]?([^=]+)=([^&]*)/g;
  var tokens;
  while (tokens = re.exec(query_string)) {
    if (decodeURIComponent(tokens[1]) === key) {
      return decodeURIComponent(tokens[2]);
    }
  }
  return "";
}
function getUid(rdix = 1, length = 12, isAddStr = false) {
  return Math.floor(Math.random() * rdix * Math.floor(Math.random() * Date.now())).toString(isAddStr ? 16 : 10).substring(0, length);
}
var timeout = getUid(1);
function debounce(func, wait = 500, immediate = false) {
  if (timeout !== null)
    clearTimeout(timeout);
  if (immediate) {
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    typeof func === "function" && func();
  } else {
    timeout = getUid(1);
    timeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
}
var throttleFlag;
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!throttleFlag) {
      throttleFlag = true;
      typeof func === "function" && func();
      setTimeout(() => {
        throttleFlag = false;
      }, wait);
    }
  } else {
    if (!throttleFlag) {
      throttleFlag = true;
      setTimeout(() => {
        throttleFlag = false;
        typeof func === "function" && func();
      }, wait);
    }
  }
}
function quereyDom(t, node) {
  return new Promise((res, rej) => {
    const query = common_vendor.index.createSelectorQuery().in(t);
    query.select(node).boundingClientRect((el) => {
      res(el);
    }).exec();
  });
}
const queryDom = quereyDom;
function isPhone(phone) {
  let val = String(phone);
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return !!val.match(reg);
}
function isChina(s) {
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  return !!patrn.exec(s);
}
function isEmpty(s) {
  if (typeof s === "string") {
    s = s.trim();
  }
  if (s == "")
    return true;
  if (s == null)
    return true;
  if (typeof s === "undefined")
    return true;
  if (Array.isArray(s)) {
    if (s.length == 0)
      return true;
  }
  if (typeof s === "object") {
    if (Object.keys(s).length == 0)
      return true;
  }
  return false;
}
function isEmail(s) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !!s.match(reg);
}
function isIdCard(val) {
  val = String(val);
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      let id = val[i];
      sum += id * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}
function isIdCar(s) {
  let reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
  return !!s.match(reg);
}
function isPasswordOfNumber(s, len = 6, maxLen = 20) {
  s = String(s);
  let reg = new RegExp(`^[0-9]{${len},${maxLen}}$`);
  return !!s.match(reg);
}
function isPasswordOfOther(s, len = 6, maxLen = 20, model = 0) {
  s = String(s);
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (model === 1) {
    reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
  }
  if (model === 2) {
    reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
  }
  return !!s.match(reg);
}
function isDate(s) {
  if (s == null || typeof s === "undefined" || !s)
    return false;
  if (typeof s === "string") {
    s = s.replace("-", "/");
  }
  let d = new Date(s);
  if (d.toString() == "Invalid Date")
    return false;
  return true;
}
function toast(word, mask = true, icon = "none") {
  common_vendor.index.showToast({
    mask,
    title: word,
    icon
  });
}
function getWindow() {
  var _a, _b, _c, _d, _e;
  const sysinfo = common_vendor.index.getSystemInfoSync();
  let top = 0;
  let height = sysinfo.windowHeight;
  let nowPage = getCurrentPages().pop();
  let isCustomHeader = false;
  (_b = (_a = common_vendor.index.$tm) == null ? void 0 : _a.pages) != null ? _b : [];
  let bottom = (_d = (_c = sysinfo.safeAreaInsets) == null ? void 0 : _c.bottom) != null ? _d : 0;
  if (((_e = common_vendor.index.$tm) == null ? void 0 : _e.globalNavStyle) == "custom") {
    isCustomHeader = true;
  } else {
    for (let i = 0; i < common_vendor.index.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == common_vendor.index.$tm.pages[i].path && common_vendor.index.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
  }
  let results = { bottom, height, width: sysinfo.windowWidth, top, isCustomHeader, statusBarHeight: sysinfo.statusBarHeight || 0, sysinfo };
  return results;
}
function routerTo(url, type = "navigate") {
  let funType = {
    navigate: "navigateTo",
    redirect: "redirectTo",
    switchTab: "switchTab",
    reLaunch: "reLaunch",
    navigateBack: "navigateBack"
  };
  let fun = funType[type];
  if (fun == "navigateBack") {
    common_vendor.index.navigateBack({
      fail(error) {
        console.error(error);
      }
    });
  } else if (fun == "reLaunch") {
    common_vendor.index.reLaunch({
      url,
      fail(error) {
        console.error(error);
      }
    });
  } else if (fun == "switchTab") {
    common_vendor.index.switchTab({
      url,
      fail(error) {
        console.error(error);
      }
    });
  } else if (fun == "redirectTo") {
    common_vendor.index.redirectTo({
      url,
      fail(error) {
        console.error(error);
      }
    });
  } else if (fun == "navigateTo") {
    common_vendor.index.navigateTo({
      url,
      fail(error) {
        console.error(error);
      }
    });
  }
}
function torpx(v, screenWidth = 0) {
  if (typeof screenWidth === "undefined" || !screenWidth) {
    screenWidth = common_vendor.index.getSystemInfoSync().screenWidth;
  }
  let pixelRatio = 750 / screenWidth;
  return Math.ceil(v * pixelRatio);
}
function topx(v) {
  return Math.ceil(common_vendor.index.upx2px(Number(v)));
}
var lastTime = 0;
function requestAnimationFrame(callback) {
  const currentTime = (/* @__PURE__ */ new Date()).getTime();
  const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
  const id = setTimeout(() => {
    callback(currentTime + timeToCall);
  }, timeToCall);
  lastTime = currentTime + timeToCall;
  return id;
}
function cancelAnimationFrame(id) {
  clearTimeout(id);
}
const util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  callPhone,
  cancelAnimationFrame,
  debounce,
  deepClone,
  deepObjectMerge,
  default: tmui_tool_function_preview.preview,
  delCookie,
  getClipboardData,
  getCookie,
  getDateToNewData,
  getMaxDepth,
  getQueryString,
  getUid,
  getValue,
  getWindow,
  httpUrlAddKey,
  isChina,
  isDate,
  isEmail,
  isEmpty,
  isIdCar,
  isIdCard,
  isNumber,
  isPasswordOfNumber,
  isPasswordOfOther,
  isPhone,
  isString,
  paginate,
  quereyDom,
  queryDom,
  requestAnimationFrame,
  routerTo,
  scanCode,
  setClipboardData,
  setCookie,
  setValue,
  splitData,
  throttle,
  timeMuch,
  toast,
  topx,
  torpx
}, Symbol.toStringTag, { value: "Module" }));
exports.deepObjectMerge = deepObjectMerge;
exports.getCookie = getCookie;
exports.getWindow = getWindow;
exports.setCookie = setCookie;
exports.util = util;
