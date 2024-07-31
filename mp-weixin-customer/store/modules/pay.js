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
const api_pay_index = require("../../api/pay/index.js");
const usePayStore = common_vendor.defineStore("app-pay", {
  state: () => {
    return {
      orderNo: "",
      orderId: "",
      customerCouponId: "",
      queryOrderPayStatusFlag: true
    };
  },
  actions: {
    // 提交订单
    submitOrder(params) {
      return __async(this, null, function* () {
        this.orderNo = params.orderNo;
        this.orderId = params.orderId;
        this.customerCouponId = (params == null ? void 0 : params.customerCouponId) || 0;
        try {
          yield this.wechatPay(params);
          this.queryOrderPayStatusFlag = true;
          yield this.queryOrderPayStatus(this.orderNo);
        } catch (error) {
          console.log(error);
        }
      });
    },
    // 微信支付逻辑
    wechatPay(params) {
      return __async(this, null, function* () {
        const res = yield api_pay_index.wechatPay(params);
        yield this.wechatOfficialPay(res.data);
      });
    },
    // 微信官方支付接口
    wechatOfficialPay(params) {
      return __async(this, null, function* () {
        const wxPayParams = {
          appId: params.appId,
          timeStamp: params.timeStamp,
          nonceStr: params.nonceStr,
          package: params.packageVal,
          signType: params.signType,
          paySign: params.paySign,
          success: () => {
            console.log("支付成功");
          },
          fail: (err) => {
            console.log("支付失败", err);
          }
        };
        console.log("wxPayParams", wxPayParams);
        try {
          console.log("微信官方支付接口---start");
          common_vendor.wx$1.requestPayment(wxPayParams);
        } catch (err) {
          console.log("err", err);
        }
      });
    },
    // 查询订单支付状态
    queryOrderPayStatus(orderNo, times = 100, interval = 2e3, callback = () => this.paySuccess()) {
      return __async(this, null, function* () {
        if (!this.queryOrderPayStatusFlag)
          return;
        try {
          console.log("轮询查询订单支付状态---start");
          const res = yield api_pay_index.queryOrderPayStatus(orderNo);
          if (res.data) {
            callback();
          } else {
            if (times > 1) {
              console.log("查询支付信息失败，继续查询-----------", times);
              setTimeout(() => {
                this.queryOrderPayStatus(orderNo, times - 1, interval);
              }, interval);
            } else {
              common_vendor.index.showToast({
                title: "查询支付信息失败",
                icon: "error",
                duration: 2e3
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    // 停止查询
    stopQueryOrderStatus() {
      return __async(this, null, function* () {
        this.queryOrderPayStatusFlag = false;
      });
    },
    // 支付成功
    paySuccess() {
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "success",
          duration: 2e3
        });
      }, 200);
      console.log("去往支付成功页面");
      common_vendor.index.redirectTo({
        url: `/pages/paySuccess/paySuccess?orderNo=${this.orderNo}&orderId=${this.orderId}`
      });
      this.clearOrderInfo();
    },
    // 清空相关订单信息
    clearOrderInfo() {
      this.orderNo = "";
    }
  }
});
exports.usePayStore = usePayStore;
