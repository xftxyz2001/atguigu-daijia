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
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_theme_theme = require("../../tool/theme/theme.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../store/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-text",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    label: {
      type: [String, Number],
      default: ""
    },
    fontSize: {
      type: [Number],
      default: 28
    },
    color: {
      type: String,
      default: ""
    },
    selectable: {
      type: [Boolean],
      default: false
    },
    unit: {
      type: String,
      default: "rpx"
    },
    parentClass: {
      type: String,
      default: ""
    },
    lineHeight: {
      type: [Number, String],
      default: "auto"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const _parentClass = common_vendor.computed(() => props.parentClass);
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _label = common_vendor.computed(() => props.label);
    const _fontSize = common_vendor.computed(() => {
      var _a, _b, _c;
      return Number(props.fontSize) * ((_c = (_b = (_a = store == null ? void 0 : store.tmuiConfig) == null ? void 0 : _a.themeConfig) == null ? void 0 : _b.globalFontSizeRatio) != null ? _c : 1);
    });
    const appTextColor = common_vendor.inject(
      "appTextColor",
      common_vendor.computed(() => void 0)
    );
    const textColor = common_vendor.computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      let isColorHex = tmui_tool_theme_theme.theme.isCssColor(props.color);
      if (isColorHex)
        return props.color;
      if (props.color && !isColorHex) {
        let nowcolor = tmui_tool_theme_theme.theme.getColor(props.color);
        return nowcolor.csscolor;
      }
      if (!appTextColor) {
        if (isDark)
          return "rgba(252, 252, 252, 1.0)";
        return "rgba(34, 34, 34, 1.0)";
      }
      if (appTextColor.value) {
        return appTextColor.value;
      }
      return "rgba(34, 34, 34, 1.0)";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(_label)),
        b: common_vendor.o(($event) => emits("click", $event)),
        c: __props.selectable,
        d: __props.selectable,
        e: common_vendor.n(__props.fontSize ? "" : "text-size-m"),
        f: common_vendor.n(common_vendor.unref(customClass)),
        g: common_vendor.s(props.lineHeight == "auto" ? {
          lineHeight: (common_vendor.unref(_fontSize) ? common_vendor.unref(_fontSize) * 1.3 : 42) + props.unit
        } : {}),
        h: common_vendor.s(props.lineHeight > 0 ? {
          lineHeight: props.lineHeight + props.unit
        } : {}),
        i: common_vendor.s({
          color: common_vendor.unref(textColor)
        }),
        j: common_vendor.s(common_vendor.unref(_fontSize) ? {
          fontSize: common_vendor.unref(_fontSize) + props.unit
        } : ""),
        k: common_vendor.s(common_vendor.unref(customCSSStyle)),
        l: common_vendor.n(common_vendor.unref(_parentClass))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3acfd808"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-text/tm-text.vue"]]);
wx.createComponent(Component);
