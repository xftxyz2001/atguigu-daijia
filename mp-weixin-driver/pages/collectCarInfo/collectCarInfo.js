"use strict";
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
const api_order_index = require("../../api/order/index.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
if (!Array) {
  const _easycom_upload_images2 = common_vendor.resolveComponent("upload-images");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_upload_images2 + _easycom_tm_form_item2 + _easycom_tm_input2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_upload_images = () => "../../components/upload-images/upload-images.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_upload_images + _easycom_tm_form_item + _easycom_tm_input + _easycom_tm_button + tmForm + _easycom_tm_app)();
}
const tmForm = () => "../../tmui/components/tm-form/tm-form.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "collectCarInfo",
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const formRef = common_vendor.ref();
    const formData = common_vendor.ref({
      carFrontUrl: [],
      // 司机到达拍照：车前照
      carBackUrl: [],
      // 司机到达拍照：车后照
      carType: "",
      // 车型
      carLicense: ""
      // 车牌
    });
    function confirm(validateInfo) {
      return __async(this, null, function* () {
        var _a, _b;
        console.log("validateInfo", validateInfo);
        console.log("formData", formData.value);
        if (!validateInfo.isPass)
          return;
        let params = {
          orderId: props.orderId,
          // 订单id
          carFrontUrl: (_a = formData.value.carFrontUrl[0]) == null ? void 0 : _a.url,
          // 司机到达拍照：车前照
          carBackUrl: (_b = formData.value.carBackUrl[0]) == null ? void 0 : _b.url,
          // 司机到达拍照：车后照
          carType: formData.value.carType,
          // 车型
          carLicense: formData.value.carLicense
          // 车牌
        };
        yield api_order_index.updateCarInfo(params);
        back();
      });
    }
    function back() {
      common_vendor.index.navigateBack();
    }
    common_vendor.onLoad(() => {
      console.log("onLoad-props", props);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(formData).carFrontUrl = $event),
        b: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          ["default-value"]: common_vendor.unref(formData).carFrontUrl,
          modelValue: common_vendor.unref(formData).carFrontUrl
        }),
        c: common_vendor.p({
          required: true,
          label: "车前照",
          field: "carFrontUrl",
          rules: {
            required: true,
            message: "请上传车前照"
          }
        }),
        d: common_vendor.o(($event) => common_vendor.unref(formData).carBackUrl = $event),
        e: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          ["default-value"]: common_vendor.unref(formData).carBackUrl,
          modelValue: common_vendor.unref(formData).carBackUrl
        }),
        f: common_vendor.p({
          required: true,
          label: "车后照",
          field: "carBackUrl",
          rules: {
            required: true,
            message: "请上传车后照"
          }
        }),
        g: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).carLicense = $event, {
          lazy: true
        }, true)),
        h: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入车牌号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).carLicense
        }),
        i: common_vendor.p({
          required: true,
          label: "车牌号",
          showError: true,
          field: "carLicense",
          rules: [
            {
              required: true,
              message: "不能为空",
              validator: (val) => val.length > 0
            }
            // { required: true, message: '请输入正确的车牌号', validator: (val) => carNo(val) }
          ]
        }),
        j: common_vendor.p({
          ["form-type"]: "submit",
          label: "提交表单",
          block: true
        }),
        k: common_vendor.o(back),
        l: common_vendor.p({
          shadow: 0,
          text: true,
          label: "返回",
          block: true
        }),
        m: common_vendor.p({
          border: false
        }),
        n: common_vendor.sr(formRef, "7c748bf6-1,7c748bf6-0", {
          "k": "formRef"
        }),
        o: common_vendor.o(confirm),
        p: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : null),
        q: common_vendor.p({
          ["label-width"]: 190,
          modelValue: common_vendor.unref(formData)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/collectCarInfo/collectCarInfo.vue"]]);
wx.createPage(MiniProgramPage);
