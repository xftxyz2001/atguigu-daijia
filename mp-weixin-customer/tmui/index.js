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
var _a, _b, _c, _d;
const common_vendor = require("../common/vendor.js");
const tmui_tool_lib_fetch = require("./tool/lib/fetch.js");
const tmui_tool_function_util = require("./tool/function/util.js");
const tmui_tool_lib_language = require("./tool/lib/language.js");
const tmui_tool_lib_share = require("./tool/lib/share.js");
const tmui_tool_lib_tmuiconfigDefault = require("./tool/lib/tmuiconfigDefault.js");
const tmui_tool_function_preview = require("./tool/function/preview.js");
const easycom = {
  autoscan: true,
  custom: {
    "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue",
    "^(.*)": "@/components/*/*.vue"
  }
};
const pages$1 = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "首页",
      navigationStyle: "custom",
      titlePenetrate: "YES"
    }
  },
  {
    path: "pages/coupon/coupon",
    style: {
      navigationBarTitleText: "优惠券"
    }
  },
  {
    path: "pages/userCenter/userCenter",
    style: {
      navigationBarTitleText: "个人中心"
    }
  },
  {
    path: "pages/creatOrder/creatOrder",
    style: {
      navigationBarTitleText: "确认下单"
    }
  },
  {
    path: "pages/orderList/orderList",
    style: {
      navigationBarTitleText: "订单列表"
    }
  },
  {
    path: "pages/orderDetail/orderDetail",
    style: {
      navigationBarTitleText: "订单详情"
    }
  },
  {
    path: "pages/login/login",
    style: {
      navigationBarTitleText: "登陆"
    }
  },
  {
    path: "pages/paySuccess/paySuccess",
    style: {
      navigationBarTitleText: "支付成功"
    }
  }
];
const tabBar$1 = {
  color: "#bfbfbf",
  selectedColor: "#0165FF",
  backgroundColor: "#ffffff",
  list: [
    {
      pagePath: "pages/index/index",
      text: ""
    },
    {
      pagePath: "pages/coupon/coupon",
      text: ""
    },
    {
      pagePath: "pages/userCenter/userCenter",
      text: ""
    }
  ]
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#FFFFFF",
  backgroundColor: "#FFFFFF"
};
const condition = {
  current: 0,
  list: [
    {
      name: "测试页-首页",
      path: "pages/index/index"
    },
    {
      name: "测试页-优惠券",
      path: "pages/coupon/coupon",
      query: ""
    },
    {
      name: "测试页-个人中心",
      path: "pages/userCenter/userCenter"
    },
    {
      name: "测试页-确认订单",
      path: "pages/creatOrder/creatOrder"
    },
    {
      name: "测试页-订单列表",
      path: "pages/orderList/orderList"
    },
    {
      name: "测试页-订单详情",
      path: "pages/orderDetail/orderDetail"
    },
    {
      name: "测试页-登陆",
      path: "pages/login/login"
    },
    {
      name: "测试页-支付成功",
      path: "pages/paySuccess/paySuccess"
    }
  ]
};
const PageJsonInit = {
  easycom,
  pages: pages$1,
  tabBar: tabBar$1,
  globalStyle,
  condition
};
let pages = [];
if (typeof (PageJsonInit == null ? void 0 : PageJsonInit.pages) == "undefined") {
  PageJsonInit.pages = [];
}
PageJsonInit.pages.forEach((el) => {
  var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j;
  let customType = (_b2 = (_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default";
  let bg = ((_f = (_e = (_c2 = el.style) == null ? void 0 : _c2.navigationBarBackgroundColor) != null ? _e : (_d2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _d2.navigationBarBackgroundColor) != null ? _f : "#FFFFFF") || "#FFFFFF";
  let txtColor = ((_j = (_i = (_g = el.style) == null ? void 0 : _g.navigationBarTextStyle) != null ? _i : (_h = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _h.navigationBarTextStyle) != null ? _j : "black") || "black";
  pages.push({
    path: el.path,
    custom: customType,
    navigationBarBackgroundColor: bg,
    navigationBarTextStyle: txtColor
  });
});
if (Array.isArray((_a = PageJsonInit == null ? void 0 : PageJsonInit.subPackages) != null ? _a : null)) {
  PageJsonInit == null ? void 0 : PageJsonInit.subPackages.forEach((el) => {
    let rootPath = el.root;
    el.pages.forEach((el2) => {
      var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j;
      let elany = el2;
      let bg = ((_d2 = (_c2 = (_a2 = el2.style) == null ? void 0 : _a2.navigationBarBackgroundColor) != null ? _c2 : (_b2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _b2.navigationBarBackgroundColor) != null ? _d2 : "#FFFFFF") || "#FFFFFF";
      let txtColor = ((_h = (_g = (_e = el2.style) == null ? void 0 : _e.navigationBarTextStyle) != null ? _g : (_f = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _f.navigationBarTextStyle) != null ? _h : "black") || "black";
      pages.push({
        path: rootPath + "/" + elany.path,
        custom: (_j = (_i = elany == null ? void 0 : elany.style) == null ? void 0 : _i.navigationStyle) != null ? _j : "default",
        navigationBarBackgroundColor: bg,
        navigationBarTextStyle: txtColor
      });
    });
  });
}
let pagers = PageJsonInit;
let tabBar = (_b = pagers == null ? void 0 : pagers.tabBar) != null ? _b : {
  color: "",
  selectedColor: "",
  borderStyle: "",
  backgroundColor: "",
  list: []
};
let cusutomIconList = [];
let $tm = {
  tabBar,
  pages,
  globalNavStyle: (_c = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle.navigationStyle) != null ? _c : "",
  isOpenDarkModel: ((_d = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _d.navigationBarBackgroundColor).indexOf("@") > -1,
  isColor: (color) => {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  },
  /**tmui3.0工具函数 */
  u: __spreadProps(__spreadValues({}, tmui_tool_function_util.util), { preview: tmui_tool_function_preview.preview }),
  /**tmui3.0国际化语言辅助函数 */
  language: tmui_tool_lib_language.language,
  fetch: tmui_tool_lib_fetch.fetchNet,
  tmicon: [
    {
      font: "tmicon",
      prefix: "tmicon-",
      fontJson: cusutomIconList
    }
  ],
  config: tmui_tool_lib_tmuiconfigDefault.tmuiconfigdefault
};
const tmui = {
  /**
   * tmui3.0
   * @param app Vue
   * @param options tmui3.0配置
   */
  install: (app, options = {}) => {
    common_vendor.index.addInterceptor("navigateTo", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          linsInko({
            path: result.url,
            context: null,
            openType: "navigateTo"
          });
        });
      },
      success(result) {
      }
    });
    common_vendor.index.addInterceptor("redirectTo", {
      success(result) {
        var _a2, _b2, _c2;
        let pages2 = getCurrentPages().pop();
        let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
        let msg = (_b2 = result.errMsg) != null ? _b2 : "";
        let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("reLaunch", {
      success(result) {
        var _a2, _b2, _c2;
        let pages2 = getCurrentPages().pop();
        let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
        let msg = (_b2 = result.errMsg) != null ? _b2 : "";
        let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("navigateBack", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          var _a2, _b2, _c2;
          let pages2 = getCurrentPages().pop();
          let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
          let msg = (_b2 = result.errMsg) != null ? _b2 : "";
          (_c2 = msg.split(":")[0]) != null ? _c2 : "";
          linsInko({
            path,
            context: null,
            openType: "navigateBack"
          });
        });
      },
      success(result) {
      }
    });
    function linsInko(obj) {
      obj.path = obj.path[0] == "/" ? obj.path.substr(1) : obj.path;
    }
    options = tmui_tool_function_util.deepObjectMerge($tm.config, options);
    const pinia = app.config.globalProperties.$pinia || null;
    const tmPiniaPlugin = (context) => {
      if (context.store.$id === "tmpinia") {
        context.store.tmuiConfig = options;
        context.store.$state.tmuiConfig = options;
      }
    };
    if (pinia) {
      pinia.use(tmPiniaPlugin);
    } else {
      const pinia2 = common_vendor.createPinia();
      pinia2.use(tmPiniaPlugin);
      app.use(pinia2);
    }
    app.use(tmui_tool_lib_language.languageByGlobal());
    let appconfig = {};
    if (!$tm.config.shareDisable) {
      const { onShareAppMessage, onShareTimeline } = tmui_tool_lib_share.share();
      appconfig = __spreadProps(__spreadValues({}, appconfig), { onShareAppMessage, onShareTimeline });
    }
    app.mixin(__spreadValues({}, appconfig));
    $tm = __spreadProps(__spreadValues({}, $tm), {
      config: options
    });
    common_vendor.index.$tm = $tm;
    app.config.globalProperties.tm = $tm;
  }
};
exports.tmui = tmui;
