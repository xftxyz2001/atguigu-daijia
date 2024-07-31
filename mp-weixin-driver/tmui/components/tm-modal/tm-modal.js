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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
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
  (tmText + tmIcon + tmSheet + tmTranslate + tmOverlay)();
}
const tmTranslate = () => "../tm-translate/tm-translate.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmOverlay = () => "../tm-overlay/tm-overlay.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-modal",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //是否显示遮罩
    mask: {
      type: [Boolean],
      default: false
    },
    border: {
      type: Number,
      default: 2
    },
    show: {
      type: [Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 450
    },
    round: {
      type: Number,
      default: 10
    },
    //弹出的动画时间单位ms.
    duration: {
      type: Number,
      default: 250
    },
    //是否允许点击遮罩关闭
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    //如果显示关闭。标题栏被替换为左标题右关闭按钮。
    closeable: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: [String],
    okText: {
      type: [String],
      default: "完成"
    },
    okColor: {
      type: [String],
      default: "primary"
    },
    okLinear: {
      type: [String],
      default: ""
      //left:右->左，right:左->右。top:下->上，bottom:上->下。
    },
    // 渐变的亮浅
    okLlinearDeep: {
      type: [String],
      default: "accent"
      //light,dark,亮系渐变和深色渐变。
    },
    cancelColor: {
      type: [String],
      default: "primary"
    },
    cancelText: {
      type: [String],
      default: "取消"
    },
    cancelLinear: {
      type: [String],
      default: ""
      //left:右->左，right:左->右。top:下->上，bottom:上->下。
    },
    // 渐变的亮浅
    cancelLlinearDeep: {
      type: [String],
      default: "accent"
      //light,dark,亮系渐变和深色渐变。
    },
    //只有在分享式按钮下才有作用。
    btnRound: {
      type: Number,
      default: 24
    },
    hideCancel: {
      type: [Boolean],
      default: false
    },
    //分离式按钮。
    splitBtn: {
      type: Boolean,
      default: false
    },
    //在关闭前执行的回调函数。返回false时即取消关闭窗体。在app端返回的是true,而非app是function,需要再次执行
    beforeClose: {
      type: Function,
      default: () => {
        return () => true;
      }
    },
    content: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    titleStyle: {
      type: [Array, String, Object],
      default: () => []
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    /** 是否使用teleport */
    teleport: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["click", "open", "close", "update:show", "ok", "cancel"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const drawerANI = common_vendor.ref(null);
    const overlayAni = common_vendor.ref(null);
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    let rejCall = null;
    let resCall = null;
    let isOkClose = false;
    let nowCallFun = null;
    const reverse = common_vendor.ref(true);
    let flag = false;
    common_vendor.index.$tm.u.getUid(4);
    const okLoading = common_vendor.ref(false);
    let _show = common_vendor.ref(props.show);
    let timerId = NaN;
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    function throttle(func, wait = 500, immediate = true) {
      if (immediate) {
        if (!flag) {
          flag = true;
          typeof func === "function" && func();
          setTimeout(() => {
            flag = false;
          }, wait);
        }
      } else {
        if (!flag) {
          flag = true;
          setTimeout(() => {
            flag = false;
            typeof func === "function" && func();
          }, wait);
        }
      }
    }
    common_vendor.watch(
      () => props.show,
      (val) => {
        if (val) {
          opens();
        } else {
          close();
        }
      }
    );
    common_vendor.onMounted(() => {
      if (_show.value) {
        opens();
      }
    });
    const round_rp = common_vendor.computed(() => {
      return "round-" + props.round;
    });
    const reverse_rp = common_vendor.computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = common_vendor.computed(() => {
      return "zoom";
    });
    const anwidth = common_vendor.computed(() => {
      return props.width + "rpx";
    });
    const anheight = common_vendor.computed(() => {
      return props.height + "rpx";
    });
    const contentHeight = common_vendor.computed(() => {
      let bas = 0;
      if (props.splitBtn) {
        bas = common_vendor.index.upx2px(64);
      }
      return common_vendor.index.upx2px(props.height) - 44 - common_vendor.index.upx2px(90) - bas + "px";
    });
    const align_rp = common_vendor.computed(() => {
      return "flex-center";
    });
    function ok() {
      return __async(this, null, function* () {
        if (props.disabled)
          return;
        debounce(
          () => __async(this, null, function* () {
            try {
              if (typeof props.beforeClose === "function") {
                okLoading.value = true;
                let p = yield props.beforeClose();
                if (typeof p === "function") {
                  p = yield p();
                }
                okLoading.value = false;
                if (!p)
                  return;
              }
              emits("ok", common_vendor.toRaw(nowCallFun));
              isOkClose = true;
              close();
            } catch (e) {
              okLoading.value = false;
            }
          }),
          250,
          true
        );
      });
    }
    function cancel() {
      if (props.disabled)
        return;
      if (okLoading.value)
        return;
      isOkClose = false;
      emits("cancel", common_vendor.toRaw(nowCallFun));
      close();
    }
    function OverLayOpen() {
      common_vendor.nextTick$1(function() {
        var _a2;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
      });
      emits("open");
      emits("update:show", true);
      _show.value = true;
    }
    function overclose() {
      common_vendor.nextTick$1(() => {
        emits("close");
        emits("update:show", false);
        _show.value = false;
        if (resCall && isOkClose) {
          resCall();
        }
        if (rejCall && !isOkClose) {
          rejCall();
        }
      });
    }
    function open(arg = null) {
      if (okLoading.value)
        return;
      if (_show.value == true)
        return;
      return new Promise((res, rej) => {
        throttle(
          () => __async(this, null, function* () {
            var _a2;
            reverse.value = true;
            (_a2 = overlayAni.value) == null ? void 0 : _a2.open(true);
            nowCallFun = arg;
            rejCall = rej;
            resCall = res;
          }),
          props.duration,
          true
        );
      });
    }
    function opens() {
      if (props.disabled)
        return;
      if (okLoading.value)
        return;
      if (_show.value == true)
        return;
      debounce(
        () => {
          var _a2;
          reverse.value = true;
          _show.value = true;
          (_a2 = overlayAni.value) == null ? void 0 : _a2.open(true);
        },
        props.duration,
        true
      );
    }
    function close(arg = null) {
      return __async(this, null, function* () {
        var _a2, _b2;
        reverse.value = false;
        if (!drawerANI.value)
          return;
        (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
      });
    }
    function overlayClickFun(e) {
      if (_show.value == false)
        return;
      emits("click", e);
      if (!props.overlayClick || props.disabled || okLoading.value || !overlayAni.value)
        return;
      reverse.value = false;
      throttle(
        () => {
          var _a2, _b2;
          isOkClose = false;
          (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
          (_b2 = drawerANI.value) == null ? void 0 : _b2.play();
        },
        props.duration,
        true
      );
    }
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(opens),
        b: common_vendor.p({
          _style: props.titleStyle,
          dark: props.dark,
          followTheme: false,
          _class: "text-overflow-1 text-weight-b text-size-m text-align-center",
          label: props.title
        }),
        c: __props.closeable
      }, __props.closeable ? {
        d: common_vendor.o(close),
        e: common_vendor.p({
          _class: "opacity-3",
          name: "tmicon-times-circle-fill",
          fontSize: 32
        })
      } : {}, {
        f: common_vendor.n(props.closeable ? "flex-row-center-between" : "flex-center"),
        g: common_vendor.p({
          ["font-size"]: 30,
          dark: props.dark,
          followTheme: false,
          label: props.content,
          _style: "line-height:46rpx"
        }),
        h: common_vendor.s(props.height ? {
          height: common_vendor.unref(contentHeight)
        } : ""),
        i: !props.hideCancel
      }, !props.hideCancel ? {
        j: common_vendor.p({
          _class: "text-weight-b",
          _style: "line-height:90rpx",
          dark: props.dark,
          followTheme: false,
          userInteractionEnabled: false,
          label: props.cancelText
        }),
        k: common_vendor.o(cancel),
        l: common_vendor.p({
          dark: props.dark,
          followTheme: true,
          isDisabledRoundAndriod: true,
          height: 90,
          linear: props.cancelLinear,
          linearDeep: props.cancelLlinearDeep,
          text: true,
          color: props.cancelColor,
          _class: ["flex-center overflow flex"],
          ["paren-class"]: props.splitBtn ? "round-" + props.btnRound : "round-bl-" + props.round,
          margin: [0, 0],
          padding: [0, 0]
        })
      } : {}, {
        m: props.splitBtn && !props.hideCancel
      }, props.splitBtn && !props.hideCancel ? {} : {}, {
        n: okLoading.value
      }, okLoading.value ? {
        o: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-shuaxin",
          spin: true
        })
      } : {}, {
        p: common_vendor.p({
          _class: "text-weight-b",
          dark: props.dark,
          userInteractionEnabled: false,
          label: props.okText
        }),
        q: common_vendor.o(ok),
        r: common_vendor.p({
          paretClass: "flex-1",
          dark: props.dark,
          followTheme: true,
          isDisabledRoundAndriod: true,
          height: 90,
          linear: props.okLinear,
          linearDeep: props.okLlinearDeep,
          color: props.okColor,
          margin: [0, 0],
          _class: ["flex-center overflow"],
          ["paren-class"]: props.splitBtn ? "round-" + props.btnRound : "round-br-" + props.round,
          padding: [0, 0]
        }),
        s: common_vendor.n(okLoading.value ? "opacity-5" : ""),
        t: common_vendor.n(props.splitBtn ? "pa-32" : ""),
        v: common_vendor.o(($event) => $event.stopPropagation()),
        w: common_vendor.s({
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight),
          boxSizing: "border-box"
        }),
        x: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).borderCss : ""),
        y: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).backgroundColorCss : ""),
        z: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).shadowColor : ""),
        A: common_vendor.s(common_vendor.unref(customCSSStyle)),
        B: common_vendor.n(common_vendor.unref(round_rp)),
        C: common_vendor.n(common_vendor.unref(customClass)),
        D: common_vendor.sr(drawerANI, "302d01b3-1,302d01b3-0", {
          "k": "drawerANI"
        }),
        E: common_vendor.p({
          reverse: common_vendor.unref(reverse_rp),
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight),
          ["auto-play"]: false,
          name: common_vendor.unref(aniname),
          duration: props.duration
        }),
        F: common_vendor.sr(overlayAni, "302d01b3-0", {
          "k": "overlayAni"
        }),
        G: common_vendor.o(overclose),
        H: common_vendor.o(OverLayOpen),
        I: common_vendor.o(overlayClickFun),
        J: common_vendor.o(($event) => common_vendor.isRef(_show) ? _show.value = $event : _show = $event),
        K: common_vendor.p({
          zIndex: props.zIndex,
          blur: true,
          duration: props.duration,
          align: common_vendor.unref(align_rp),
          overlayClick: false,
          teleport: props.teleport,
          show: common_vendor.unref(_show)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-302d01b3"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-modal/tm-modal.vue"]]);
wx.createComponent(Component);
