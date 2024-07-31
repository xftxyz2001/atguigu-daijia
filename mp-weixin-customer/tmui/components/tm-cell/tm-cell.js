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
const tmui_tool_lib_interface = require("../../tool/lib/interface.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../../store/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmImage + tmText + tmIcon + tmSheet + tmDivider)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmImage = () => "../tm-image/tm-image.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-cell",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number, Array],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    //标题
    title: {
      type: String,
      default: ""
    },
    titleFontSize: {
      type: [Number],
      default: 28
    },
    titleColor: {
      type: String,
      default: ""
    },
    //标题下方的介绍
    label: {
      type: String,
      default: ""
    },
    labelFontSize: {
      type: [Number],
      default: 22
    },
    labelColor: {
      type: String,
      default: "grey"
    },
    //右边文字
    rightText: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: "tmicon-angle-right"
    },
    //右边文字
    rightColor: {
      type: String,
      default: "grey"
    },
    //右边文字大小。
    rightTextSize: {
      type: Number,
      default: 24
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    //头像。
    //https://picsum.photos/200
    avatar: {
      type: String,
      default: ""
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarRound: {
      type: Number,
      default: 10
    },
    border: {
      type: [Number],
      default: 0
    },
    borderDirection: {
      type: [String],
      default: tmui_tool_lib_interface.cssDirection.bottom
    },
    //显示下边线
    bottomBorder: {
      type: [Boolean],
      default: false
    },
    //当有链接地址时，将打开链接
    url: {
      type: String,
      default: ""
    },
    //暗下强制的背景色，
    //有时自动的背景，可能不是你想要暗黑背景，此时可以使用此参数，强制使用背景色，
    //只能是颜色值。
    darkBgColor: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    function cellClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          common_vendor.index.navigateTo({
            url: props.url,
            fail(error) {
              console.error("打开连接错误：", error);
            }
          });
        } catch (e2) {
        }
      }
    }
    const _computedValue = common_vendor.computed(() => props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_computedValue).showAvatar
      }, common_vendor.unref(_computedValue).showAvatar ? {
        b: common_vendor.p({
          round: common_vendor.unref(_computedValue).avatarRound,
          width: common_vendor.unref(_computedValue).avatarSize,
          height: common_vendor.unref(_computedValue).avatarSize,
          src: common_vendor.unref(_computedValue).avatar
        }),
        c: `${common_vendor.unref(_computedValue).avatarSize}rpx`,
        d: `${common_vendor.unref(_computedValue).avatarSize}rpx`
      } : {}, {
        e: common_vendor.p({
          color: common_vendor.unref(_computedValue).titleColor,
          fontSize: common_vendor.unref(_computedValue).titleFontSize,
          label: common_vendor.unref(_computedValue).title
        }),
        f: common_vendor.unref(_computedValue).label
      }, common_vendor.unref(_computedValue).label ? {
        g: common_vendor.p({
          color: common_vendor.unref(_computedValue).labelColor,
          fontSize: common_vendor.unref(_computedValue).labelFontSize,
          label: common_vendor.unref(_computedValue).label
        })
      } : {}, {
        h: common_vendor.n(common_vendor.unref(_computedValue).showAvatar ? "pl-24" : ""),
        i: common_vendor.unref(_computedValue).rightText
      }, common_vendor.unref(_computedValue).rightText ? {
        j: common_vendor.p({
          _class: "nowrap pr-12",
          color: common_vendor.unref(_computedValue).rightColor,
          fontSize: common_vendor.unref(_computedValue).rightTextSize,
          label: common_vendor.unref(_computedValue).rightText
        })
      } : {}, {
        k: common_vendor.unref(_computedValue).rightIcon
      }, common_vendor.unref(_computedValue).rightIcon ? {
        l: common_vendor.p({
          _class: "opacity-3",
          name: common_vendor.unref(_computedValue).rightIcon,
          fontSize: 22
        })
      } : {}, {
        m: common_vendor.n(common_vendor.unref(_computedValue).url ? "url" : ""),
        n: common_vendor.o(cellClick),
        o: common_vendor.p({
          darkBgColor: props.darkBgColor,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
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
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding,
          _class: props._class,
          _style: props._style,
          ["hover-class"]: "opacity-6"
        }),
        p: common_vendor.unref(_computedValue).bottomBorder
      }, common_vendor.unref(_computedValue).bottomBorder ? {
        q: `${common_vendor.unref(_computedValue).avatar !== "" ? common_vendor.unref(_computedValue).avatarSize + common_vendor.unref(_computedValue).margin[0] : 0}rpx`,
        r: common_vendor.p({
          margin: [0, 0],
          border: 2,
          color: "grey-5",
          ["real-color"]: !common_vendor.unref(store).tmStore.dark
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c423bcaa"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-cell/tm-cell.vue"]]);
wx.createComponent(Component);
