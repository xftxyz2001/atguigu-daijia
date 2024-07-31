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
const utils_validate = require("../../utils/validate.js");
const api_user_index = require("../../api/user/index.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
if (!Array) {
  const _easycom_ocr_upload2 = common_vendor.resolveComponent("ocr-upload");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_ocr_upload2 + _easycom_tm_form_item2 + _easycom_tm_input2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_ocr_upload = () => "../../components/ocr-upload/ocr-upload.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_ocr_upload + _easycom_tm_form_item + _easycom_tm_input + _easycom_tm_button + tmForm + _easycom_tm_app)();
}
const tmForm = () => "../../tmui/components/tm-form/tm-form.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "verification",
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
      idcardFrontUrl: [],
      idcardBackUrl: [],
      driverLicenseFrontUrl: [],
      idcardHandUrl: [],
      driverLicenseHandUrl: [],
      phone: "",
      contactName: "",
      contactPhone: "",
      contactRelationship: ""
    });
    function confirm(validateInfo) {
      return __async(this, null, function* () {
        console.log("validateInfo", validateInfo);
        console.log("formData", formData.value);
        if (!validateInfo.isPass)
          return;
        console.log("通过检验");
        let params = {
          phone: formData.value.phone,
          contactName: formData.value.contactName,
          contactPhone: formData.value.contactPhone,
          contactRelationship: formData.value.contactRelationship,
          name: formData.value.idcardFrontUrl[0].originalData.name,
          gender: formData.value.idcardFrontUrl[0].originalData.gender,
          birthday: formData.value.idcardFrontUrl[0].originalData.birthday,
          idcardNo: formData.value.idcardFrontUrl[0].originalData.idcardNo,
          idcardAddress: formData.value.idcardFrontUrl[0].originalData.idcardAddress,
          idcardExpire: formData.value.idcardFrontUrl[0].originalData.idcardExpire || formData.value.idcardBackUrl[0].originalData.idcardExpire,
          idcardFrontUrl: formData.value.idcardFrontUrl[0].originalData.idcardFrontUrl,
          idcardBackUrl: formData.value.idcardBackUrl[0].originalData.idcardBackUrl,
          idcardHandUrl: formData.value.idcardHandUrl[0].originalData.url,
          driverLicenseClazz: formData.value.driverLicenseFrontUrl[0].originalData.driverLicenseClazz,
          driverLicenseNo: formData.value.driverLicenseFrontUrl[0].originalData.driverLicenseNo,
          driverLicenseExpire: formData.value.driverLicenseFrontUrl[0].originalData.driverLicenseExpire,
          driverLicenseIssueDate: formData.value.driverLicenseFrontUrl[0].originalData.driverLicenseIssueDate,
          driverLicenseFrontUrl: formData.value.driverLicenseFrontUrl[0].originalData.driverLicenseFrontUrl,
          driverLicenseBackUrl: "",
          driverLicenseHandUrl: formData.value.driverLicenseHandUrl[0].originalData.url
        };
        console.log("params", params);
        yield api_user_index.updateUserInfo(params);
        common_vendor.index.navigateTo({
          url: "/pages/facialIdentification/facialIdentification?creatFaceModel=true"
        });
      });
    }
    function getDriverInfo() {
      return __async(this, null, function* () {
        let { data } = yield api_user_index.getDriverAuthInfo();
        if (data.contactPhone) {
          formData.value = {
            idcardFrontUrl: [
              {
                url: data.idcardFrontShowUrl,
                name: data.idcardFrontShowUrl,
                originalData: {
                  name: data.name,
                  gender: data.gender,
                  birthday: data.birthday,
                  idcardNo: data.idcardNo,
                  idcardAddress: data.idcardAddress,
                  idcardExpire: data.idcardExpire,
                  idcardFrontUrl: data.idcardFrontUrl,
                  idcardFrontShowUrl: data.idcardFrontShowUrl,
                  idcardBackUrl: data.idcardBackUrl,
                  idcardBackShowUrl: data.idcardBackShowUrl
                }
              }
            ],
            idcardBackUrl: [
              {
                url: data.idcardBackShowUrl,
                name: data.idcardBackShowUrl,
                originalData: {
                  name: data.name,
                  gender: data.gender,
                  birthday: data.birthday,
                  idcardNo: data.idcardNo,
                  idcardAddress: data.idcardAddress,
                  idcardExpire: data.idcardExpire,
                  idcardFrontUrl: data.idcardFrontUrl,
                  idcardFrontShowUrl: data.idcardFrontShowUrl,
                  idcardBackUrl: data.idcardBackUrl,
                  idcardBackShowUrl: data.idcardBackShowUrl
                }
              }
            ],
            driverLicenseFrontUrl: [
              {
                url: data.driverLicenseFrontShowUrl,
                name: data.driverLicenseFrontShowUrl,
                originalData: {
                  name: "",
                  driverLicenseClazz: data.driverLicenseClazz,
                  driverLicenseNo: data.driverLicenseNo,
                  driverLicenseExpire: data.driverLicenseExpire,
                  driverLicenseIssueDate: data.driverLicenseIssueDate,
                  driverLicenseFrontUrl: data.driverLicenseFrontUrl,
                  driverLicenseFrontShowUrl: data.driverLicenseFrontShowUrl,
                  driverLicenseBackUrl: data.driverLicenseBackUrl,
                  driverLicenseBackShowUrl: data.driverLicenseBackShowUrl
                }
              }
            ],
            idcardHandUrl: [
              {
                url: data.idcardHandShowUrl,
                name: data.idcardHandShowUrl,
                originalData: {
                  url: data.idcardHandUrl,
                  showUrl: data.idcardHandShowUrl
                }
              }
            ],
            driverLicenseHandUrl: [
              {
                url: data.driverLicenseHandShowUrl,
                name: data.driverLicenseHandShowUrl,
                originalData: {
                  url: data.driverLicenseHandUrl,
                  showUrl: data.driverLicenseHandShowUrl
                }
              }
            ],
            phone: data.phone,
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            contactRelationship: data.contactRelationship
          };
        }
      });
    }
    function back() {
      common_vendor.index.navigateBack();
    }
    common_vendor.onLoad(() => {
      console.log("onLoad-props", props);
      getDriverInfo();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(formData).idcardFrontUrl = $event),
        b: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          suffixUrl: "/ocr/idCardOcr",
          ["default-value"]: common_vendor.unref(formData).idcardFrontUrl,
          modelValue: common_vendor.unref(formData).idcardFrontUrl
        }),
        c: common_vendor.p({
          required: true,
          label: "身份证正面",
          field: "idcardFrontUrl",
          rules: {
            required: true,
            message: "请上传身份证正面"
          }
        }),
        d: common_vendor.o(($event) => common_vendor.unref(formData).idcardBackUrl = $event),
        e: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          suffixUrl: "/ocr/idCardOcr",
          ["default-value"]: common_vendor.unref(formData).idcardBackUrl,
          modelValue: common_vendor.unref(formData).idcardBackUrl
        }),
        f: common_vendor.p({
          required: true,
          label: "身份证反面",
          field: "idcardBackUrl",
          rules: {
            required: true,
            message: "请上传身份证反面"
          }
        }),
        g: common_vendor.o(($event) => common_vendor.unref(formData).driverLicenseFrontUrl = $event),
        h: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          suffixUrl: "/ocr/driverLicenseOcr",
          ["default-value"]: common_vendor.unref(formData).driverLicenseFrontUrl,
          modelValue: common_vendor.unref(formData).driverLicenseFrontUrl
        }),
        i: common_vendor.p({
          required: true,
          label: "驾驶证正面",
          field: "driverLicenseFrontUrl",
          rules: {
            required: true,
            message: "请上传驾驶证正面"
          }
        }),
        j: common_vendor.o(($event) => common_vendor.unref(formData).idcardHandUrl = $event),
        k: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          suffixUrl: "/cos/upload",
          ["default-value"]: common_vendor.unref(formData).idcardHandUrl,
          modelValue: common_vendor.unref(formData).idcardHandUrl
        }),
        l: common_vendor.p({
          required: true,
          label: "手持身份证",
          field: "idcardHandUrl",
          rules: {
            required: true,
            message: "请上传手持身份证"
          }
        }),
        m: common_vendor.o(($event) => common_vendor.unref(formData).driverLicenseHandUrl = $event),
        n: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          suffixUrl: "/cos/upload",
          ["default-value"]: common_vendor.unref(formData).driverLicenseHandUrl,
          modelValue: common_vendor.unref(formData).driverLicenseHandUrl
        }),
        o: common_vendor.p({
          required: true,
          label: "手持驾驶证",
          field: "driverLicenseHandUrl",
          rules: {
            required: true,
            message: "请上传手持驾驶证"
          }
        }),
        p: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).phone = $event, {
          lazy: true
        }, true)),
        q: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入手机号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).phone
        }),
        r: common_vendor.p({
          required: true,
          label: "手机号",
          showError: true,
          field: "phone",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }, {
            required: true,
            message: "请输入正确的手机号",
            validator: (val) => common_vendor.unref(utils_validate.mobile)(val)
          }]
        }),
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).contactName = $event, {
          lazy: true
        }, true)),
        t: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入紧急联系人",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).contactName
        }),
        v: common_vendor.p({
          required: true,
          label: "紧急联系人",
          showError: true,
          field: "contactName",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }]
        }),
        w: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).contactPhone = $event, {
          lazy: true
        }, true)),
        x: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入手机号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).contactPhone
        }),
        y: common_vendor.p({
          required: true,
          label: "紧急联系人手机号",
          showError: true,
          field: "contactPhone",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }, {
            required: true,
            message: "请输入正确的手机号",
            validator: (val) => common_vendor.unref(utils_validate.mobile)(val)
          }]
        }),
        z: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).contactRelationship = $event, {
          lazy: true
        }, true)),
        A: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入紧急联系人关系",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).contactRelationship
        }),
        B: common_vendor.p({
          required: true,
          label: "紧急联系人关系",
          showError: true,
          field: "contactRelationship",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }]
        }),
        C: ((_b = (_a = common_vendor.unref(formData)) == null ? void 0 : _a.idcardFrontUrl[0]) == null ? void 0 : _b.originalData) && ((_d = (_c = common_vendor.unref(formData)) == null ? void 0 : _c.idcardBackUrl[0]) == null ? void 0 : _d.originalData)
      }, ((_f = (_e = common_vendor.unref(formData)) == null ? void 0 : _e.idcardFrontUrl[0]) == null ? void 0 : _f.originalData) && ((_h = (_g = common_vendor.unref(formData)) == null ? void 0 : _g.idcardBackUrl[0]) == null ? void 0 : _h.originalData) ? {
        D: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.name,
          transprent: true,
          showBottomBotder: true
        }),
        E: common_vendor.p({
          label: "真实姓名"
        }),
        F: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.gender == 1 ? "男" : "女",
          transprent: true,
          showBottomBotder: true
        }),
        G: common_vendor.p({
          label: "性别"
        }),
        H: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.idcardNo,
          transprent: true,
          showBottomBotder: true
        }),
        I: common_vendor.p({
          label: "身份证号码"
        }),
        J: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.birthday,
          transprent: true,
          showBottomBotder: true
        }),
        K: common_vendor.p({
          label: "生日"
        }),
        L: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.idcardAddress,
          transprent: true,
          showBottomBotder: true
        }),
        M: common_vendor.p({
          label: "身份证地址"
        }),
        N: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).idcardFrontUrl[0].originalData.idcardExpire || common_vendor.unref(formData).idcardBackUrl[0].originalData.idcardExpire,
          transprent: true,
          showBottomBotder: true
        }),
        O: common_vendor.p({
          label: "身份证过期时间"
        })
      } : {}, {
        P: (_j = (_i = common_vendor.unref(formData)) == null ? void 0 : _i.driverLicenseFrontUrl[0]) == null ? void 0 : _j.originalData
      }, ((_l = (_k = common_vendor.unref(formData)) == null ? void 0 : _k.driverLicenseFrontUrl[0]) == null ? void 0 : _l.originalData) ? {
        Q: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).driverLicenseFrontUrl[0].originalData.driverLicenseClazz,
          transprent: true,
          showBottomBotder: true
        }),
        R: common_vendor.p({
          label: "准驾车型"
        }),
        S: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).driverLicenseFrontUrl[0].originalData.driverLicenseNo,
          transprent: true,
          showBottomBotder: true
        }),
        T: common_vendor.p({
          label: "驾驶证证件号"
        }),
        U: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).driverLicenseFrontUrl[0].originalData.driverLicenseExpire,
          transprent: true,
          showBottomBotder: true
        }),
        V: common_vendor.p({
          label: "驾驶证有效期"
        }),
        W: common_vendor.p({
          inputPadding: [0, 0],
          disabled: true,
          modelValue: common_vendor.unref(formData).driverLicenseFrontUrl[0].originalData.driverLicenseIssueDate,
          transprent: true,
          showBottomBotder: true
        }),
        X: common_vendor.p({
          label: "驾驶证初次领证日期"
        })
      } : {}, {
        Y: common_vendor.p({
          ["form-type"]: "submit",
          label: "提交",
          block: true
        }),
        Z: common_vendor.o(back),
        aa: common_vendor.p({
          shadow: 0,
          text: true,
          label: "返回",
          block: true
        }),
        ab: common_vendor.p({
          border: false
        }),
        ac: common_vendor.sr(formRef, "63c5b216-1,63c5b216-0", {
          "k": "formRef"
        }),
        ad: common_vendor.o(confirm),
        ae: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : null),
        af: common_vendor.p({
          ["label-width"]: 190,
          modelValue: common_vendor.unref(formData)
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/verification/verification.vue"]]);
wx.createPage(MiniProgramPage);
