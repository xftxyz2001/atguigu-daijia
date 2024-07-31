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
const common_vendor = require("../../common/vendor.js");
const store_modules_tabBarNav = require("../../store/modules/tabBarNav.js");
const utils_index = require("../../utils/index.js");
const utils_is_index = require("../../utils/is/index.js");
require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Array) {
  const _easycom_tm_tabbar_item2 = common_vendor.resolveComponent("tm-tabbar-item");
  const _easycom_tm_tabbar2 = common_vendor.resolveComponent("tm-tabbar");
  (_easycom_tm_tabbar_item2 + _easycom_tm_tabbar2)();
}
const _easycom_tm_tabbar_item = () => "../../tmui/components/tm-tabbar-item/tm-tabbar-item.js";
const _easycom_tm_tabbar = () => "../../tmui/components/tm-tabbar/tm-tabbar.js";
if (!Math) {
  (_easycom_tm_tabbar_item + _easycom_tm_tabbar)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabbar-nav",
  setup(__props) {
    const pageInfo = common_vendor.ref(utils_index.getCurrentPageInfo());
    const tabBarStore = store_modules_tabBarNav.useTabBarStore();
    common_vendor.onShow(() => {
      var _a;
      const routePathIndex = (_a = tabBarStore.tabBarNavList.find((item) => item.pagePath === pageInfo.value.route)) == null ? void 0 : _a.index;
      utils_is_index.isNumber(routePathIndex) && tabBarStore.setActiveNavIndex(routePathIndex);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tabBarStore).tabBarNavList, (item, k0, i0) => {
          return {
            a: item.index,
            b: common_vendor.o(($event) => common_vendor.unref(tabBarStore).setActiveNavIndex(item.index), item.index),
            c: "7e3c7b1e-1-" + i0 + ",7e3c7b1e-0",
            d: common_vendor.p({
              url: item.pagePath,
              activeColor: item.activeColor,
              ["open-type"]: "switchTab",
              text: item.text,
              icon: item.icon
            })
          };
        }),
        b: common_vendor.o(($event) => common_vendor.unref(tabBarStore).activeNavIndex = $event),
        c: common_vendor.p(__spreadProps(__spreadValues({}, _ctx.$attrs), {
          autoSelect: false,
          active: common_vendor.unref(tabBarStore).activeNavIndex
        }))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/components/tabbar-nav/tabbar-nav.vue"]]);
wx.createComponent(Component);
