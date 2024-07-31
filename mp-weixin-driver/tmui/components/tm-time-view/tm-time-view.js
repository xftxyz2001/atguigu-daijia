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
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_components_tmTimeView_props = require("./props.js");
const tmui_components_tmTimeView_time = require("./time.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
require("../../tool/dayjs/esm/constant.js");
require("../../tool/dayjs/esm/locale/en.js");
require("../../tool/dayjs/esm/utils.js");
require("./interface.js");
require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
require("../../tool/dayjs/esm/plugin/isSameOrAfter/index.js");
require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-time-view",
  props: __spreadValues({}, tmui_components_tmTimeView_props.propsOpts),
  emits: ["update:modelValue", "update:modelStr", "change"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const DayJs = tmui_tool_dayjs_esm_index.dayjs;
    const _nowtime = common_vendor.ref(
      DayJs(tmui_components_tmTimeView_time.checkNowDateisBetween(props.defaultValue, props.start, props.end))
    );
    const _nowtimeValue = common_vendor.computed(() => _nowtime.value.format());
    const show = common_vendor.ref(true);
    const _startTime = common_vendor.computed(() => {
      return DayJs(props.start).isValid() ? DayJs(props.start).format() : DayJs().subtract(3, "year").format();
    });
    const _endTime = common_vendor.computed(() => {
      return DayJs(props.end).isValid() ? DayJs(props.end).format() : DayJs().add(1, "year").format();
    });
    const showCol = common_vendor.computed(() => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return {
        year: (_b2 = (_a2 = props.showDetail) == null ? void 0 : _a2.year) != null ? _b2 : true,
        month: (_d = (_c = props.showDetail) == null ? void 0 : _c.month) != null ? _d : true,
        day: (_f = (_e = props.showDetail) == null ? void 0 : _e.day) != null ? _f : true,
        hour: (_h = (_g = props.showDetail) == null ? void 0 : _g.hour) != null ? _h : false,
        minute: (_j = (_i = props.showDetail) == null ? void 0 : _i.minute) != null ? _j : false,
        second: (_l = (_k = props.showDetail) == null ? void 0 : _k.second) != null ? _l : false
      };
    });
    const showSuffix = common_vendor.computed(() => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return {
        year: (_b2 = (_a2 = props.showSuffix) == null ? void 0 : _a2.year) != null ? _b2 : "年",
        month: (_d = (_c = props.showSuffix) == null ? void 0 : _c.month) != null ? _d : "月",
        hour: (_f = (_e = props.showSuffix) == null ? void 0 : _e.hour) != null ? _f : "时",
        minute: (_h = (_g = props.showSuffix) == null ? void 0 : _g.minute) != null ? _h : "分",
        second: (_j = (_i = props.showSuffix) == null ? void 0 : _i.second) != null ? _j : "秒",
        date: (_l = (_k = props.showSuffix) == null ? void 0 : _k.day) != null ? _l : "日"
      };
    });
    const isDark = common_vendor.computed(() => store.tmStore.dark);
    let colIndex = common_vendor.ref([0, 0, 0, 0, 0, 0]);
    const _col = common_vendor.ref({
      year: [],
      month: [],
      date: [],
      hour: [],
      minute: [],
      second: []
    });
    common_vendor.ref(0);
    common_vendor.computed(() => {
      return (common_vendor.index.upx2px(props.height) - 50) / 2;
    });
    const maskStyle = common_vendor.computed(() => {
      let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
      let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
      if (!isDark.value) {
        return str_white;
      }
      return str_black;
    });
    _col.value = tmui_components_tmTimeView_time.rangeTimeArray(
      _nowtimeValue.value,
      _startTime.value,
      _endTime.value,
      showCol.value
    );
    function colchange(e) {
      let changedate = tmui_components_tmTimeView_time.getNowbyIndex(_col.value, e.detail.value, showCol.value);
      _col.value = tmui_components_tmTimeView_time.rangeTimeArray(
        changedate,
        _startTime.value,
        _endTime.value,
        showCol.value
      );
      _nowtime.value = DayJs(changedate);
      common_vendor.nextTick$1(() => {
        colIndex.value = e.detail.value;
        changedate = tmui_components_tmTimeView_time.getNowbyIndex(_col.value, e.detail.value, showCol.value);
        _nowtime.value = DayJs(changedate);
        emits("update:modelValue", _nowtime.value.format("YYYY/MM/DD HH:mm:ss"));
        emits("update:modelStr", _nowtime.value.format(props.format));
        emits("change", _nowtime.value.format(props.format));
      });
    }
    common_vendor.watch(
      () => props.modelValue,
      () => {
        if (!DayJs(props.modelValue).isValid())
          return;
        let deattime = DayJs(tmui_components_tmTimeView_time.checkNowDateisBetween(props.modelValue, props.start, props.end));
        if (DayJs(deattime).isSame(_nowtime.value))
          return;
        _nowtime.value = deattime;
        emits("update:modelStr", _nowtime.value.format(props.format));
        _col.value = tmui_components_tmTimeView_time.rangeTimeArray(
          deattime,
          _startTime.value,
          _endTime.value,
          showCol.value
        );
        colIndex.value = tmui_components_tmTimeView_time.getIndexNowbydate(_col.value, _nowtime.value, showCol.value);
      }
    );
    function nvuegetClientRect() {
      common_vendor.nextTick$1(function() {
      });
    }
    common_vendor.onMounted(() => {
      nvuegetClientRect();
      common_vendor.nextTick$1(() => {
        emits("update:modelValue", _nowtime.value.format("YYYY/MM/DD HH:mm:ss"));
        emits("update:modelStr", _nowtime.value.format(props.format));
        colIndex.value = tmui_components_tmTimeView_time.getIndexNowbydate(_col.value, _nowtime.value, showCol.value);
      });
    });
    common_vendor.onUpdated(() => nvuegetClientRect());
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? common_vendor.e({
        b: common_vendor.unref(showCol).year
      }, common_vendor.unref(showCol).year ? {
        c: common_vendor.f(_col.value.year, (item, index, i0) => {
          return {
            a: common_vendor.t(item + common_vendor.unref(showSuffix)["year"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[0] == index ? "" : "UnitemSelected")
          };
        }),
        d: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        e: common_vendor.unref(showCol).month
      }, common_vendor.unref(showCol).month ? {
        f: common_vendor.f(_col.value.month, (item, index, i0) => {
          return {
            a: common_vendor.t(item + 1 + common_vendor.unref(showSuffix)["month"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[1] == index ? "" : "UnitemSelected")
          };
        }),
        g: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        h: common_vendor.unref(showCol).day
      }, common_vendor.unref(showCol).day ? {
        i: common_vendor.f(_col.value.date, (item, index, i0) => {
          return {
            a: common_vendor.t(item + common_vendor.unref(showSuffix)["date"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[2] == index ? "" : "UnitemSelected")
          };
        }),
        j: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        k: common_vendor.unref(showCol).hour
      }, common_vendor.unref(showCol).hour ? {
        l: common_vendor.f(_col.value.hour, (item, index, i0) => {
          return {
            a: common_vendor.t(item + common_vendor.unref(showSuffix)["hour"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[3] == index ? "" : "UnitemSelected")
          };
        }),
        m: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        n: common_vendor.unref(showCol).minute
      }, common_vendor.unref(showCol).minute ? {
        o: common_vendor.f(_col.value.minute, (item, index, i0) => {
          return {
            a: common_vendor.t(item + common_vendor.unref(showSuffix)["minute"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[4] == index ? "" : "UnitemSelected")
          };
        }),
        p: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        q: common_vendor.unref(showCol).second
      }, common_vendor.unref(showCol).second ? {
        r: common_vendor.f(_col.value.second, (item, index, i0) => {
          return {
            a: common_vendor.t(item + common_vendor.unref(showSuffix)["second"]),
            b: index,
            c: common_vendor.n(common_vendor.unref(colIndex)[5] == index ? "" : "UnitemSelected")
          };
        }),
        s: common_vendor.unref(store).tmStore.dark ? "white" : "black"
      } : {}, {
        t: common_vendor.unref(colIndex),
        v: common_vendor.o(colchange),
        w: props.height + "rpx",
        x: common_vendor.unref(maskStyle),
        y: props.immediateChange
      }) : {}, {
        z: props.height + "rpx"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dcacb728"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-time-view/tm-time-view.vue"]]);
wx.createComponent(Component);
