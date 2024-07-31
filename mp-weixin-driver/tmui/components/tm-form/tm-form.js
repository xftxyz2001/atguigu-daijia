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
const tmui_components_tmFormItem_validateFunCall = require("../tm-form-item/validateFunCall.js");
if (!Math) {
  tmSheet();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-form",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    padding: {
      type: Array,
      default: () => [16, 0]
    },
    //表单标签是竖还是横排列。
    //vertical,horizontal
    layout: {
      type: String,
      default: "horizontal"
    },
    //如果为0表示自动宽度。
    labelWidth: {
      type: Number,
      default: 160
    },
    //标签对齐方式
    labelAlign: {
      type: String,
      default: "left"
    },
    //显示下划线。
    border: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "validate", "reset", "clearValidate", "update:modelValue"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _modelVal = common_vendor.ref(props.modelValue);
    const _backModelVal = common_vendor.index.$tm.u.deepClone(props.modelValue);
    common_vendor.watchEffect(() => {
      _modelVal.value = props.modelValue;
    });
    const _callBackModelVal = common_vendor.ref([]);
    const tmFormComnameId = "tmFormId";
    common_vendor.ref(["tm-radio-group", "tm-checkbox-box", "tm-input", "tm-rate", "tm-slider", "tm-segtab", "tm-switch", "tm-upload"]);
    const formFunCallBack = common_vendor.ref("");
    const validateResultList = common_vendor.ref([]);
    common_vendor.provide(
      "tmFormFun",
      common_vendor.computed(() => formFunCallBack.value)
    );
    common_vendor.provide(
      "tmFormLabelWidth",
      common_vendor.computed(() => props.labelWidth)
    );
    common_vendor.provide(
      "tmFormLabelAlign",
      common_vendor.computed(() => props.labelAlign)
    );
    common_vendor.provide(
      "tmFormLayout",
      common_vendor.computed(() => props.layout)
    );
    common_vendor.provide(
      "tmFormBorder",
      common_vendor.computed(() => props.border)
    );
    common_vendor.provide(
      "tmFormTransprent",
      common_vendor.computed(() => props.transprent)
    );
    common_vendor.provide(
      "formCallFiled",
      common_vendor.computed(() => _modelVal.value)
    );
    common_vendor.provide(
      "validateResultList",
      common_vendor.computed(() => validateResultList.value)
    );
    let timid = NaN;
    common_vendor.watch(
      () => props.modelValue,
      () => {
        clearTimeout(timid);
        if (formFunCallBack.value == "validate") {
          timid = setTimeout(function() {
            const result = validate();
            validateResultList.value = [...result.result];
          }, 100);
        }
      },
      { deep: true }
    );
    function reset() {
      formFunCallBack.value = "reset";
      let dblack = common_vendor.index.$tm.u.deepClone(_backModelVal);
      emits("update:modelValue", dblack);
      emits("reset");
      _modelVal.value = dblack;
    }
    function clearValidate() {
      formFunCallBack.value = "clearValidate";
      common_vendor.nextTick$1(() => {
        emits("clearValidate");
      });
    }
    function submit() {
      formFunCallBack.value = "validate";
      common_vendor.index.$tm.u.throttle(
        () => {
          const result = validate();
          validateResultList.value = [...result.result];
          emits("submit", __spreadValues({ data: common_vendor.toRaw(_modelVal.value) }, result));
        },
        220,
        false
      );
    }
    function validate() {
      var _a, _b, _c, _d;
      formFunCallBack.value = "validate";
      let par = common_vendor.toRaw(_callBackModelVal.value);
      let isPass = true;
      let list = [];
      for (let i = 0, len = par.length; i < len; i++) {
        let item = par[i];
        let value = tmui_components_tmFormItem_validateFunCall.getObjectVal(_modelVal.value, item.field);
        const vallist = tmui_components_tmFormItem_validateFunCall.validateFunCall(item.rules, value);
        let rulstVal = {
          message: "校验通过",
          validator: true
        };
        for (let j = 0; j < vallist.length; j++) {
          if (!vallist[j].validator) {
            isPass = false;
            rulstVal.message = (_b = (_a = vallist[j]) == null ? void 0 : _a.message) != null ? _b : "校验通过";
            rulstVal.validator = (_d = (_c = vallist[j]) == null ? void 0 : _c.validator) != null ? _d : true;
            break;
          }
        }
        list.push(__spreadValues({ field: item.field }, rulstVal));
      }
      return { result: list, isPass, data: common_vendor.toRaw(_modelVal.value), validate: isPass };
    }
    function pushKey(item) {
      if (!item.field)
        return;
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex == -1) {
        _callBackModelVal.value.push(item);
      } else {
        _callBackModelVal.value[idsIndex] = __spreadValues({}, item);
      }
    }
    function delKey(item) {
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex > -1) {
        _callBackModelVal.value.splice(idsIndex, 1);
      }
    }
    expose({
      reset,
      validate,
      clearValidate,
      submit,
      pushKey,
      delKey,
      tmFormComnameId
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          transprent: props.transprent,
          round: 3,
          _class: "flex flex-col overflow",
          padding: props.padding,
          margin: props.margin
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-form/tm-form.vue"]]);
wx.createComponent(Component);
