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
if (!Math) {
  (tmText + tmSheet + tmDivider)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-form-item",
  props: {
    parentClass: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    //表单描述
    desc: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [12, 12]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    //如果在forom绑定的model为深层对象，这里的名称需要如下:
    //比如model = {a:2,b:{c:333}}
    //如果想绑定c,则field = "b.c"
    field: {
      type: String,
      default: ""
    },
    //表彰底部的单项注意说明。
    help: {
      type: String,
      default: ""
    },
    //是否必填
    required: {
      type: Boolean,
      default: false
    },
    //检验规则
    rules: {
      type: [Object, Array],
      default: () => {
        return [{ validator: false, required: false }];
      }
    },
    //显示下划线。
    border: {
      type: Boolean,
      default: null
    },
    showError: {
      type: Boolean,
      default: true
    },
    /**当显示错误信息标题时，是否隐藏顶部的间隙，当连续的布局时有用，可以减少之间的间隙大小。 */
    showTopErrorGap: {
      type: Boolean,
      default: true
    },
    //校验不通过时，是否让标题跟着变化文字颜色，默认是。
    requiredTitleChangeColor: {
      type: Boolean,
      default: false
    },
    transprent: {
      type: [Boolean, String],
      default: null
    },
    round: {
      type: Number,
      default: 0
    },
    errHeight: {
      type: Number,
      default: 30
    },
    labelWidth: {
      type: Number,
      default: 0
    }
  },
  setup(__props, { expose }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmFormComnameFormItem = "tmFormComnameFormItem";
    const item = common_vendor.ref({
      label: "",
      //标签名称。
      field: props.field,
      //字段名称key.
      value: null,
      isRequiredError: false,
      //true,错误，false正常 检验状态
      message: "",
      //检验信息提示语。
      id: common_vendor.index.$tm.u.getUid(1),
      //表单唯一标识id
      componentsName: "",
      //表单组件类型。
      rules: []
    });
    const _required = common_vendor.ref(props.required);
    const tmFormLabelWidth = common_vendor.inject(
      "tmFormLabelWidth",
      common_vendor.computed(() => 100)
    );
    const tmFormLabelAlign = common_vendor.inject(
      "tmFormLabelAlign",
      common_vendor.computed(() => "left")
    );
    const tmFormLayout = common_vendor.inject(
      "tmFormLayout",
      common_vendor.computed(() => "horizontal")
    );
    const tmFormBorder_inject = common_vendor.inject(
      "tmFormBorder",
      common_vendor.computed(() => true)
    );
    const tmFormTransprent = common_vendor.inject(
      "tmFormTransprent",
      common_vendor.computed(() => false)
    );
    const tmFormFun = common_vendor.inject(
      "tmFormFun",
      common_vendor.computed(() => "")
    );
    const tmFormValidateResultList = common_vendor.inject(
      "validateResultList",
      common_vendor.computed(() => [])
    );
    const tmFormBorder = common_vendor.computed(() => {
      if (props.border !== null && typeof props.border === "boolean")
        return props.border;
      return tmFormBorder_inject.value;
    });
    const _label = common_vendor.computed(() => props.label);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmFormComnameId) == "tmFormId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    common_vendor.onUnmounted(() => {
      delCom();
    });
    const Rules = common_vendor.computed(() => {
      var _a2, _b2, _c2, _d, _e;
      let defaultrs = [];
      if (Array.isArray(props == null ? void 0 : props.rules)) {
        props == null ? void 0 : props.rules.forEach((el) => {
          var _a3, _b3;
          let isreq = (el == null ? void 0 : el.required) || props.required;
          defaultrs.push({
            message: (_a3 = el == null ? void 0 : el.message) != null ? _a3 : "请填写必要的内容",
            required: isreq,
            validator: (_b3 = el == null ? void 0 : el.validator) != null ? _b3 : false
          });
        });
      } else {
        defaultrs = [
          {
            message: (_b2 = (_a2 = props == null ? void 0 : props.rules) == null ? void 0 : _a2.message) != null ? _b2 : "请填写必要的内容",
            required: ((_c2 = props.rules) == null ? void 0 : _c2.required) || props.required,
            validator: (_e = (_d = props.rules) == null ? void 0 : _d.validator) != null ? _e : false
          }
        ];
      }
      return defaultrs;
    });
    function pushCom(itemComval) {
      if (parent) {
        item.value = __spreadProps(__spreadValues(__spreadValues({}, item.value), itemComval != null ? itemComval : {}), { rules: Rules.value });
        parent.pushKey(__spreadValues({}, item.value));
      }
    }
    function delCom() {
      if (parent) {
        parent.delKey(item.value);
      }
    }
    expose({ pushCom, delCom, tmFormComnameFormItem });
    common_vendor.onMounted(() => {
      pushCom();
    });
    common_vendor.watch(
      () => tmFormValidateResultList.value,
      () => {
        const result = tmFormValidateResultList.value.filter((el) => el.field == props.field);
        if (result.length > 0) {
          item.value.message = result[0].message;
          item.value.isRequiredError = !result[0].validator;
        }
      },
      { deep: true, immediate: true }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.showError && props.showTopErrorGap
      }, props.showError && props.showTopErrorGap ? {
        b: `${props.errHeight}rpx`
      } : {}, {
        c: common_vendor.unref(_label)
      }, common_vendor.unref(_label) ? common_vendor.e({
        d: _required.value
      }, _required.value ? {
        e: common_vendor.p({
          color: "red",
          ["font-size"]: 30,
          label: "*"
        })
      } : {}, {
        f: common_vendor.p({
          color: common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true && props.requiredTitleChangeColor ? "red" : "",
          ["font-size"]: 30,
          label: common_vendor.unref(_label)
        }),
        g: common_vendor.s(common_vendor.unref(tmFormLayout) == "horizontal" ? {
          width: (props.labelWidth || common_vendor.unref(tmFormLabelWidth)) + "rpx"
        } : ""),
        h: common_vendor.n(common_vendor.unref(tmFormLabelAlign) == "right" ? "flex-row-center-end" : "flex-row-center-start"),
        i: common_vendor.n(common_vendor.unref(tmFormLayout) != "horizontal" ? "mb-24 flex-1 " : "mr-32 ")
      }) : {}, {
        j: common_vendor.s(common_vendor.unref(tmFormLayout) == "horizontal" ? {
          width: "0px"
        } : ""),
        k: common_vendor.n(common_vendor.unref(tmFormLayout) == "horizontal" ? "flex-row " : " "),
        l: common_vendor.n(common_vendor.unref(tmFormLayout) == "horizontal" && !props.align ? "flex-row-center-start" : ""),
        m: common_vendor.n(common_vendor.unref(tmFormLayout) == "vertical" && !props.align ? "flex-col" : ""),
        n: common_vendor.n(props.align),
        o: common_vendor.n(props.parentClass),
        p: common_vendor.p({
          color: "grey-darken-2",
          ["font-size"]: 22,
          label: props.desc
        }),
        q: common_vendor.n(props.desc ? "pt-12" : ""),
        r: props.showError
      }, props.showError ? common_vendor.e({
        s: common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true
      }, common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true ? {
        t: common_vendor.p({
          color: "red",
          ["font-size"]: 22,
          label: item.value.message
        }),
        v: common_vendor.r("error", {
          data: {
            message: item.value.message
          }
        })
      } : {}, {
        w: `${props.errHeight}rpx`
      }) : {}, {
        x: common_vendor.n(`py-${props.margin[1]}`),
        y: common_vendor.p({
          transprent: props.transprent !== null ? props.transprent : common_vendor.unref(tmFormTransprent),
          round: props.round,
          margin: [0, 0],
          padding: props.padding
        }),
        z: common_vendor.unref(tmFormBorder)
      }, common_vendor.unref(tmFormBorder) ? {
        A: common_vendor.p({
          border: 2,
          padding: [0, 0],
          margin: [0, 0]
        })
      } : {}, {
        B: common_vendor.n(`mx-${props.margin[0]}`)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-form-item/tm-form-item.vue"]]);
wx.createComponent(Component);
