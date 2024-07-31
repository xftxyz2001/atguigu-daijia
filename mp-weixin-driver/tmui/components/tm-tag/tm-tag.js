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
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../store/index.js");
if (!Math) {
  (tmIcon + tmText + tmSheet + tmTranslate)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-tag",
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
      default: 1
    },
    margin: {
      type: Array,
      default: () => [10, 10]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    //是否开启标签可选中状态。
    checkable: {
      type: [Boolean],
      default: false
    },
    //只有当checkable为true时有效。
    checked: {
      type: [Boolean],
      default: false
    },
    //标签是否处于加载中。
    load: {
      type: [Boolean],
      default: false
    },
    //标签尺寸
    size: {
      type: String,
      default: "m"
      //xs|s|m|n|g|lg
    },
    fontSize: {
      type: [Number],
      default: 0
    },
    //是否允许关闭标签。
    closable: {
      type: [Boolean],
      default: false
    },
    //标签上显示图标。
    icon: {
      type: [String],
      default: ""
    },
    /**图标在文字的左还是右 */
    iconAlign: {
      type: String,
      default: "left"
    },
    label: {
      type: [String],
      default: ""
    },
    fontColor: {
      type: String,
      default: ""
    },
    beforeClose: {
      type: Function,
      default: null
    }
  }),
  emits: ["click", "close", "change", "update:checked"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const anitag = common_vendor.ref(null);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const show = common_vendor.ref(true);
    const _checked_ = common_vendor.ref(false);
    const _fontColor = common_vendor.computed(() => props.fontColor);
    const loading = common_vendor.computed(() => props.load);
    const checked_com = common_vendor.computed({
      get: function() {
        return _checked_.value;
      },
      set: function(val) {
        _checked_.value = val;
        emits("update:checked", _checked_.value);
      }
    });
    checked_com.value = props.checked;
    common_vendor.watch(
      () => props.checked,
      (newval) => {
        checked_com.value = newval;
        emits("change", checked_com.value);
      }
    );
    const wh = common_vendor.computed(() => {
      if (props.size == "xs") {
        return {
          px: props.padding[0] || 10,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 22
        };
      } else if (props.size == "s") {
        return {
          px: props.padding[0] || 14,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 24
        };
      } else if (props.size == "m") {
        return {
          px: props.padding[0] || 16,
          py: props.padding[1] || 8,
          fontSize: props.fontSize || 26
        };
      } else if (props.size == "n") {
        return {
          px: props.padding[0] || 18,
          py: props.padding[1] || 10,
          fontSize: props.fontSize || 28
        };
      } else if (props.size == "g") {
        return {
          px: props.padding[0] || 20,
          py: props.padding[1] || 12,
          fontSize: props.fontSize || 32
        };
      } else if (props.size == "lg") {
        return {
          px: props.padding[0] || 24,
          py: props.padding[1] || 16,
          fontSize: props.fontSize || 36
        };
      }
      return {
        px: props.padding[0],
        py: props.padding[1],
        fontSize: props.fontSize
      };
    });
    function onclick(e) {
      emits("click", e);
      if (loading.value)
        return;
      checked_com.value = !checked_com.value;
    }
    function aniEnd() {
      show.value = false;
      emits("close");
    }
    function closeTag(e) {
      return __async(this, null, function* () {
        if (loading.value)
          return;
        e.stopPropagation();
        let p = true;
        if (typeof props.beforeClose == "function") {
          p = yield props.beforeClose();
          if (typeof p == "function") {
            p = yield p();
          }
          if (!p)
            return;
        }
        if (anitag.value) {
          anitag.value.play();
        } else {
          show.value = false;
          emits("close");
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? common_vendor.e({
        b: props.icon && props.iconAlign == "left"
      }, props.icon && props.iconAlign == "left" ? {
        c: common_vendor.p({
          color: common_vendor.unref(_fontColor),
          name: props.icon,
          followDark: props.followDark,
          fontSize: common_vendor.unref(wh).fontSize,
          dark: props.dark,
          userInteractionEnabled: false
        })
      } : {}, {
        d: common_vendor.p({
          color: common_vendor.unref(_fontColor),
          fontSize: common_vendor.unref(wh).fontSize,
          followDark: props.followDark,
          userInteractionEnabled: false,
          dark: props.dark,
          label: props.label
        }),
        e: props.closable && !common_vendor.unref(loading)
      }, props.closable && !common_vendor.unref(loading) ? {
        f: common_vendor.o(closeTag),
        g: common_vendor.p({
          color: common_vendor.unref(_fontColor),
          followDark: props.followDark,
          _class: props.icon ? "pl-10" : "",
          fontSize: common_vendor.unref(wh).fontSize * 0.8,
          name: "tmicon-times",
          dark: props.dark
        })
      } : {}, {
        h: common_vendor.o(() => {
        }),
        i: props.icon && props.iconAlign == "right"
      }, props.icon && props.iconAlign == "right" ? {
        j: common_vendor.p({
          color: common_vendor.unref(_fontColor),
          name: props.icon,
          followDark: props.followDark,
          fontSize: common_vendor.unref(wh).fontSize,
          dark: props.dark,
          userInteractionEnabled: false
        })
      } : {}, {
        k: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {
        l: common_vendor.p({
          color: common_vendor.unref(_fontColor),
          followDark: props.followDark,
          fontSize: common_vendor.unref(wh).fontSize * 0.8,
          name: "tmicon-loading",
          spin: true,
          dark: _ctx.dark
        })
      } : {}, {
        m: common_vendor.o(onclick),
        n: common_vendor.p({
          transprent: props.transprent,
          color: props.color,
          _class: "flex-row flex flex-row-center-center",
          _style: common_vendor.unref(customCSSStyle),
          followTheme: props.followTheme,
          followDark: props.followDark,
          dark: props.dark,
          round: props.round,
          shadow: props.checkable && common_vendor.unref(checked_com) || !props.checkable ? props.shadow : 0,
          outlined: props.checkable && !common_vendor.unref(checked_com) ? true : props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.checkable && !common_vendor.unref(checked_com) ? true : props.text,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: props.margin,
          padding: [common_vendor.unref(wh).px, common_vendor.unref(wh).py],
          ["border-color"]: props.borderColor,
          ["linear-color"]: props.linearColor
        }),
        o: common_vendor.sr(anitag, "2d76538a-0", {
          "k": "anitag"
        }),
        p: common_vendor.o(aniEnd),
        q: common_vendor.p({
          name: "zoom",
          reverse: true,
          autoPlay: false
        }),
        r: common_vendor.n(common_vendor.unref(loading) ? "opacity-5" : "")
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-tag/tm-tag.vue"]]);
wx.createComponent(Component);
