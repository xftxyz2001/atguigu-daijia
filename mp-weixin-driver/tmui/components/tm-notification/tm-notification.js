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
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../store/index.js");
if (!Math) {
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-notification",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean],
      default: true
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 2
    },
    shadow: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 16]
    },
    //多少秒后消失。0表示永不消失。
    duration: {
      type: Number,
      default: 2e3
    },
    offset: {
      type: Array,
      default: () => [32, 32]
      //x,y
    },
    //位置
    placement: {
      type: String,
      default: "topLeft"
      //topLeft|topRight|bottomLeft|bottomRight|top|bottom
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "tmicon-info-circle-fill"
    }
  }),
  emits: ["click", "close"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    common_vendor.ref(null);
    const sysinfo = common_vendor.inject(
      "tmuiSysInfo",
      common_vendor.computed(() => {
        return {
          bottom: 0,
          height: 750,
          width: common_vendor.index.upx2px(750),
          top: 0,
          isCustomHeader: false,
          sysinfo: null
        };
      })
    );
    let windowBottom = common_vendor.computed(() => sysinfo.value.bottom);
    let windowTop = common_vendor.computed(() => sysinfo.value.top);
    let windowWidth = common_vendor.computed(() => sysinfo.value.width);
    let uid = NaN;
    const showDom = common_vendor.ref(false);
    const label_str = common_vendor.ref(props.label);
    const icon_str = common_vendor.ref(props.icon);
    const pos = common_vendor.computed(() => {
      if (props.placement == "topLeft") {
        return {
          top: windowTop.value + common_vendor.index.upx2px(props.offset[1]),
          left: common_vendor.index.upx2px(props.offset[0]),
          right: null,
          bottom: null,
          width: null
        };
      }
      if (props.placement == "topRight") {
        return {
          top: windowTop.value + common_vendor.index.upx2px(props.offset[1]),
          left: null,
          right: common_vendor.index.upx2px(props.offset[0]),
          bottom: null,
          width: null
        };
      }
      if (props.placement == "bottomLeft") {
        return {
          top: null,
          left: common_vendor.index.upx2px(props.offset[0]),
          right: null,
          bottom: windowBottom.value + common_vendor.index.upx2px(props.offset[1]),
          width: null
        };
      }
      if (props.placement == "bottomRight") {
        return {
          top: null,
          left: null,
          right: common_vendor.index.upx2px(props.offset[0]),
          bottom: windowBottom.value + common_vendor.index.upx2px(props.offset[1]),
          width: null
        };
      }
      if (props.placement == "top") {
        return {
          top: windowTop.value + common_vendor.index.upx2px(props.offset[1]),
          left: common_vendor.index.upx2px(props.offset[0]),
          right: null,
          bottom: null,
          width: windowWidth.value - common_vendor.index.upx2px(props.offset[0]) * 2
        };
      }
      if (props.placement == "bottom") {
        return {
          top: null,
          left: common_vendor.index.upx2px(props.offset[0]),
          right: null,
          bottom: windowBottom.value + common_vendor.index.upx2px(props.offset[1]),
          width: windowWidth.value - common_vendor.index.upx2px(props.offset[0]) * 2
        };
      }
      return {
        left: null,
        right: null,
        bottom: null,
        width: null,
        top: null
      };
    });
    const color_com = common_vendor.ref(props.color);
    common_vendor.watchEffect(() => {
      color_com.value = props.color;
    });
    common_vendor.onMounted(() => {
      label_str.value = props.label;
      icon_str.value = props.icon;
    });
    common_vendor.onUnmounted(() => {
      clearTimeout(uid);
    });
    function show(arg) {
      var _a2;
      let { icon, label, duration } = arg || {};
      label_str.value = label || props.label || "";
      icon_str.value = icon || props.icon || "";
      color_com.value = ((_a2 = arg == null ? void 0 : arg.color) != null ? _a2 : color_com.value) || color_com.value;
      duration = typeof duration === "undefined" ? props.duration || 0 : duration;
      if (showDom.value || !isNaN(uid)) {
        showDom.value = false;
        clearTimeout(uid);
        common_vendor.nextTick$1(() => {
          showDom.value = true;
          if (!duration)
            return;
          uid = setTimeout(function() {
            showDom.value = false;
          }, duration);
        });
      } else {
        showDom.value = true;
        if (!duration)
          return;
        uid = setTimeout(function() {
          showDom.value = false;
        }, duration);
      }
    }
    function hide() {
      showDom.value = false;
      clearTimeout(uid);
      emits("close");
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showDom.value
      }, showDom.value ? {
        b: common_vendor.p({
          _class: "pr-10",
          fontSize: 26,
          name: icon_str.value
        }),
        c: common_vendor.p({
          _class: "text-overflow-1",
          label: label_str.value
        }),
        d: common_vendor.o(hide),
        e: common_vendor.p({
          fontSize: 24,
          name: "tmicon-times"
        }),
        f: common_vendor.o(($event) => emits("click", $event)),
        g: common_vendor.p({
          color: color_com.value,
          _class: _ctx._class,
          _style: _ctx._style,
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
          margin: props.margin,
          padding: props.padding
        }),
        h: common_vendor.s(common_vendor.unref(pos).left !== null ? {
          left: common_vendor.unref(pos).left + "px"
        } : ""),
        i: common_vendor.s(common_vendor.unref(pos).right !== null ? {
          right: common_vendor.unref(pos).right + "px"
        } : ""),
        j: common_vendor.s(common_vendor.unref(pos).top !== null ? {
          top: common_vendor.unref(pos).top + "px"
        } : ""),
        k: common_vendor.s(common_vendor.unref(pos).bottom !== null ? {
          bottom: common_vendor.unref(pos).bottom + "px"
        } : ""),
        l: common_vendor.s(common_vendor.unref(pos).width !== null ? {
          width: common_vendor.unref(pos).width + "px"
        } : ""),
        m: common_vendor.s(props.shadow ? {
          padding: props.shadow * 4 + "rpx"
        } : "")
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-41e1718e"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-notification/tm-notification.vue"]]);
wx.createComponent(Component);
