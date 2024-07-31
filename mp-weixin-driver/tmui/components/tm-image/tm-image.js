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
  __name: "tm-image",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //外部间隙
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    //内部间隙
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    border: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number],
      default: 200,
      required: true
    },
    height: {
      type: [Number],
      default: 200,
      required: true
    },
    src: {
      type: String,
      default: "",
      required: true
    },
    errorIcon: {
      type: String,
      default: ""
    },
    errorLabel: {
      type: String,
      default: "重新加载"
    },
    loadIcon: {
      type: String,
      default: ""
    },
    //是否显示加载动画。
    showLoad: {
      type: Boolean,
      default: true
    },
    //是否开启预览。
    preview: {
      type: [Boolean],
      default: false
    },
    //是否开启图片额外插槽显示内容。
    extra: {
      type: [Boolean],
      default: false
    },
    extraPosition: {
      type: String,
      default: "in"
      //in:叠加图片上显示,out：图片下方显示,
    },
    //展示关闭删除按钮。
    delete: {
      type: [Boolean],
      default: false
    },
    //是否允许点击delete图标关闭自己，如果为false,将仅触发delete事件，本身图片不会被关闭。
    allowDelete: {
      type: [Boolean],
      default: true
    },
    //图片绽放模式。
    //同官方阅读：https://uniapp.dcloud.io/component/image.html
    model: {
      type: String,
      default: "scaleToFill"
    },
    unit: {
      type: String,
      default: "rpx"
    },
    //开启长按图片显示识别小程序码菜单,与preview不冲突,可点击预览也可长按,默认不开启
    showMenuByLongPress: {
      type: [Boolean],
      default: false
    }
  }),
  emits: ["load", "error", "click", "delete", "close"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const aniplay = common_vendor.ref(null);
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    if (!props.height && !props.width) {
      console.error("错误：图片宽度和高度必须设置一个");
    }
    const img_width = common_vendor.computed(() => {
      return props.width;
    });
    const img_height = common_vendor.computed(() => {
      return props.height - props.padding[1];
    });
    const img_src = common_vendor.computed(() => props.src);
    const loading = common_vendor.ref(true);
    const error = common_vendor.ref(false);
    const isRmove = common_vendor.ref(false);
    const _loadIcon = common_vendor.ref(props.loadIcon || "tmicon-shuaxin");
    const _errorIcon = common_vendor.ref(props.errorIcon || "tmicon-exclamation-circle");
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    const ImagGrupList = common_vendor.inject(
      "ImagGrupList",
      common_vendor.computed(() => [])
    );
    if (parent == null ? void 0 : parent.pushKey) {
      parent.pushKey({
        width: img_width.value,
        height: img_width.value,
        src: props.src
      });
    }
    common_vendor.watch(img_src, () => {
      loading.value = true;
      error.value = false;
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
    });
    function imageLoad(event) {
      loading.value = false;
      emits("load", event);
    }
    function imageError(event) {
      console.error("图片加载错:" + props.src, event);
      error.value = true;
      loading.value = false;
      emits("error", event);
    }
    function imageClick(event) {
      emits("click", event);
      if (props.preview) {
        let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
        common_vendor.index.previewImage({
          urls: list,
          current: props.src
        });
      }
    }
    function del() {
      return __async(this, null, function* () {
        var _a2, _b2;
        isRmove.value = false;
        if (!props.allowDelete) {
          emits("delete", props.src);
          return;
        }
        if ((_a2 = aniplay.value) == null ? void 0 : _a2.play) {
          (_b2 = aniplay.value) == null ? void 0 : _b2.play();
        } else {
          isRmove.value = true;
          emits("close", props.src);
        }
      });
    }
    function aniEnd() {
      isRmove.value = true;
      emits("close", props.src);
    }
    function reloadImg() {
      loading.value = true;
      error.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isRmove.value
      }, !isRmove.value ? common_vendor.e({
        b: !error.value
      }, !error.value ? {
        c: common_vendor.o(imageLoad),
        d: common_vendor.o(imageError),
        e: props.showMenuByLongPress,
        f: common_vendor.o(imageClick),
        g: common_vendor.n("round-" + props.round),
        h: common_vendor.n(loading.value ? "opacity-0" : ""),
        i: common_vendor.unref(img_src),
        j: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        }),
        k: props.model
      } : {}, {
        l: loading.value && !error.value
      }, loading.value && !error.value ? common_vendor.e({
        m: props.showLoad
      }, props.showLoad ? {
        n: common_vendor.p({
          ["font-size"]: 26,
          spin: true,
          name: _loadIcon.value
        })
      } : {}, {
        o: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + 10 + props.unit
        })
      }) : {}, {
        p: !loading.value && error.value
      }, !loading.value && error.value ? {
        q: common_vendor.p({
          userInteractionEnabled: false,
          name: _errorIcon.value
        }),
        r: common_vendor.p({
          userInteractionEnabled: false,
          _class: "pt-10",
          ["font-size"]: 26,
          label: props.errorLabel
        }),
        s: common_vendor.o(reloadImg),
        t: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        })
      } : {}, {
        v: props.extra
      }, props.extra ? {
        w: common_vendor.o(imageClick),
        x: common_vendor.s(props.extra && props.extraPosition == "in" ? {
          height: common_vendor.unref(img_height) + props.unit,
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        y: common_vendor.s(props.extra && props.extraPosition == "out" ? {
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        z: common_vendor.n(props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5 " : ""),
        A: common_vendor.s(props.extra && props.extraPosition == "in" ? {
          height: common_vendor.unref(img_height) + props.unit,
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        B: common_vendor.s(props.extra && props.extraPosition == "out" ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        C: props.delete
      }, props.delete ? {
        D: common_vendor.o(del),
        E: common_vendor.p({
          color: "red",
          name: "tmicon-times-circle-fill"
        }),
        F: common_vendor.s(props.delete ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        G: common_vendor.n(`pb-${props.padding[1]}`),
        H: common_vendor.n("round-" + props.round),
        I: common_vendor.p({
          margin: [0],
          color: props.color,
          transprent: props.transprent,
          round: props.round,
          border: props.border,
          padding: [props.padding[0], 0],
          width: common_vendor.unref(img_width) - props.padding[0] * 2,
          unit: props.unit,
          height: common_vendor.unref(img_height) - props.padding[0] * 2
        }),
        J: common_vendor.sr(aniplay, "e8d6862c-0", {
          "k": "aniplay"
        }),
        K: common_vendor.o(aniEnd),
        L: common_vendor.p({
          width: common_vendor.unref(img_width) + props.padding[0] * 2 + props.unit,
          autoPlay: false,
          name: "zoom",
          reverse: true
        }),
        M: common_vendor.s({
          margin: props.margin[0] + props.unit + " " + (props.margin[1] || props.margin[0]) + props.unit
        })
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-image/tm-image.vue"]]);
wx.createComponent(Component);
