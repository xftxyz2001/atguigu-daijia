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
  (tmSheet + tmText)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-segtab",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 64
    },
    gutter: {
      type: Number,
      default: 4
    },
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    //v-model可以是index索引也可是对象id
    modelValue: {
      type: [Number, String],
      default: 0
    },
    //如果想以字段id来达到index选中效果。需要list为对象，并且提供唯一标识id字段。
    defaultValue: {
      type: [Number, String],
      default: 0
    },
    //在点击切换之前执行，返回false阻止切换，可以是Promise
    beforeChange: {
      type: [Function, Boolean],
      default: () => false
    },
    color: {
      type: String,
      default: "white"
    },
    bgColor: {
      type: String,
      default: "grey-3"
    },
    fontSize: {
      type: Number,
      default: 24
    },
    //被选中后的文字色
    activeColor: {
      type: String,
      default: "primary"
    }
  }),
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const leftPos = common_vendor.ref(-100);
    const leftWidth = common_vendor.ref(0);
    let timid = common_vendor.index.$tm.u.getUid();
    const _list = common_vendor.computed(() => {
      var _a2;
      let templist = [];
      for (let i = 0, len = props.list.length; i < len; i++) {
        let al = { text: "", id: i };
        let el = props.list[i];
        if (typeof el == "string" || typeof el == "number") {
          al.text = el;
        } else if (typeof el == "object") {
          al.text = (_a2 = el == null ? void 0 : el.text) != null ? _a2 : "";
          if (typeof (el == null ? void 0 : el.id) != "undefined") {
            al.id = el["id"];
          }
        }
        templist.push(al);
      }
      return templist;
    });
    common_vendor.ref(true);
    const _cId = common_vendor.ref((_c = props.defaultValue) != null ? _c : 0);
    _cId.value;
    const wh = common_vendor.computed(() => {
      let iw = props.width - props.gutter;
      let inheight = "";
      inheight = `calc(100% - ${props.gutter * 2}rpx)`;
      return {
        outerWidth: props.width,
        outerHeight: props.height,
        innerWidth: iw,
        innerHeight: props.height - props.gutter * 2,
        innerHieghtWeb: inheight,
        gutterpx: (common_vendor.index.upx2px(props.height) - common_vendor.index.upx2px(props.height - props.gutter * 2)) / 2
      };
    });
    function itemClick(index, id) {
      return __async(this, null, function* () {
        emits("click", index);
        if (typeof props.beforeChange === "function") {
          common_vendor.index.showLoading({ title: "...", mask: true });
          let p = yield props.beforeChange(index);
          if (typeof p === "function") {
            p = yield p(index);
          }
          common_vendor.index.hideLoading();
          if (!p)
            return;
        }
        if (_cId.value === id)
          return;
        _cId.value = id;
        getDomRectBound(index);
        emits("change", _cId.value, common_vendor.toRaw(_list.value[index]));
        emits("update:modelValue", _cId.value);
      });
    }
    common_vendor.watch(
      [_cId, () => props.modelValue, () => props.list],
      () => {
        initPos();
      },
      { deep: true }
    );
    common_vendor.onMounted(() => {
      initPos();
    });
    function initPos() {
      let indexel = _list.value.findIndex((el) => el.id === _cId.value);
      clearTimeout(timid);
      let timerdur = 150;
      timerdur = 50;
      timid = setTimeout(() => {
        common_vendor.nextTick$1(() => getDomRectBound(indexel));
      }, timerdur);
    }
    function getDomRectBound(idx) {
      common_vendor.index.createSelectorQuery().in(proxy).select(".tm-segtab").boundingClientRect((nodeParent) => {
        var _a2;
        let parentleft = (_a2 = nodeParent == null ? void 0 : nodeParent.left) != null ? _a2 : 0;
        common_vendor.index.createSelectorQuery().in(proxy).select(".tab" + idx).boundingClientRect((node) => {
          var _a3, _b2;
          if (!node)
            return;
          leftPos.value = ((_a3 = node == null ? void 0 : node.left) != null ? _a3 : 0) - common_vendor.index.upx2px(props.gutter) - parentleft;
          leftWidth.value = ((_b2 = node == null ? void 0 : node.width) != null ? _b2 : 0) + +common_vendor.index.upx2px(props.gutter);
        }).exec();
      }).exec();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _cId.value !== ""
      }, _cId.value !== "" ? {
        b: common_vendor.p({
          ["follow-dark"]: props.followDark,
          round: props.round,
          parenClass: "flex-1",
          _class: "flex-1 flex flex-row",
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          border: 0
        }),
        c: common_vendor.s({
          transform: "translateX(" + (leftPos.value + common_vendor.unref(wh).gutterpx) + "px)",
          width: leftWidth.value + "px",
          height: common_vendor.unref(wh).innerHieghtWeb,
          top: `${props.gutter}rpx`,
          left: "0px"
        })
      } : {}, {
        d: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return {
            a: "4cd9ae76-2-" + i0 + ",4cd9ae76-0",
            b: common_vendor.p({
              _style: "transition: color 0.3s;",
              color: item.id === _cId.value ? props.activeColor : "",
              lineHeight: 0,
              ["font-size"]: props.fontSize,
              userInteractionEnabled: false,
              label: item.text
            }),
            c: common_vendor.o(($event) => itemClick(index, item.id), index),
            d: common_vendor.n("tab" + index),
            e: index
          };
        }),
        e: `${props.gutter}rpx 0`,
        f: `${common_vendor.unref(wh).innerWidth}rpx`,
        g: common_vendor.unref(wh).innerHeight + "rpx",
        h: `${props.gutter}rpx`,
        i: props.gutter + "rpx",
        j: common_vendor.p({
          round: props.round,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          ["no-level"]: true,
          color: props.bgColor,
          darkBgColor: "rgba(255,255,255,0.06)",
          height: common_vendor.unref(wh).outerHeight,
          _class: "flex-row relative overflow flex-1",
          padding: [0],
          margin: [0],
          border: 0
        }),
        k: common_vendor.n(`round-${props.round}`),
        l: common_vendor.unref(wh).outerWidth + "rpx",
        m: common_vendor.unref(wh).outerHeight + "rpx"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4cd9ae76"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-segtab/tm-segtab.vue"]]);
wx.createComponent(Component);
