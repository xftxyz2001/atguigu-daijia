"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  _easycom_tm_icon2();
}
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
if (!Math) {
  _easycom_tm_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paySuccess",
  props: {
    orderNo: {
      type: String,
      default: ""
    },
    orderId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const onTapReturn = (mode) => {
      console.log(mode);
      if (mode === 1) {
        common_vendor.index.redirectTo({
          url: `/pages/orderDetail/orderDetail?orderId=${props.orderId}`
        });
      } else {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["font-size"]: 150,
          name: "tmicon-check",
          color: "#47D368"
        }),
        b: common_vendor.o(($event) => onTapReturn(1)),
        c: common_vendor.o(($event) => onTapReturn(2))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-788a4eb2"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/pages/paySuccess/paySuccess.vue"]]);
wx.createPage(MiniProgramPage);
