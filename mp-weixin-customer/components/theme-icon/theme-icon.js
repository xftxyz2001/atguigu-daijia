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
const hooks_useTheme = require("../../hooks/useTheme.js");
require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
require("../../store/modules/tabBarNav.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "theme-icon",
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { tmPiniaStore, getThemeColor } = hooks_useTheme.useTheme();
    const themeColor = common_vendor.computed(() => {
      let themeColorName = tmPiniaStore.tmStore.color;
      if (themeColorName) {
        return getThemeColor();
      }
      return getThemeColor();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p(__spreadProps(__spreadValues({}, _ctx.$attrs), {
          color: __props.color || common_vendor.unref(themeColor)
        }))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/components/theme-icon/theme-icon.vue"]]);
wx.createComponent(Component);
