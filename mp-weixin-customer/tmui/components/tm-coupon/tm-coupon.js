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
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../store/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmAvatar + tmText + tmButton + tmIcon + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmAvatar = () => "../tm-avatar/tm-avatar.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const tmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-coupon",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    margin: {
      type: Array,
      default: () => [32, 12]
    },
    transprent: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    fontColor: {
      type: String,
      default: "black"
    },
    priceDetail: {
      type: Object,
      default: () => {
        return {
          price: 100,
          suffix: "元",
          prefix: "",
          subtext: "满减券"
        };
      }
    },
    rightDetail: {
      type: Object,
      default: () => {
        return {
          title: "券的标题",
          subtitle: "券的小标题",
          time: "有效期:2022-6-3-2022-7-3"
        };
      }
    },
    shadow: {
      type: Number,
      default: 0
    },
    round: {
      type: Number,
      default: 3
    },
    border: {
      type: Number,
      default: 0
    },
    //优惠券左边是金额文本模式还是图片模式，默认为空，即金额文本模式。
    thumb: {
      type: String,
      default: ""
    },
    //是否显示左边金额或者头像。
    showRight: {
      type: Boolean,
      default: true
    },
    //是否显示额外的详情内容。
    extra: {
      type: Boolean,
      default: false
    },
    //额外内容初始打开状态。
    extraActive: {
      type: Boolean,
      default: false
    },
    moreText: {
      type: String,
      default: "规则详情"
    },
    //强调色，金额 和 按钮的主题色
    mainColor: {
      type: String,
      default: "red"
    },
    btnTextMode: {
      type: Boolean,
      default: false
    },
    btnLabel: {
      type: String,
      default: "立即使用"
    },
    //是否禁用，等于已使用。
    disable: {
      type: Boolean,
      default: false
    },
    disableColor: {
      type: String,
      default: "grey-1"
    },
    disableBgColor: {
      type: String,
      default: "grey-3"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const _priceDetail = common_vendor.computed(() => props.priceDetail);
    const _rightDetail = common_vendor.computed(() => props.rightDetail);
    const _thumb = common_vendor.computed(() => props.thumb);
    const _extraActive = common_vendor.ref(props.extraActive);
    const _moreText = common_vendor.computed(() => props.moreText);
    const _btnLabel = common_vendor.computed(() => props.btnLabel);
    const _disable = common_vendor.computed(() => props.disable);
    const _disableColor = common_vendor.computed(() => props.disableColor);
    const _disableBgColor = common_vendor.computed(() => props.disableBgColor);
    common_vendor.computed(() => store.tmStore.dark);
    const _fontColor = common_vendor.computed(() => {
      if (store.tmStore.dark && props.fontColor !== "" && (props.fontColor == "black" || props.fontColor == "white")) {
        return "white";
      }
      return props.fontColor;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.showRight
      }, props.showRight ? common_vendor.e({
        b: common_vendor.unref(_thumb)
      }, common_vendor.unref(_thumb) ? {
        c: common_vendor.p({
          size: 80,
          round: 24,
          img: common_vendor.unref(_thumb)
        })
      } : {}, {
        d: !common_vendor.unref(_thumb)
      }, !common_vendor.unref(_thumb) ? {
        e: common_vendor.p({
          ["follow-dark"]: true,
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : props.mainColor,
          ["font-size"]: 22,
          label: common_vendor.unref(_priceDetail).prefix
        }),
        f: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : props.mainColor,
          _class: "px-10 text-weight-b",
          ["font-size"]: 42,
          label: common_vendor.unref(_priceDetail).price
        }),
        g: common_vendor.p({
          ["follow-dark"]: true,
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : props.mainColor,
          ["font-size"]: 22,
          label: common_vendor.unref(_priceDetail).suffix
        }),
        h: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          _class: "pr-10 opacity-7",
          ["font-size"]: 22,
          label: common_vendor.unref(_priceDetail).subtext
        })
      } : {}) : {}, {
        i: common_vendor.p({
          ["follow-dark"]: true,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          ["font-size"]: 36,
          _class: "text-weight-b",
          label: common_vendor.unref(_rightDetail).title
        }),
        j: common_vendor.p({
          ["follow-dark"]: true,
          _class: "opacity-7",
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          ["font-size"]: 24,
          label: common_vendor.unref(_rightDetail).subtitle
        }),
        k: common_vendor.o(($event) => emits("click", $event)),
        l: common_vendor.p({
          disabled: common_vendor.unref(_disable),
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : props.mainColor,
          ["font-color"]: common_vendor.unref(_disable) ? "grey" : "",
          text: props.btnTextMode,
          size: "small",
          width: 120,
          label: common_vendor.unref(_btnLabel)
        }),
        m: common_vendor.p({
          _class: "opacity-7",
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          ["font-size"]: 22,
          label: common_vendor.unref(_rightDetail).time
        }),
        n: props.extra
      }, props.extra ? {
        o: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          _class: "pr-10",
          ["font-size"]: 22,
          label: common_vendor.unref(_moreText)
        }),
        p: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableColor) : common_vendor.unref(_fontColor),
          ["font-size"]: 20,
          name: !_extraActive.value ? "tmicon-angle-down" : "tmicon-angle-up"
        }),
        q: common_vendor.o(($event) => _extraActive.value = !_extraActive.value)
      } : {}, {
        r: props.extra && _extraActive.value
      }, props.extra && _extraActive.value ? {} : {}, {
        s: common_vendor.p({
          margin: [0, 0],
          padding: [24, 24],
          ["paren-class"]: "flex-1",
          color: common_vendor.unref(_disable) ? common_vendor.unref(_disableBgColor) : props.color,
          _style: props._style,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          _class: "flex flex-row flex-between flex-row-start-start"
        }),
        t: common_vendor.n(`px-${props.margin[0]}`),
        v: common_vendor.n(`pb-${props.margin[1]}`)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-coupon/tm-coupon.vue"]]);
wx.createComponent(Component);
