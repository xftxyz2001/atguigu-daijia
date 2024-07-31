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
if (!Array) {
  const _easycom_upload_images2 = common_vendor.resolveComponent("upload-images");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_time_between2 = common_vendor.resolveComponent("tm-time-between");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_upload_images2 + _easycom_tm_form_item2 + _easycom_tm_input2 + _easycom_tm_icon2 + _easycom_tm_time_between2 + _easycom_tm_drawer2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_upload_images = () => "../../components/upload-images/upload-images.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_time_between = () => "../../tmui/components/tm-time-between/tm-time-between.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_upload_images + _easycom_tm_form_item + _easycom_tm_input + _easycom_tm_icon + _easycom_tm_time_between + _easycom_tm_drawer + _easycom_tm_button + tmForm + _easycom_tm_app)();
}
const tmForm = () => "../../tmui/components/tm-form/tm-form.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "driverInformation",
  setup(__props) {
    const formRef = common_vendor.ref();
    const formData = common_vendor.ref({
      avatar: [],
      // 头像
      phone: "",
      // 手机号
      idCard: "",
      // 身份证号码
      carNumber: "",
      // 车牌
      emergencyContactName: "",
      // 紧急联系人
      emergencyContactPhone: "",
      // 紧急联系人手机号
      drivingAge: "",
      // 驾龄
      // 驾驶证有效期
      drivingLicenseValidity: []
    });
    common_vendor.watch(
      () => formData.value.drivingLicenseValidity,
      (val) => {
        const targetVal = val.map((item) => item.slice(0, 10));
        if (targetVal.toString() === val.toString()) {
          return;
        }
        if (!val[0] || !val[1]) {
          formData.value.drivingLicenseValidity = [];
          return;
        }
        formData.value.drivingLicenseValidity = [...targetVal];
      }
    );
    const showDrivingLicenseValidityDrawer = common_vendor.ref(false);
    const drivingLicenseValidityStr = common_vendor.computed(
      () => formData.value.drivingLicenseValidity.join("~") === "~" ? "" : formData.value.drivingLicenseValidity.join("~")
    );
    function drivingLicenseValidityConfirmHandle(val) {
      showDrivingLicenseValidityDrawer.value = false;
    }
    function confirm(validateInfo) {
      return __async(this, null, function* () {
        console.log("validateInfo", validateInfo);
        console.log("formData", formData.value);
        if (!validateInfo.isPass)
          return;
      });
    }
    common_vendor.onLoad(() => {
      console.log("onLoad");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(formData).avatar = $event),
        b: common_vendor.p({
          maxFile: 1,
          rows: 3,
          width: 420,
          ["default-value"]: common_vendor.unref(formData).avatar,
          modelValue: common_vendor.unref(formData).avatar
        }),
        c: common_vendor.p({
          required: true,
          label: "头像",
          field: "avatar",
          rules: {
            required: true,
            message: "请上传头像"
          }
        }),
        d: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).phone = $event, {
          lazy: true
        }, true)),
        e: common_vendor.p({
          inputPadding: [0, 0],
          type: "idCard",
          placeholder: "请输入手机号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).phone
        }),
        f: common_vendor.p({
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
        g: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).idCard = $event, {
          lazy: true
        }, true)),
        h: common_vendor.p({
          inputPadding: [0, 0],
          type: "idCard",
          placeholder: "请输入身份证号码",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).idCard
        }),
        i: common_vendor.p({
          required: true,
          label: "身份证号码",
          showError: true,
          field: "idCard",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }, {
            required: true,
            message: "请输入正确的身份证号",
            validator: (val) => common_vendor.unref(utils_validate.idCard)(val)
          }]
        }),
        j: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).carNumber = $event, {
          lazy: true
        }, true)),
        k: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入车牌号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).carNumber
        }),
        l: common_vendor.p({
          required: true,
          label: "车牌号",
          showError: true,
          field: "carNumber",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }, {
            required: true,
            message: "请输入正确的车牌号",
            validator: (val) => common_vendor.unref(utils_validate.carNo)(val)
          }]
        }),
        m: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).emergencyContactName = $event, {
          lazy: true
        }, true)),
        n: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入紧急联系人姓名",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).emergencyContactName
        }),
        o: common_vendor.p({
          required: true,
          label: "紧急联系人",
          showError: true,
          field: "emergencyContactName",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }]
        }),
        p: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).emergencyContactPhone = $event, {
          lazy: true
        }, true)),
        q: common_vendor.p({
          inputPadding: [0, 0],
          type: "number",
          placeholder: "请输入紧急联系人手机号",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).emergencyContactPhone
        }),
        r: common_vendor.p({
          required: true,
          label: "紧急联系人手机号",
          showError: true,
          field: "emergencyContactPhone",
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
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(formData).drivingAge = $event, {
          lazy: true
        }, true)),
        t: common_vendor.p({
          inputPadding: [0, 0],
          placeholder: "请输入驾龄",
          type: "number",
          suffixLabel: "年",
          transprent: true,
          showBottomBotder: false,
          modelValue: common_vendor.unref(formData).drivingAge
        }),
        v: common_vendor.p({
          required: true,
          label: "驾龄",
          showError: true,
          field: "drivingAge",
          rules: [{
            required: true,
            message: "不能为空",
            validator: (val) => val.length > 0
          }, {
            required: true,
            message: "请输入正确的驾龄",
            validator: (val) => common_vendor.unref(utils_validate.number)(val) && +val > 0
          }]
        }),
        w: common_vendor.t(common_vendor.unref(drivingLicenseValidityStr) || "请选择时间"),
        x: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 24,
          name: "tmicon-angle-right"
        }),
        y: common_vendor.o(($event) => showDrivingLicenseValidityDrawer.value = !common_vendor.unref(showDrivingLicenseValidityDrawer)),
        z: !common_vendor.unref(drivingLicenseValidityStr) ? 1 : "",
        A: common_vendor.o(drivingLicenseValidityConfirmHandle),
        B: common_vendor.o(($event) => common_vendor.unref(formData).drivingLicenseValidity = $event),
        C: common_vendor.p({
          quickBtn: [],
          ["async-model"]: false,
          format: "YYYY-MM-DD",
          start: (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() - 10),
          end: (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() + 10),
          modelValue: common_vendor.unref(formData).drivingLicenseValidity
        }),
        D: common_vendor.o(($event) => common_vendor.isRef(showDrivingLicenseValidityDrawer) ? showDrivingLicenseValidityDrawer.value = $event : null),
        E: common_vendor.p({
          height: 900,
          hideHeader: true,
          show: common_vendor.unref(showDrivingLicenseValidityDrawer)
        }),
        F: common_vendor.p({
          required: true,
          label: "驾驶证有效期",
          field: "drivingLicenseValidity",
          rules: [{
            required: true,
            message: "请选择驾驶证有效期"
          }, {
            required: true,
            message: "请选择起止日期",
            validator: (val) => val[0] && val[1]
          }]
        }),
        G: common_vendor.p({
          ["form-type"]: "submit",
          label: "提交表单",
          block: true
        }),
        H: common_vendor.p({
          shadow: 0,
          text: true,
          ["form-type"]: "reset",
          label: "重置表单",
          block: true
        }),
        I: common_vendor.p({
          border: false
        }),
        J: common_vendor.sr(formRef, "f9067980-1,f9067980-0", {
          "k": "formRef"
        }),
        K: common_vendor.o(confirm),
        L: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : null),
        M: common_vendor.p({
          ["label-width"]: 190,
          modelValue: common_vendor.unref(formData)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/driverInformation/driverInformation.vue"]]);
wx.createPage(MiniProgramPage);
