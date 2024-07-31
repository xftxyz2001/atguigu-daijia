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
if (!Array) {
  const _easycom_tm_upload2 = common_vendor.resolveComponent("tm-upload");
  _easycom_tm_upload2();
}
const _easycom_tm_upload = () => "../../tmui/components/tm-upload/tm-upload.js";
if (!Math) {
  _easycom_tm_upload();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "upload-images",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const upLoadUrl = common_vendor.ref("http://localhost:8600/driver-api/file/upload");
    common_vendor.useAttrs();
    const success = (item, fileList) => {
      console.log("success", item, fileList);
      let targetList = fileList.map((item2) => {
        const targetItem = JSON.parse(item2.response);
        return {
          url: targetItem.data,
          name: targetItem.data
        };
      });
      emit("update:modelValue", targetList);
    };
    const remove = (item) => {
      const targetItem = item.response ? JSON.parse(item.response) : { data: item.url };
      let targetList = props.modelValue.filter((item2) => {
        return item2.url !== targetItem.data;
      });
      emit("update:modelValue", targetList);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(success),
        b: common_vendor.o(remove),
        c: common_vendor.p(__spreadProps(__spreadValues({}, _ctx.$attrs), {
          url: common_vendor.unref(upLoadUrl)
        }))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/components/upload-images/upload-images.vue"]]);
wx.createComponent(Component);
