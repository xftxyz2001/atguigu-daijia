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
  (tmIcon + tmTranslate + tmSheet + tmText)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-checkbox",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    /**
     * 是否跟随全局主题的变换而变换
     */
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 42
    },
    //为false时将隐藏所有内容，只显示插槽内容，但点击插槽还是会触发选选择状态。
    custom: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 2
    },
    border: {
      type: Number,
      default: 2
    },
    //选项值，选中后返回的值。
    value: {
      type: [String, Number, Boolean],
      default: true
    },
    /**
     * v-model双向绑定，如果选中后以数组形式给出value值。
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number],
      default: ""
    },
    //默认是否选中状态。不受上方的modelValue控制，直接选中。
    defaultChecked: {
      type: [Boolean],
      default: false
    },
    //选中前的勾子。返回false将阻止选中。也可以返回 Promise异步
    beforeChecked: {
      type: [Function, String, Boolean],
      default: () => {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 28
    },
    //半选中状态。
    indeterminate: {
      type: [Boolean, String],
      default: false
    },
    //是否关闭动画 ，对于大批量的数据时，建议关闭动画。
    closeAni: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 自定义选中的图标名称
     */
    icon: {
      type: String,
      default: "tmicon-check"
    },
    disabledClass: {
      type: String,
      default: "opacity-5"
    },
    margin: {
      type: Array,
      default: () => [16, 8]
    }
  }),
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    common_vendor.ref(null);
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _checked = common_vendor.ref((_c = props.defaultChecked) != null ? _c : false);
    const _groupCheckedVal = common_vendor.inject(
      "tmCheckedBoxVal",
      common_vendor.computed(() => [])
    );
    const tmCheckedBoxDisabled = common_vendor.inject(
      "tmCheckedBoxDisabled",
      common_vendor.computed(() => false)
    );
    const tmCheckedBoxMax = common_vendor.inject(
      "tmCheckedBoxMax",
      common_vendor.computed(() => false)
    );
    const tmCheckedBoxDir = common_vendor.inject(
      "tmCheckedBoxDir",
      common_vendor.computed(() => "row")
    );
    const _disabled = common_vendor.computed(() => props.disabled || tmCheckedBoxDisabled.value);
    function vailChecked(val) {
      let checked_val = false;
      let val_self = typeof val === "undefined" ? _groupCheckedVal.value : val;
      if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
        checked_val = true;
      }
      if (val_self.includes(props.value)) {
        checked_val = true;
      }
      return checked_val;
    }
    if (vailChecked()) {
      _checked.value = true;
      emits("update:modelValue", props.value);
    }
    function hanlerClick() {
      return __async(this, null, function* () {
        emits("click");
        if (_disabled.value) {
          return;
        }
        if (tmCheckedBoxMax.value && !_checked.value) {
          common_vendor.index.showToast({ title: "超最大选择", icon: "error" });
          return;
        }
        if (typeof props.beforeChecked === "function") {
          common_vendor.index.showLoading({ title: "...", mask: true });
          let p = yield props.beforeChecked(props.modelValue, props.value);
          if (typeof p === "function") {
            p = yield p(props.modelValue, props.value);
          }
          common_vendor.index.hideLoading();
          if (!p)
            return;
        }
        _checked.value = !_checked.value;
        if (_checked.value) {
          emits("update:modelValue", props.value);
          if (parent) {
            parent.addKey(props.value);
          }
        } else {
          emits("update:modelValue", false);
          if (parent) {
            parent.delKey(props.value);
          }
        }
        emits("change", _checked.value);
      });
    }
    common_vendor.watch(
      [() => props.modelValue, () => props.value, () => _groupCheckedVal.value],
      () => {
        _checked.value = vailChecked();
      },
      { deep: true }
    );
    _groupCheckedVal.value;
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmCheckBoxGroup" || !parent) {
        break;
      } else {
        parent = (_d = parent == null ? void 0 : parent.$parent) != null ? _d : void 0;
      }
    }
    if (parent) {
      parent.pushKey(props.value);
    }
    expose({ hanlerClick });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.custom
      }, props.custom ? common_vendor.e({
        b: !props.closeAni
      }, !props.closeAni ? common_vendor.e({
        c: _checked.value && !props.indeterminate
      }, _checked.value && !props.indeterminate ? {
        d: common_vendor.p({
          ["font-size"]: props.size * 0.6,
          name: props.icon
        }),
        e: common_vendor.p({
          duration: 100,
          name: "zoom"
        })
      } : {}, {
        f: props.indeterminate
      }, props.indeterminate ? {
        g: common_vendor.p({
          ["font-size"]: props.size * 0.6,
          name: "tmicon-minus"
        }),
        h: common_vendor.p({
          duration: 100,
          name: "zoom"
        })
      } : {}) : {}, {
        i: props.closeAni
      }, props.closeAni ? common_vendor.e({
        j: _checked.value && !props.indeterminate
      }, _checked.value && !props.indeterminate ? {
        k: common_vendor.p({
          ["font-size"]: props.size * 0.6,
          name: props.icon
        })
      } : {}, {
        l: props.indeterminate
      }, props.indeterminate ? {
        m: common_vendor.p({
          ["font-size"]: props.size * 0.6,
          name: "tmicon-minus"
        })
      } : {}) : {}, {
        n: common_vendor.p({
          parenClass: "flex-shrink",
          eventPenetrationEnabled: true,
          userInteractionEnabled: false,
          linear: props.linear,
          linearDeep: props.linearDeep,
          followTheme: props.followTheme,
          followDark: props.followDark,
          dark: props.dark,
          shadow: props.shadow,
          width: props.size,
          height: props.size,
          text: (!props.indeterminate && !_checked.value || common_vendor.unref(_disabled)) && !props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          transprent: props.transprent,
          padding: [0, 0],
          margin: props.margin,
          color: common_vendor.unref(_disabled) ? "white" : props.color,
          round: props.round,
          _class: "flex-row flex-row-center-center",
          outlined: props.outlined,
          _style: "transition:background-color 0.24s"
        })
      }) : {}, {
        o: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: props.fontSize,
          label: props.label
        }),
        p: common_vendor.r("d", {
          checked: {
            checked: _checked.value
          }
        }),
        q: common_vendor.o(hanlerClick),
        r: common_vendor.n(common_vendor.unref(_disabled) ? props.disabledClass : ""),
        s: common_vendor.n(common_vendor.unref(tmCheckedBoxDir) == "row" ? "flex-row" : ""),
        t: common_vendor.n(common_vendor.unref(tmCheckedBoxDir) == "customCol" ? "flex-1" : "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-checkbox/tm-checkbox.vue"]]);
wx.createComponent(Component);
