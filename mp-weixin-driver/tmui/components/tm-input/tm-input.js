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
  (tmIcon + tmText + TmButton + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const TmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    searchFontColor: {
      type: String,
      default: ""
    },
    searchWidth: {
      type: Number,
      default: 0
    },
    prefixColor: {
      type: String,
      default: ""
    },
    suffixColor: {
      type: String,
      default: ""
    },
    //激活时的主题配色。
    focusColor: {
      type: String,
      default: "primary"
    },
    //默认使用自动配色
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    //前缀图标
    prefix: {
      type: String,
      default: ""
    },
    //前缀文字
    prefixLabel: {
      type: String,
      default: ""
    },
    //后缀图标
    suffix: {
      type: String,
      default: ""
    },
    //后缀文字
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    //tmicon-search
    search: {
      type: String,
      default: ""
    },
    //搜索
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    //错误时，提示的文本。
    errorLabel: {
      type: String,
      default: "请输入内容"
    },
    //对齐方式。
    //left,right,center
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    //是否显示字符统计。
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    //默认的聚集状态
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    readyOnly: {
      type: Boolean,
      default: false
    },
    /**横向布局的对齐类,主要是用来配置文本域时,左图标需要顶对齐或者左中对齐. */
    layoutAlign: {
      type: String,
      default: "flex-row-top-start"
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const isAndroid = common_vendor.ref(false);
    isAndroid.value = common_vendor.index.getSystemInfoSync().osName == "android" ? true : false;
    const _height = common_vendor.computed(() => props.height);
    const _inputPadding = common_vendor.computed(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
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
          timerId = NaN;
        }, wait);
      }
    }
    const propsDetail = common_vendor.computed(() => {
      return __spreadProps(__spreadValues({}, props), {
        fontSize_px: common_vendor.index.upx2px(props.fontSize)
      });
    });
    props.modelValue;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _requiredError = common_vendor.ref(false);
    const _foucsActive = common_vendor.ref(props.focus || false);
    common_vendor.watch(
      () => props.focus,
      () => {
        _foucsActive.value = props.focus;
      }
    );
    const _color = common_vendor.computed(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = common_vendor.computed(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return tmui_tool_lib_minxs.computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = common_vendor.ref(propsDetail.value.password);
    const showPasswordIcon = common_vendor.computed(() => props.password);
    common_vendor.ref(props.errorLabel);
    const _value = common_vendor.ref(props.modelValue);
    const _valueLenChar = common_vendor.computed(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    common_vendor.watch(
      () => props.modelValue,
      () => _value.value = props.modelValue
    );
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus(e) {
      _foucsActive.value = true;
      emits("focus", e);
    }
    function blur(e) {
      _foucsActive.value = false;
      emits("blur", e);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    function inputClick(e, type) {
      if (type == "ali") {
        debounce(
          () => {
            emits("click", e);
          },
          200,
          true
        );
        return;
      } else {
        debounce(() => emits("click", e), 200, true);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {} : {}, {
        b: common_vendor.unref(propsDetail).prefix
      }, common_vendor.unref(propsDetail).prefix ? {
        c: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          color: props.prefixColor,
          name: common_vendor.unref(propsDetail).prefix
        })
      } : {}, {
        d: common_vendor.unref(propsDetail).prefixLabel
      }, common_vendor.unref(propsDetail).prefixLabel ? {
        e: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          color: props.prefixColor,
          label: common_vendor.unref(propsDetail).prefixLabel
        })
      } : {}, {
        f: !isAndroid.value
      }, !isAndroid.value ? common_vendor.e({
        g: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        h: _value.value,
        i: common_vendor.unref(propsDetail).focus,
        j: common_vendor.o(focus),
        k: common_vendor.o(blur),
        l: common_vendor.o(confirm),
        m: common_vendor.o(inputHandler),
        n: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        o: showPasswordText.value,
        p: common_vendor.unref(propsDetail).maxlength,
        q: common_vendor.unref(propsDetail).disabled,
        r: common_vendor.unref(propsDetail).cursorSpacing,
        s: common_vendor.unref(propsDetail).confirmType,
        t: common_vendor.unref(propsDetail).confirmHold,
        v: common_vendor.unref(propsDetail).autoBlur,
        w: common_vendor.unref(propsDetail).holdKeyboard,
        x: common_vendor.unref(propsDetail).adjustPosition,
        y: common_vendor.unref(propsDetail).readyOnly,
        z: common_vendor.unref(propsDetail).type,
        A: common_vendor.unref(propsDetail).placeholder,
        B: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          fontSize: `${common_vendor.unref(propsDetail).fontSize_px}px`,
          transition: "color 0.24s"
        }),
        C: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px;${props.placeholderStyle}`,
        D: common_vendor.unref(propsDetail).readyOnly
      } : {}, {
        E: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        F: _value.value,
        G: common_vendor.unref(propsDetail).focus,
        H: common_vendor.o(focus),
        I: common_vendor.o(blur),
        J: common_vendor.o(confirm),
        K: common_vendor.o(inputHandler),
        L: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        M: common_vendor.unref(propsDetail).maxlength,
        N: common_vendor.unref(propsDetail).disabled,
        O: common_vendor.unref(propsDetail).placeholder,
        P: common_vendor.unref(propsDetail).cursorSpacing,
        Q: common_vendor.unref(propsDetail).confirmHold,
        R: common_vendor.unref(propsDetail).autoBlur,
        S: common_vendor.unref(propsDetail).holdKeyboard,
        T: common_vendor.unref(propsDetail).cursor,
        U: common_vendor.unref(propsDetail).showConfirmBar,
        V: common_vendor.unref(propsDetail).selectionStart,
        W: common_vendor.unref(propsDetail).selectionEnd,
        X: common_vendor.unref(propsDetail).disableDefaultPadding,
        Y: common_vendor.unref(propsDetail).fixed,
        Z: common_vendor.unref(propsDetail).autoHeight,
        aa: common_vendor.unref(propsDetail).readyOnly,
        ab: common_vendor.unref(propsDetail).adjustPosition,
        ac: common_vendor.unref(propsDetail).type,
        ad: common_vendor.s(common_vendor.unref(propsDetail).autoHeight ? {} : {
          height: `${common_vendor.unref(_height)}rpx`
        }),
        ae: common_vendor.s({
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          fontSize: `${common_vendor.unref(propsDetail).fontSize_px}px`,
          transition: "color 0.24s"
        }),
        af: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px;${props.placeholderStyle}`,
        ag: common_vendor.unref(propsDetail).readyOnly
      } : {}, {
        ah: common_vendor.o(($event) => inputClick($event, "ali")),
        ai: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        aj: isAndroid.value
      }, isAndroid.value ? common_vendor.e({
        ak: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        al: common_vendor.o(($event) => emits("click", $event)),
        am: _value.value,
        an: common_vendor.unref(propsDetail).focus,
        ao: common_vendor.o(focus),
        ap: common_vendor.o(blur),
        aq: common_vendor.o(confirm),
        ar: common_vendor.o(inputHandler),
        as: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        at: showPasswordText.value,
        av: common_vendor.unref(propsDetail).disabled,
        aw: common_vendor.unref(propsDetail).cursorSpacing,
        ax: common_vendor.unref(propsDetail).confirmType,
        ay: common_vendor.unref(propsDetail).confirmHold,
        az: common_vendor.unref(propsDetail).autoBlur,
        aA: common_vendor.unref(propsDetail).holdKeyboard,
        aB: common_vendor.unref(propsDetail).adjustPosition,
        aC: common_vendor.unref(propsDetail).maxlength,
        aD: common_vendor.unref(propsDetail).type,
        aE: common_vendor.unref(propsDetail).readyOnly,
        aF: common_vendor.unref(propsDetail).placeholder,
        aG: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          fontSize: `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        aH: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px;${props.placeholderStyle}`
      } : {}, {
        aI: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        aJ: common_vendor.o(($event) => emits("click", $event)),
        aK: _value.value,
        aL: common_vendor.unref(propsDetail).focus,
        aM: common_vendor.o(focus),
        aN: common_vendor.o(blur),
        aO: common_vendor.o(confirm),
        aP: common_vendor.o(inputHandler),
        aQ: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        aR: common_vendor.unref(propsDetail).disabled,
        aS: common_vendor.unref(propsDetail).placeholder,
        aT: common_vendor.unref(propsDetail).cursorSpacing,
        aU: common_vendor.unref(propsDetail).confirmHold,
        aV: common_vendor.unref(propsDetail).autoBlur,
        aW: common_vendor.unref(propsDetail).holdKeyboard,
        aX: common_vendor.unref(propsDetail).adjustPosition,
        aY: common_vendor.unref(propsDetail).maxlength,
        aZ: common_vendor.unref(propsDetail).autoHeight,
        ba: common_vendor.unref(propsDetail).cursor,
        bb: common_vendor.unref(propsDetail).showConfirmBar,
        bc: common_vendor.unref(propsDetail).selectionStart,
        bd: common_vendor.unref(propsDetail).selectionEnd,
        be: common_vendor.unref(propsDetail).disableDefaultPadding,
        bf: common_vendor.unref(propsDetail).readyOnly,
        bg: common_vendor.unref(propsDetail).fixed,
        bh: common_vendor.unref(propsDetail).type,
        bi: common_vendor.s(common_vendor.unref(propsDetail).autoHeight ? {} : {
          height: `${common_vendor.unref(_height)}rpx`
        }),
        bj: common_vendor.s({
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          fontSize: `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        bk: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px;${props.placeholderStyle}`
      } : {}, {
        bl: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        bm: common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0
      }, common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0 ? {
        bn: common_vendor.p({
          _style: "transition:color 0.24s",
          userInteractionEnabled: false,
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: "tmicon-times-circle-fill"
        }),
        bo: common_vendor.o(clearBtn)
      } : {}, {
        bp: _requiredError.value
      }, _requiredError.value ? {
        bq: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: "tmicon-exclamation-circle"
        })
      } : {}, {
        br: common_vendor.unref(propsDetail).suffix
      }, common_vendor.unref(propsDetail).suffix ? {
        bs: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          color: props.suffixColor,
          name: common_vendor.unref(propsDetail).suffix
        })
      } : {}, {
        bt: common_vendor.unref(propsDetail).suffixLabel
      }, common_vendor.unref(propsDetail).suffixLabel ? {
        bv: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          color: props.suffixColor,
          label: common_vendor.unref(propsDetail).suffixLabel
        })
      } : {}, {
        bw: common_vendor.unref(showPasswordIcon)
      }, common_vendor.unref(showPasswordIcon) ? {
        bx: common_vendor.p({
          _style: "transition:color 0.24s",
          userInteractionEnabled: false,
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
        }),
        by: common_vendor.o(changeSeePassword)
      } : {}, {
        bz: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea" ? common_vendor.e({
        bA: common_vendor.p({
          _style: "transition:color 0.24s",
          label: common_vendor.unref(_valueLenChar)
        }),
        bB: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bC: common_vendor.p({
          _style: "transition:color 0.24s",
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}) : {}, {
        bD: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea" ? common_vendor.e({
        bE: common_vendor.p({
          _style: "transition:color 0.24s",
          label: common_vendor.unref(_valueLenChar)
        }),
        bF: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bG: common_vendor.p({
          _style: "transition:color 0.24s",
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}, {
        bH: common_vendor.n(`b-${12}`)
      }) : {}, {
        bI: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {
        bJ: common_vendor.o(searchClick),
        bK: common_vendor.p({
          width: props.searchWidth,
          followTheme: props.followTheme,
          color: props.focusColor,
          ["font-size"]: 24,
          height: common_vendor.unref(_height) - 11,
          padding: [16, 0],
          block: !props.searchWidth,
          margin: [0, 0],
          fontColor: props.searchFontColor,
          icon: common_vendor.unref(propsDetail).search,
          label: common_vendor.unref(propsDetail).searchLabel
        })
      } : {}, {
        bL: common_vendor.o(($event) => inputClick($event, "")),
        bM: common_vendor.n(common_vendor.unref(propsDetail).type == "textarea" ? common_vendor.unref(propsDetail).layoutAlign : "flex-row-center-start"),
        bN: common_vendor.s(common_vendor.unref(propsDetail).autoHeight && common_vendor.unref(propsDetail).type == "textarea" ? {} : {
          height: `${common_vendor.unref(_height)}rpx`
        }),
        bO: common_vendor.p({
          transprent: props.transprent,
          round: props.round,
          ["no-level"]: true,
          margin: [0, 0],
          padding: common_vendor.unref(_inputPadding),
          border: props.border,
          text: props.text,
          color: common_vendor.unref(_color),
          outlined: props.outlined,
          shadow: props.shadow,
          linear: props.linear,
          linearDeep: props.linearDeep,
          _style: "transition:border 0.24s"
        }),
        bP: common_vendor.p({
          eventPenetrationEnabled: true,
          transprent: true,
          margin: props.margin,
          padding: props.padding
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6448e88"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-input/tm-input.vue"]]);
wx.createComponent(Component);
