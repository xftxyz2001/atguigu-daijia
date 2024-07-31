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
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  _easycom_tm_button2();
}
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
if (!Math) {
  _easycom_tm_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "loading-button",
  props: {
    clickFun: {
      type: Function,
      default: () => {
      }
    },
    type: {
      type: String,
      default: "primary"
    }
  },
  setup(__props) {
    const props = __props;
    const attrs = common_vendor.useAttrs();
    const loading = common_vendor.ref(false);
    const color = common_vendor.computed(() => {
      var _a;
      if (attrs.color) {
        return attrs.color;
      }
      const typeColorList = [
        {
          type: "primary",
          color: ""
        },
        {
          type: "success",
          color: "green"
        },
        {
          type: "warning",
          color: "deep-orange"
        },
        {
          type: "danger",
          color: "red"
        },
        {
          type: "info",
          color: "grey-darken-1"
        }
      ];
      return ((_a = typeColorList.find((item) => item.type === props.type)) == null ? void 0 : _a.color) || "";
    });
    function clickHandle() {
      return __async(this, null, function* () {
        try {
          loading.value = true;
          yield props.clickFun();
          setTimeout(() => {
            loading.value = false;
          }, 100);
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clickHandle),
        b: common_vendor.p(__spreadProps(__spreadValues({}, _ctx.$attrs), {
          loading: common_vendor.unref(loading),
          color: common_vendor.unref(color)
        }))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/components/loading-button/loading-button.vue"]]);
wx.createComponent(Component);
