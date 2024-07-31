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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-translate",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    duration: {
      type: Number,
      default: 300
    },
    delay: {
      type: Number,
      default: 0
    },
    //动画名称
    name: {
      type: String,
      default: "fade"
      //fade,left,right,up,down,zoom
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 0
    },
    //是否反向动画
    reverse: {
      type: [Boolean, String],
      default: false
    },
    //每变动一次，就重置动画一下，这个属性不对外，特殊情况使用。
    initByWechat: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["start", "end", "click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    function hanlder(e) {
      emits("click", e);
    }
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const computedHeight = common_vendor.computed(() => {
      if (!props.height || !Number(props.height)) {
        return 0;
      }
      if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
        return String(props.height);
      }
      return String(props.height) + "rpx";
    });
    const computedWidth = common_vendor.computed(() => {
      if (!props.width) {
        return 0;
      }
      if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
        return props.width;
      }
      return props.width + "rpx";
    });
    const animationName = common_vendor.computed(() => props.name || "fade");
    const durationtos = common_vendor.ref(props.duration);
    const computedReverse = common_vendor.computed(() => props.reverse);
    const reverseAniPrefxname = common_vendor.computed(() => computedReverse.value ? "-reverse" : "");
    const animationClassName = common_vendor.ref(animationName.value + reverseAniPrefxname.value);
    const animationStatus = common_vendor.ref(0);
    const tmid = common_vendor.ref(Number(common_vendor.index.$tm.u.getUid(3)));
    const isLoadEl = common_vendor.ref(false);
    common_vendor.ref(null);
    common_vendor.watch([() => props.initByWechat, () => props.name], () => {
      reset();
    });
    common_vendor.watch([() => props.name], () => {
      animationClassName.value = animationName.value + reverseAniPrefxname.value;
    });
    function init() {
      common_vendor.nextTick$1(() => {
        isLoadEl.value = true;
        if (props.autoPlay == true && !props.disabled) {
          common_vendor.nextTick$1(() => play());
        }
      });
    }
    function play() {
      if (props.disabled == true)
        return;
      animationStatus.value = 0;
      noNvueAmations();
    }
    function stop() {
      if (props.disabled == true)
        return;
      clearTimeout(tmid.value);
      animationStatus.value = 0;
    }
    function reset() {
      stop();
      animationStatus.value = 0;
    }
    expose({
      init,
      play,
      stop,
      reset
    });
    common_vendor.onMounted(() => init());
    common_vendor.onUnmounted(() => {
      clearTimeout(tmid.value);
      animationStatus.value = 0;
    });
    function noNvueAmations() {
      clearTimeout(tmid.value);
      tmid.value = setTimeout(() => {
        if (computedReverse.value) {
          animationClassName.value = animationName.value;
        } else {
          animationClassName.value = animationName.value + "-reverse";
        }
        tmid.value = setTimeout(() => {
          emits("end");
        }, props.duration);
      }, 20);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoadEl.value
      }, isLoadEl.value ? {
        b: `${durationtos.value}ms`,
        c: common_vendor.n(animationClassName.value),
        d: common_vendor.n(common_vendor.unref(customClass))
      } : {}, {
        e: common_vendor.o(hanlder),
        f: common_vendor.n(common_vendor.unref(customClass)),
        g: common_vendor.s(common_vendor.unref(computedHeight) ? {
          height: common_vendor.unref(computedHeight)
        } : ""),
        h: common_vendor.s(common_vendor.unref(computedWidth) ? {
          width: common_vendor.unref(computedWidth)
        } : ""),
        i: common_vendor.s(common_vendor.unref(customCSSStyle))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c8a1639"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-translate/tm-translate.vue"]]);
wx.createComponent(Component);
