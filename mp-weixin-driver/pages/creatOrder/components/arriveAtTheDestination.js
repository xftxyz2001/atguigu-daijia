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
const common_vendor = require("../../../common/vendor.js");
const api_order_index = require("../../../api/order/index.js");
require("../../../http/index.js");
require("../../../http/type.js");
require("../../../utils/storage.js");
require("../../../config/constant.js");
require("../../../store/modules/user.js");
require("../../../api/user/index.js");
if (!Array) {
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_modal2 = common_vendor.resolveComponent("tm-modal");
  (_easycom_loading_button2 + _easycom_tm_input2 + _easycom_tm_modal2)();
}
const _easycom_loading_button = () => "../../../components/loading-button/loading-button.js";
const _easycom_tm_input = () => "../../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_modal = () => "../../../tmui/components/tm-modal/tm-modal.js";
if (!Math) {
  (_easycom_loading_button + _easycom_tm_input + _easycom_tm_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "arriveAtTheDestination",
  props: {
    orderId: {
      type: Number,
      required: true
    },
    callBack: {
      type: Function,
      default: () => __async(exports, null, function* () {
      })
    }
  },
  setup(__props) {
    const props = __props;
    const formData = common_vendor.ref({
      tollFee: "",
      parkingFee: "",
      otherFee: ""
    });
    console.log("props--------", props);
    const resetFormDataHandle = () => {
      formData.value = {
        tollFee: "",
        parkingFee: "",
        otherFee: ""
      };
    };
    const okHandle = () => __async(this, null, function* () {
      console.log("formData", formData.value);
      yield api_order_index.endOrderServiceByDriver({
        orderId: props.orderId,
        tollFee: formData.value.tollFee || 0,
        parkingFee: formData.value.parkingFee || 0,
        otherFee: formData.value.otherFee || 0
      });
      props.callBack();
      yield common_vendor.index.redirectTo({
        url: `/pages/orderDetail/orderDetail?orderId=${props.orderId}`
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          block: true,
          ["click-fun"]: resetFormDataHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "到达乘客终点"
        }),
        b: common_vendor.o(($event) => common_vendor.unref(formData).tollFee = $event),
        c: common_vendor.p({
          prefix: "tmicon-renminbi3",
          type: "number",
          placeholder: "请输入路桥费",
          suffixLabel: "元",
          margin: [0, 0],
          modelValue: common_vendor.unref(formData).tollFee
        }),
        d: common_vendor.o(($event) => common_vendor.unref(formData).parkingFee = $event),
        e: common_vendor.p({
          prefix: "tmicon-renminbi3",
          type: "number",
          placeholder: "请输入停车费",
          suffixLabel: "元",
          margin: [0, 5],
          modelValue: common_vendor.unref(formData).parkingFee
        }),
        f: common_vendor.o(($event) => common_vendor.unref(formData).otherFee = $event),
        g: common_vendor.p({
          prefix: "tmicon-renminbi3",
          type: "number",
          placeholder: "请输入其他费用",
          suffixLabel: "元",
          margin: [0, 0],
          modelValue: common_vendor.unref(formData).otherFee
        }),
        h: common_vendor.o(okHandle),
        i: common_vendor.p({
          title: "额外费用"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/creatOrder/components/arriveAtTheDestination.vue"]]);
wx.createComponent(Component);
