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
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
require("../../config/constant.js");
if (!Array) {
  const _easycom_tm_upload2 = common_vendor.resolveComponent("tm-upload");
  _easycom_tm_upload2();
}
const _easycom_tm_upload = () => "../../tmui/components/tm-upload/tm-upload.js";
if (!Math) {
  _easycom_tm_upload();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ocr-upload",
  props: ["modelValue", "suffixUrl"],
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const upLoadUrl = common_vendor.computed(() => {
      return "http://localhost:8600/driver-api" + props.suffixUrl;
    });
    const header = common_vendor.ref({
      token: utils_storage.getToken()
    });
    common_vendor.useAttrs();
    const success = (item, fileList) => {
      console.log("success", item, fileList);
      let targetList = fileList.map((item2) => {
        const targetItem = JSON.parse(item2.response);
        return {
          url: targetItem.data.idcardFrontShowUrl,
          name: targetItem.data.idcardFrontShowUrl,
          originalData: targetItem.data
        };
      });
      emit("update:modelValue", targetList);
    };
    const remove = (item) => {
      console.log("item", item);
      const targetItem = item.response ? JSON.parse(item.response) : { data: item.url };
      let targetList = props.modelValue.filter((item2) => {
        return !JSON.stringify(targetItem).includes(item2.url);
      });
      console.log("targetList", targetList);
      emit("update:modelValue", targetList);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(success),
        b: common_vendor.o(remove),
        c: common_vendor.p(__spreadProps(__spreadValues({}, _ctx.$attrs), {
          url: common_vendor.unref(upLoadUrl),
          header: common_vendor.unref(header)
        }))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/components/ocr-upload/ocr-upload.vue"]]);
wx.createComponent(Component);
