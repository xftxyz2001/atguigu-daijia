"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
require("../../tool/dayjs/esm/constant.js");
require("../../tool/dayjs/esm/locale/en.js");
require("../../tool/dayjs/esm/utils.js");
if (!Math) {
  (tmText + tmTag + tmIcon + tmSheet + tmTimeView + tmButton)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmTag = () => "../tm-tag/tm-tag.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmButton = () => "../tm-button/tm-button.js";
const tmTimeView = () => "../tm-time-view/tm-time-view.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-time-between",
  props: {
    color: {
      type: String,
      default: "primary"
    },
    //需要展现的时间格式类型
    showDetail: {
      type: Object,
      default: () => {
        return {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        };
      }
    },
    //展示格式。最终影响到modelStr输出格式的内容。
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    immediateChange: {
      type: Boolean,
      default: false
    },
    quickBtn: {
      type: Array,
      default: () => {
        return [
          {
            label: "本日",
            fun: null,
            color: "primary",
            type: "br"
          },
          {
            label: "本周",
            fun: null,
            color: "primary",
            type: "bz"
          },
          {
            label: "本月",
            fun: null,
            color: "primary",
            type: "by"
          },
          {
            label: "近三月",
            fun: null,
            color: "primary",
            type: "jsy"
          },
          {
            label: "本年",
            fun: null,
            color: "primary",
            type: "bn"
          },
          {
            label: "近7天",
            fun: null,
            color: "primary",
            type: "d7"
          },
          {
            label: "近30天",
            fun: null,
            color: "primary",
            type: "d30"
          }
        ];
      }
    },
    start: {
      type: [String, Number, Date],
      default: (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() - 1)
    },
    end: {
      type: [String, Number, Date],
      default: (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() + 1)
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    /**
     * 不受formart控制，始终完整显示，必须规范
     * */
    modelValue: {
      type: Array,
      default: () => []
    },
    /**
     * 只对外显示输出formart的格式字符串，可能不规范
     * */
    modelStr: {
      type: Array,
      default: () => []
    },
    /** 当改变日期时，是否需要同步到vmodel变量中，立即执行双向同步，如果为false日期的改变不会同步到vmodel中
     * 然后需要你自行调用refs.getNowDate()来获取或者触发同步数据
     * 这里设置的意义是：当你需要同步日期数据，由用户设置时，如果你设置了一个确认按钮来同步用户设置的日期，那么这里可以设置为fase，
     * 然后你自行添加 一个确认按钮来触发refs.getNowDate()来同步数据，以执行用户的确认时间，否则不会同步。
     */
    asyncModel: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change", "update:modelValue", "update:modelStr", "confirm", "clear"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const DayJs = tmui_tool_dayjs_esm_index.dayjs;
    const valuedate_start = common_vendor.ref("");
    const valuedate_end = common_vendor.ref("");
    const focusIndex = common_vendor.ref(-1);
    const picker_focus_date = common_vendor.ref("");
    const picker_focus_date_str = common_vendor.ref("");
    const defaultFormat = "YYYY/MM/DD HH:mm:ss";
    let tid = NaN;
    const starTtime = common_vendor.computed(() => DayJs(props.start).format(defaultFormat));
    const endTtime = common_vendor.computed(() => DayJs(props.end).format(defaultFormat));
    common_vendor.watch(
      () => props.modelValue,
      () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          setDate(props.modelValue);
        }, 100);
      },
      { deep: true, immediate: true }
    );
    const valuedate_start_str = common_vendor.computed(() => {
      if (!valuedate_start.value)
        return "";
      return DayJs(valuedate_start.value).format(props.format);
    });
    const valuedate_end_str = common_vendor.computed(() => {
      if (!valuedate_end.value)
        return "";
      return DayJs(valuedate_end.value).format(props.format);
    });
    function changeFocus(index) {
      focusIndex.value = index;
      let vstd = valuedate_start.value;
      let vsed = valuedate_end.value;
      if (index == 0 && !valuedate_start.value) {
        vstd = DayJs(valuedate_end.value).isValid() ? valuedate_end.value : DayJs().format(defaultFormat);
      }
      if (index == 1 && !valuedate_end.value) {
        vsed = DayJs(valuedate_start.value).isValid() ? valuedate_start.value : DayJs().format(defaultFormat);
      }
      setDate([vstd, vsed]);
    }
    function timeChange(evt) {
      if (focusIndex.value == -1)
        focusIndex.value = 0;
      if (focusIndex.value == 0) {
        valuedate_start.value = picker_focus_date.value;
      } else if (focusIndex.value == 1) {
        valuedate_end.value = picker_focus_date.value;
      }
      common_vendor.nextTick$1(() => {
        updateTime();
      });
    }
    function updateTime() {
      checkTimeVaild();
      if (props.asyncModel) {
        emits("update:modelValue", [valuedate_start.value, valuedate_end.value]);
        emits("update:modelStr", [DayJs(valuedate_start.value).format(props.format), DayJs(valuedate_end.value).format(props.format)]);
      }
      common_vendor.nextTick$1(() => {
        emits("change", [valuedate_start.value, valuedate_end.value]);
      });
    }
    function checkTimeVaild() {
      if (valuedate_end.value.length == 0 || valuedate_start.value.length == 0)
        return;
      if (focusIndex.value == 0) {
        if (DayJs(valuedate_start.value).isAfter(valuedate_end.value, "second")) {
          valuedate_end.value = valuedate_start.value;
        }
      }
      if (focusIndex.value == 1) {
        if (DayJs(valuedate_end.value).isBefore(valuedate_start.value, "second")) {
          valuedate_start.value = valuedate_end.value;
        }
      }
    }
    function quickChangeClick(item) {
      var _a;
      let dstr = [];
      let typesar = ["br", "bz", "by", "jsy", "bn", "d7", "d30"];
      if (typeof (item == null ? void 0 : item.type) === "string" && typesar.includes(item == null ? void 0 : item.type)) {
        let str = (_a = item == null ? void 0 : item.type) != null ? _a : "";
        if (str == "br") {
          dstr = [DayJs().format(), DayJs().format()];
        } else if (str == "bz") {
          let dt = DayJs();
          dstr = [dt.startOf("week").subtract(1, "day").format(), dt.endOf("week").subtract(1, "day").format()];
        } else if (str == "by") {
          let dt = DayJs();
          dstr = [dt.startOf("month").format(), dt.endOf("month").format()];
        } else if (str == "jsy") {
          let dt = DayJs();
          dstr = [dt.startOf("month").subtract(2, "month").format(), dt.endOf("month").format()];
        } else if (str == "bn") {
          let dt = DayJs();
          dstr = [dt.startOf("year").format(), dt.endOf("year").format()];
        } else if (str == "d7") {
          let dt = DayJs();
          dstr = [dt.subtract(6, "day").format(), dt.format()];
        } else if (str == "d30") {
          let dt = DayJs();
          dstr = [dt.subtract(29, "day").format(), dt.format()];
        }
      } else {
        if (typeof (item == null ? void 0 : item.fun) == "function") {
          dstr = item.fun();
          if (typeof idstr == "function") {
            dstr = dstr();
          }
        }
      }
      if (Array.isArray(dstr)) {
        if (dstr.length !== 2)
          return;
        valuedate_start.value = DayJs(dstr[0]).format(defaultFormat);
        valuedate_end.value = DayJs(dstr[1]).format(defaultFormat);
        if (focusIndex.value == -1) {
          focusIndex.value = 0;
        }
        if (focusIndex.value == 0) {
          picker_focus_date.value = valuedate_start.value;
        }
        if (focusIndex.value == 1) {
          picker_focus_date.value = valuedate_end.value;
        }
      }
    }
    function setDate(ar) {
      if (Array.isArray(ar) && (ar == null ? void 0 : ar.length) == 2) {
        valuedate_start.value = DayJs(ar[0]).isValid() ? DayJs(ar[0]).format(defaultFormat) : DayJs(props.start).format(defaultFormat);
        valuedate_end.value = DayJs(ar[1]).isValid() ? DayJs(ar[1]).format(defaultFormat) : DayJs(props.end).format(defaultFormat);
        focusIndex.value = focusIndex.value == -1 ? 0 : focusIndex.value;
        if (!DayJs(ar[focusIndex.value]).isValid())
          return;
        picker_focus_date.value = DayJs(ar[focusIndex.value]).format(defaultFormat);
      }
    }
    function confirm() {
      emits("update:modelValue", [valuedate_start.value, valuedate_end.value]);
      emits("update:modelStr", [DayJs(valuedate_start.value).format(props.format), DayJs(valuedate_end.value).format(props.format)]);
      emits("confirm", [valuedate_start.value, valuedate_end.value]);
    }
    function getNowDate() {
      updateTime();
      return [valuedate_start.value, valuedate_end.value];
    }
    function clear() {
      valuedate_start.value = "";
      valuedate_end.value = "";
      emits("update:modelStr", ["", ""]);
      emits("clear");
    }
    expose({ getNowDate });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.quickBtn.length > 0
      }, props.quickBtn.length > 0 ? {
        b: common_vendor.p({
          _class: "py-24  px-16",
          color: "grey",
          label: "快捷方式"
        }),
        c: common_vendor.f(props.quickBtn, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => quickChangeClick(item), index),
            b: index,
            c: "2fbaed78-2-" + i0 + ",2fbaed78-0",
            d: common_vendor.p({
              color: props.color,
              text: true,
              outlined: true,
              shadow: 0,
              label: item.label
            })
          };
        })
      } : {}, {
        d: common_vendor.p({
          color: "grey",
          label: "自定时间范围"
        }),
        e: common_vendor.o(clear),
        f: common_vendor.p({
          ["font-size"]: 24,
          color: "grey",
          name: "tmicon-delete"
        }),
        g: !common_vendor.unref(valuedate_start_str)
      }, !common_vendor.unref(valuedate_start_str) ? {
        h: common_vendor.p({
          color: "grey",
          label: "开始时间"
        })
      } : {}, {
        i: common_vendor.unref(valuedate_start_str)
      }, common_vendor.unref(valuedate_start_str) ? {
        j: common_vendor.p({
          color: focusIndex.value == 0 ? props.color : "grey",
          label: common_vendor.unref(valuedate_start_str)
        })
      } : {}, {
        k: common_vendor.o(($event) => changeFocus(0)),
        l: common_vendor.p({
          text: true,
          round: 24,
          parenClass: "flex-1",
          _class: "flex flex-row flex-row-center-center",
          color: focusIndex.value == 0 ? props.color : "grey-4",
          height: 76,
          outlined: true,
          border: 4,
          margin: [0, 0],
          padding: [32, 0]
        }),
        m: common_vendor.p({
          ["font-size"]: 28,
          _class: "text-weight-b",
          label: "至"
        }),
        n: !common_vendor.unref(valuedate_end_str)
      }, !common_vendor.unref(valuedate_end_str) ? {
        o: common_vendor.p({
          color: "grey",
          label: "结束时间"
        })
      } : {}, {
        p: common_vendor.unref(valuedate_end_str)
      }, common_vendor.unref(valuedate_end_str) ? {
        q: common_vendor.p({
          color: focusIndex.value == 1 ? props.color : "grey",
          label: common_vendor.unref(valuedate_end_str)
        })
      } : {}, {
        r: common_vendor.o(($event) => changeFocus(1)),
        s: common_vendor.p({
          text: true,
          round: 24,
          parenClass: "flex-1",
          _class: "flex flex-row flex-row-center-center",
          color: focusIndex.value == 1 ? props.color : "grey-4",
          height: 76,
          outlined: true,
          border: 4,
          margin: [0, 0],
          padding: [32, 0]
        }),
        t: common_vendor.o(timeChange),
        v: common_vendor.o(($event) => picker_focus_date.value = $event),
        w: common_vendor.o(($event) => picker_focus_date_str.value = $event),
        x: common_vendor.p({
          showDetail: props.showDetail,
          immediateChange: props.immediateChange,
          start: common_vendor.unref(starTtime),
          end: common_vendor.unref(endTtime),
          defaultValue: picker_focus_date.value,
          modelValue: picker_focus_date.value,
          ["model-str"]: picker_focus_date_str.value
        }),
        y: props.showBtn
      }, props.showBtn ? {
        z: common_vendor.o(confirm),
        A: common_vendor.p({
          color: props.color,
          round: 24,
          shadow: 3,
          block: true,
          label: "确认"
        })
      } : {}, {
        B: common_vendor.p({
          margin: [0, 0],
          padding: [0, 0]
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-time-between/tm-time-between.vue"]]);
wx.createComponent(Component);
