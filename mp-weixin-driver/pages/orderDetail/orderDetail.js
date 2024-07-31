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
const config_constEnums = require("../../config/constEnums.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
if (!Array) {
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_divider2 + _easycom_tm_cell2 + _easycom_tm_text2 + _easycom_tm_sheet2 + _easycom_loading_button2 + _easycom_tm_app2)();
}
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_loading_button = () => "../../components/loading-button/loading-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_divider + _easycom_tm_cell + _easycom_tm_text + _easycom_tm_sheet + _easycom_loading_button + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const descriptionsList = common_vendor.ref([]);
    const profitShareList = common_vendor.ref([]);
    const orderDetail = common_vendor.ref({});
    const getOrderDetailHandle = (id) => __async(this, null, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const res = yield api_order_index.getOrderDetail(id);
      orderDetail.value = res.data;
      descriptionsList.value = [
        { label: "里程费", value: ((_a = res.data.orderBillVo) == null ? void 0 : _a.distanceFee) || 0 },
        { label: "等时费用", value: ((_b = res.data.orderBillVo) == null ? void 0 : _b.waitFee) || 0 },
        { label: "路桥费", value: ((_c = res.data.orderBillVo) == null ? void 0 : _c.tollFee) || 0 },
        { label: "停车费", value: ((_d = res.data.orderBillVo) == null ? void 0 : _d.parkingFee) || 0 },
        { label: "其他费用", value: ((_e = res.data.orderBillVo) == null ? void 0 : _e.otherFee) || 0 },
        { label: "远程费", value: ((_f = res.data.orderBillVo) == null ? void 0 : _f.longDistanceFee) || 0 },
        { label: "顾客好处费", value: ((_g = res.data.orderBillVo) == null ? void 0 : _g.favourFee) || 0 },
        { label: "系统奖励费", value: ((_h = res.data.orderBillVo) == null ? void 0 : _h.rewardFee) || 0 },
        { label: "总费用", value: ((_i = res.data.orderBillVo) == null ? void 0 : _i.totalAmount) || 0 },
        { label: "优惠券金额", value: -((_j = res.data.orderBillVo) == null ? void 0 : _j.couponAmount) || 0 },
        { label: "应收总费用", value: ((_k = res.data.orderBillVo) == null ? void 0 : _k.payAmount) || 0 }
      ];
      profitShareList.value = [
        { label: "分账状态", value: ((_l = res.data.orderProfitsharingVo) == null ? void 0 : _l.status) === 1 ? "未分账" : "已分账" },
        { label: "微信平台费用", value: (((_m = res.data.orderProfitsharingVo) == null ? void 0 : _m.paymentFee) || 0) + "元" },
        { label: "代缴税费", value: (((_n = res.data.orderProfitsharingVo) == null ? void 0 : _n.driverTaxFee) || 0) + "元" },
        { label: "平台分账收入", value: (((_o = res.data.orderProfitsharingVo) == null ? void 0 : _o.platformIncome) || 0) + "元" },
        { label: "司机分账收入", value: (((_p = res.data.orderProfitsharingVo) == null ? void 0 : _p.driverIncome) || 0) + "元" }
      ];
    });
    const handleReturn = () => __async(this, null, function* () {
      yield common_vendor.index.navigateBack();
    });
    const pushOrderHandle = () => __async(this, null, function* () {
      console.log("pushOrderHandle--");
      yield api_order_index.sendOrderBillInfo(props.orderId);
      yield common_vendor.index.showToast({
        title: "推送账单成功",
        icon: "success",
        duration: 2e3
      });
    });
    function collectMoney() {
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "收款成功",
          icon: "success",
          duration: 2e3
        });
      }, 200);
      console.log("收款成功");
    }
    const queryOrderPayStatusFlag = common_vendor.ref(true);
    function queryOrderPayStatusHandle(orderId, times = 100, interval = 2e3, callback = () => collectMoney()) {
      return __async(this, null, function* () {
        if (!queryOrderPayStatusFlag.value)
          return;
        try {
          console.log("轮询查询订单支付状态---start");
          const res = yield api_order_index.getOrderStatus(orderId);
          orderDetail.value.status = res.data;
          if (res.data === config_constEnums.OrderStatus.PAID) {
            callback();
          } else {
            if (times > 1) {
              console.log("查询收款信息失败，继续查询-----------", times);
              setTimeout(() => {
                queryOrderPayStatusHandle(orderId, times - 1, interval);
              }, interval);
            } else {
              yield common_vendor.index.showToast({
                title: "查询收款信息失败",
                icon: "error",
                duration: 2e3
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    function stopQueryOrderStatus() {
      return __async(this, null, function* () {
        queryOrderPayStatusFlag.value = false;
      });
    }
    common_vendor.onLoad(() => __async(this, null, function* () {
      console.log("props.orderId----", props == null ? void 0 : props.orderId);
      (props == null ? void 0 : props.orderId) && (yield getOrderDetailHandle(props == null ? void 0 : props.orderId));
      queryOrderPayStatusFlag.value = true;
      orderDetail.value.status < config_constEnums.OrderStatus.PAID && (yield queryOrderPayStatusHandle(props == null ? void 0 : props.orderId));
    }));
    common_vendor.onUnload(() => {
      stopQueryOrderStatus();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderDetail).orderBillVo
      }, common_vendor.unref(orderDetail).orderBillVo ? common_vendor.e({
        b: common_vendor.t(common_vendor.unref(config_constEnums.getLabelByValue)(common_vendor.unref(config_constEnums.OrderStatusMap), common_vendor.unref(orderDetail).status)),
        c: common_vendor.t(common_vendor.unref(orderDetail).startLocation),
        d: common_vendor.t("出发地"),
        e: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        f: common_vendor.t(common_vendor.unref(orderDetail).endLocation),
        g: common_vendor.t("目的地"),
        h: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        i: common_vendor.p({
          color: "grey",
          label: common_vendor.unref(orderDetail).createTime
        }),
        j: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        k: common_vendor.f(common_vendor.unref(descriptionsList).slice(0, common_vendor.unref(descriptionsList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        l: common_vendor.f(common_vendor.unref(descriptionsList).slice(common_vendor.unref(descriptionsList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        m: common_vendor.f(common_vendor.unref(profitShareList).slice(0, common_vendor.unref(profitShareList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        n: common_vendor.f(common_vendor.unref(profitShareList).slice(common_vendor.unref(profitShareList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        o: common_vendor.p({
          color: "red",
          ["click-fun"]: handleReturn,
          margin: [10],
          fontSize: 35,
          shadow: 0,
          size: "middle",
          label: "返回"
        }),
        p: common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).END_SERVICE
      }, common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).END_SERVICE ? {
        q: common_vendor.p({
          color: "red",
          ["click-fun"]: pushOrderHandle,
          margin: [10],
          fontSize: 35,
          shadow: 0,
          size: "middle",
          label: "推送账单"
        })
      } : {}) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d945b00"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
