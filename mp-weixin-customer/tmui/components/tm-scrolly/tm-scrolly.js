"use strict";
var __defProp = Object.defineProperty;
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
const common_vendor = require("../../../common/vendor.js");
const tmui_components_tmScrolly_propsdetail = require("./propsdetail.js");
if (!Math) {
  (tmIcon + tmText)();
}
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-scrolly",
  props: __spreadValues({}, tmui_components_tmScrolly_propsdetail.propsdetail),
  emits: ["bottom", "change", "refresh", "timeout", "update:modelValue", "update:bottomValue"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const startPoint = common_vendor.ref(null);
    const isPulling = common_vendor.ref(false);
    const _maxBarHeight = common_vendor.ref(props.maxBarHeight);
    const _barHeight = common_vendor.ref(0);
    let maxRefreshAnimateTimeFlag = 0;
    let closingAnimateTimeFlag = 0;
    const refreshStatus = common_vendor.ref(-1);
    const loosing = common_vendor.ref(false);
    const enableToRefresh = common_vendor.ref(true);
    const scrollTop = common_vendor.ref(0);
    const loadingTexts = common_vendor.computed(() => props.loadingTexts);
    const isBootRefresh = common_vendor.ref(props.bottomValue);
    const _class = common_vendor.computed(() => props._class);
    const _style = common_vendor.computed(() => props._style);
    common_vendor.watch(
      () => props.modelValue,
      () => {
        if (!props.modelValue) {
          if (maxRefreshAnimateTimeFlag != null) {
            clearTimeout(maxRefreshAnimateTimeFlag);
          }
          refreshStatus.value = 3;
          close();
        }
      }
    );
    common_vendor.watch(
      () => props.bottomValue,
      () => {
        isBootRefresh.value = props.bottomValue;
      }
    );
    common_vendor.onMounted(() => {
      clearTimeout(maxRefreshAnimateTimeFlag);
      clearTimeout(closingAnimateTimeFlag);
      common_vendor.nextTick$1(() => setDefault());
    });
    function setDefault() {
      if (props.defaultValue) {
        setRefreshBarHeight(props.loadBarHeight);
        refreshStatus.value = 2;
        loosing.value = true;
        isPulling.value = true;
        enableToRefresh.value = false;
        startPoint.value = null;
      }
    }
    function onScrollToBottom() {
      if (isBootRefresh.value)
        return;
      emits("update:bottomValue");
      emits("bottom");
    }
    function onScrollToTop() {
      enableToRefresh.value = true;
    }
    function onScroll(e) {
      var _a2;
      enableToRefresh.value = ((_a2 = e.detail) == null ? void 0 : _a2.scrollTop) === 0;
    }
    function onTouchStart(e) {
      if (isPulling.value || !enableToRefresh.value)
        return;
      const { touches } = e;
      if (touches.length !== 1)
        return;
      const { pageX, pageY } = touches[0];
      loosing.value = false;
      startPoint.value = {
        pageX,
        pageY
      };
      isPulling.value = true;
    }
    function onTouchMove(e) {
      if (!startPoint.value)
        return;
      const { touches } = e;
      if (touches.length !== 1)
        return;
      const { pageY } = touches[0];
      const offset = pageY - startPoint.value.pageY;
      const barsHeight = common_vendor.index.$tm.u.torpx(offset);
      if (barsHeight > 0) {
        if (barsHeight > _maxBarHeight.value) {
          setRefreshBarHeight(_maxBarHeight.value);
        } else {
          setRefreshBarHeight(barsHeight);
        }
      }
    }
    function onTouchEnd(e) {
      if (!startPoint.value)
        return;
      const { changedTouches } = e;
      if (changedTouches.length !== 1)
        return;
      const { pageY } = changedTouches[0];
      const barsHeight = common_vendor.index.$tm.u.torpx(pageY - startPoint.value.pageY);
      startPoint.value = null;
      loosing.value = true;
      isBootRefresh.value = false;
      if (barsHeight > props.loadBarHeight) {
        _barHeight.value = props.loadBarHeight;
        refreshStatus.value = 2;
        emits("change", true);
        emits("update:modelValue", true);
        emits("refresh");
        maxRefreshAnimateTimeFlag = setTimeout(() => {
          maxRefreshAnimateTimeFlag = null;
          if (refreshStatus.value === 2) {
            emits("timeout");
            close();
          }
        }, props.refreshTimeout);
      } else {
        close();
      }
    }
    function setRefreshBarHeight(barsHeight) {
      if (barsHeight >= props.loadBarHeight) {
        refreshStatus.value = 1;
      } else {
        refreshStatus.value = 0;
      }
      return new Promise((resolve) => {
        _barHeight.value = barsHeight;
        common_vendor.nextTick$1(() => {
          resolve(barsHeight);
        });
      });
    }
    function close() {
      const animationDuration = 350;
      _barHeight.value = 0;
      emits("change", false);
      emits("update:modelValue", false);
      closingAnimateTimeFlag = setTimeout(() => {
        closingAnimateTimeFlag = null;
        refreshStatus.value = -1;
        isPulling.value = false;
        loosing.value = false;
        enableToRefresh.value = true;
      }, animationDuration);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: refreshStatus.value === 2
      }, refreshStatus.value === 2 ? {
        b: common_vendor.p({
          ["font-size"]: 24,
          color: "primary",
          name: "tmicon-shuaxin",
          spin: true
        }),
        c: common_vendor.p({
          color: "grey",
          _class: "pl-16",
          label: common_vendor.unref(loadingTexts)[refreshStatus.value]
        })
      } : {}, {
        d: refreshStatus.value != -1 && refreshStatus.value != 2
      }, refreshStatus.value != -1 && refreshStatus.value != 2 ? {
        e: common_vendor.p({
          ["font-size"]: 24,
          color: "primary",
          name: "tmicon-long-arrow-down"
        }),
        f: common_vendor.n(refreshStatus.value == 0 ? "srrryration srrryrationOn" : "srrryration srrryrationOf"),
        g: common_vendor.p({
          color: "grey",
          _class: "pl-16",
          label: common_vendor.unref(loadingTexts)[refreshStatus.value]
        }),
        h: `${refreshStatus.value == 0 ? _barHeight.value / props.loadBarHeight : 1}`
      } : {}, {
        i: common_vendor.r("pull", {
          status: {
            refreshStatus: refreshStatus.value
          }
        }),
        j: common_vendor.n("scroyy__track--" + (loosing.value ? "loosing" : "")),
        k: _barHeight.value + "rpx",
        l: isBootRefresh.value
      }, isBootRefresh.value ? {
        m: common_vendor.p({
          ["font-size"]: 24,
          color: "primary",
          name: "tmicon-shuaxin",
          spin: true
        }),
        n: common_vendor.p({
          color: "grey",
          _class: "pl-16",
          label: "数据加载中"
        }),
        o: (isBootRefresh.value ? props.loadBarHeight : 0) + "rpx"
      } : {}, {
        p: common_vendor.r("bottom", {
          status: {
            isBootRefresh: isBootRefresh.value
          }
        }),
        q: (isBootRefresh.value ? props.loadBarHeight : 0) + "rpx",
        r: common_vendor.n("scroyy__track--" + (loosing.value ? "loosing" : "")),
        s: `translate3d(0, ${_barHeight.value}rpx, 0)`,
        t: scrollTop.value,
        v: common_vendor.o(onTouchStart),
        w: common_vendor.o(onTouchMove),
        x: common_vendor.o(onTouchEnd),
        y: common_vendor.o(onScroll),
        z: common_vendor.o(onScrollToTop),
        A: common_vendor.o(onScrollToBottom),
        B: common_vendor.s(props.height ? {
          height: props.height + "rpx"
        } : ""),
        C: common_vendor.s(common_vendor.unref(_style)),
        D: common_vendor.n(common_vendor.unref(_class))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a5038a4a"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/tmui/components/tm-scrolly/tm-scrolly.vue"]]);
wx.createComponent(Component);
