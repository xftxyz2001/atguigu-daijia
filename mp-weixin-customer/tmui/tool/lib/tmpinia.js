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
var _a, _b;
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_theme_theme = require("../theme/theme.js");
const tmui_tool_function_util = require("../function/util.js");
let pdefault_cookies_color = tmui_tool_function_util.getCookie("setTmVuetifyColor") || "";
let pdefault_cookies_black = tmui_tool_function_util.getCookie("setTmVuetifyBlack");
let pdefault_cookies_local = tmui_tool_function_util.getCookie("setTmVuetifyLocal") || "zh-Hans";
let pdefault_cookies_colorArrayList = tmui_tool_function_util.getCookie("colorArrayList");
let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
let themeObj = new tmui_tool_theme_theme.theme.themeColors();
if (pdefault_cookies_colorArrayList) {
  const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
  themeObj = new tmui_tool_theme_theme.theme.themeColors([...themeObj.colors, ...result2]);
}
const colorArray = themeObj.colors;
const os = (_b = (_a = common_vendor.index.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
tmui_tool_function_util.setCookie("colorArrayList", colorArray);
const useTmpiniaStore = common_vendor.defineStore("tmpinia", {
  state: () => {
    return {
      tmStore: {
        color: pdefault_cookies_color,
        dark,
        tmVueTifly_pages: "",
        tmVueTifly_pagesIndex: "",
        os,
        //这里是微信小程序和微信H5的配置资料。
        wxshareConfig_miniMp: {
          title: "",
          // 分享标题
          desc: "",
          // 描述
          imageUrl: "",
          // 分享图片
          path: "",
          // 分享路径
          copyLink: "",
          // 复制链接
          query: {}
          // 分享参数
        },
        //当前存储存的主题对象。
        colorList: colorArray,
        //当前的语言
        local: pdefault_cookies_local
      }
    };
  },
  actions: {
    setPageNow(url) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pages: url
      });
    },
    setPageNowIndex(index) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pagesIndex: index
      });
    },
    setTmVuetifyDark(dark2) {
      dark2 = typeof dark2 !== "boolean" ? false : dark2;
      tmui_tool_function_util.setCookie("setTmVuetifyBlack", dark2);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        dark: dark2
      });
    },
    setTmAutoDark(autoDark = false) {
      var _a2, _b2;
      tmui_tool_function_util.setCookie("setTmVuetifyAutoDark", autoDark);
      this.tmuiConfig.autoDark = autoDark;
      if (autoDark) {
        let nowstrdark = "";
        nowstrdark = (_b2 = (_a2 = common_vendor.index.getSystemInfoSync()) == null ? void 0 : _a2.osTheme) != null ? _b2 : "";
        this.setTmVuetifyDark(nowstrdark == "dark" ? true : false);
      }
    },
    setWxShare(cfg) {
      let pcf = cfg || {};
      if (typeof pcf !== "object" || Array.isArray(cfg))
        pcf = {};
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
      });
    },
    setTmVuetifyTheme(color) {
      let defaultColorName = color;
      if (!defaultColorName || defaultColorName == "" || tmui_tool_theme_theme.theme.isCssColor(defaultColorName)) {
        defaultColorName = "";
      }
      tmui_tool_function_util.setCookie("setTmVuetifyColor", defaultColorName);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
    },
    //添加一个主题
    setTmVuetifyAddTheme(colorName, color, isSet = true) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        colorList: themeObj.add(colorName, color)
      });
      tmui_tool_function_util.setCookie("colorArrayList", this.tmStore.colorList);
      if (isSet) {
        this.setTmVuetifyTheme(colorName);
      }
    },
    setTmLocal(language) {
      language = language || "zh-Hans";
      tmui_tool_function_util.setCookie("setTmVuetifyLocal", language);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        local: language
      });
    }
  }
});
exports.useTmpiniaStore = useTmpiniaStore;
