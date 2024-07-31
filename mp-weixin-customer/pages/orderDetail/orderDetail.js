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
const store_modules_pay = require("../../store/modules/pay.js");
const config_constEnums = require("../../config/constEnums.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
require("../../api/pay/index.js");
if (!Array) {
  const _easycom_tm_avatar2 = common_vendor.resolveComponent("tm-avatar");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_checkbox2 = common_vendor.resolveComponent("tm-checkbox");
  const _easycom_tm_coupon2 = common_vendor.resolveComponent("tm-coupon");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_avatar2 + _easycom_tm_divider2 + _easycom_tm_cell2 + _easycom_tm_text2 + _easycom_tm_sheet2 + _easycom_tm_checkbox2 + _easycom_tm_coupon2 + _easycom_tm_drawer2 + _easycom_loading_button2 + _easycom_tm_app2)();
}
const _easycom_tm_avatar = () => "../../tmui/components/tm-avatar/tm-avatar.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_checkbox = () => "../../tmui/components/tm-checkbox/tm-checkbox.js";
const _easycom_tm_coupon = () => "../../tmui/components/tm-coupon/tm-coupon.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _easycom_loading_button = () => "../../components/loading-button/loading-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_avatar + _easycom_tm_divider + _easycom_tm_cell + _easycom_tm_text + _easycom_tm_sheet + _easycom_tm_checkbox + _easycom_tm_coupon + _easycom_tm_drawer + _easycom_loading_button + _easycom_tm_app)();
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
    const payStore = store_modules_pay.usePayStore();
    const descriptionsList = common_vendor.ref([]);
    const orderDetail = common_vendor.ref({});
    const getOrderDetailHandle = (id) => __async(this, null, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
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
        { label: "优惠券金额", value: -((_i = res.data.orderBillVo) == null ? void 0 : _i.couponAmount) || 0 },
        { label: "总费用", value: ((_j = res.data.orderBillVo) == null ? void 0 : _j.totalAmount) || 0 },
        { label: "应付费用", value: ((_k = res.data.orderBillVo) == null ? void 0 : _k.payAmount) || 0 }
      ];
    });
    const handleReturn = () => __async(this, null, function* () {
      yield common_vendor.index.navigateBack();
    });
    const handlePay = () => {
      var _a;
      payStore.submitOrder({
        orderId: orderDetail.value.orderId,
        orderNo: orderDetail.value.orderNo,
        customerCouponId: ((_a = currentCoupon.value) == null ? void 0 : _a.customerCouponId) || 0
      });
    };
    const couponList = common_vendor.ref([]);
    const currentCoupon = common_vendor.ref({});
    function getBestCouponHandle() {
      return __async(this, null, function* () {
        if (couponList.value.length)
          return;
        const res = yield api_order_index.getBestCoupon(orderDetail.value.orderId);
        couponList.value = res.data.map((item) => __spreadProps(__spreadValues({}, item), { isCheck: false }));
      });
    }
    function checkedCoupon(item) {
      currentCoupon.value = item.isCheck ? {} : item;
      couponList.value.forEach((item2) => {
        if (item2.customerCouponId !== item.customerCouponId) {
          item2.isCheck = false;
        }
      });
    }
    common_vendor.onLoad(() => {
      console.log("props.orderId", props == null ? void 0 : props.orderId);
      (props == null ? void 0 : props.orderId) && getOrderDetailHandle(props == null ? void 0 : props.orderId);
    });
    common_vendor.onUnload(() => {
      payStore.stopQueryOrderStatus();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: common_vendor.unref(orderDetail).driverInfoVo
      }, common_vendor.unref(orderDetail).driverInfoVo ? common_vendor.e({
        b: common_vendor.p({
          size: 170,
          round: 26,
          img: common_vendor.unref(orderDetail).driverInfoVo.avatarUrl
        }),
        c: common_vendor.t(common_vendor.unref(orderDetail).driverInfoVo.name),
        d: common_vendor.t(common_vendor.unref(orderDetail).driverInfoVo.driverLicenseAge),
        e: common_vendor.t(common_vendor.unref(orderDetail).startLocation),
        f: common_vendor.t("出发地"),
        g: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        h: common_vendor.t(common_vendor.unref(orderDetail).endLocation),
        i: common_vendor.t("目的地"),
        j: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        k: common_vendor.p({
          color: "grey",
          label: common_vendor.unref(orderDetail).createTime
        }),
        l: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        m: common_vendor.f(common_vendor.unref(descriptionsList).slice(0, common_vendor.unref(descriptionsList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        n: common_vendor.f(common_vendor.unref(descriptionsList).slice(common_vendor.unref(descriptionsList).length - 1), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        o: common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).UNPAID && !((_a = common_vendor.unref(orderDetail).orderBillVo) == null ? void 0 : _a.couponAmount)
      }, common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).UNPAID && !((_b = common_vendor.unref(orderDetail).orderBillVo) == null ? void 0 : _b.couponAmount) ? {
        p: common_vendor.f(common_vendor.unref(couponList), (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => checkedCoupon(item), item.id),
            b: "2d945b00-12-" + i0 + "," + ("2d945b00-11-" + i0),
            c: common_vendor.o(($event) => item.isCheck = $event, item.id),
            d: common_vendor.p({
              color: "pink",
              round: 24,
              modelValue: item.isCheck
            }),
            e: "2d945b00-13-" + i0 + "," + ("2d945b00-11-" + i0),
            f: common_vendor.p({
              ["font-size"]: 22,
              _class: "opacity-7",
              label: item.description
            }),
            g: "2d945b00-11-" + i0 + ",2d945b00-10",
            h: common_vendor.p({
              priceDetail: {
                price: item.couponType === 1 ? item.amount : item.discount.toFixed(0),
                //价格金额
                suffix: item.couponType === 1 ? "元" : "折",
                //后缀文本
                prefix: "",
                //前缀文本
                subtext: ""
                //小文本
              },
              rightDetail: {
                title: item.couponType === 1 ? item.amount + "元" : item.discount.toFixed(0) + "折",
                //标题
                subtitle: item.name,
                //副标题
                time: item.expireTime
                //有效期时间文本
              },
              color: "pink",
              linear: "right",
              ["linear-deep"]: "accent",
              mainColor: "yellow",
              ["font-color"]: "",
              extra: true
            }),
            i: item.id
          };
        }),
        q: common_vendor.o(getBestCouponHandle),
        r: common_vendor.p({
          round: 3,
          margin: [0, 0, 0, 16],
          rightText: ((_c = common_vendor.unref(currentCoupon)) == null ? void 0 : _c.name) || "待选择",
          titleFontSize: 30,
          title: "选择优惠券"
        }),
        s: common_vendor.p({
          padding: [0, 5, 0, 0]
        })
      } : {}, {
        t: common_vendor.p({
          color: "red",
          ["click-fun"]: handleReturn,
          margin: [10],
          fontSize: 35,
          shadow: 0,
          size: "middle",
          label: "返回"
        }),
        v: common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).UNPAID
      }, common_vendor.unref(orderDetail).status === common_vendor.unref(config_constEnums.OrderStatus).UNPAID ? {
        w: common_vendor.p({
          color: "red",
          ["click-fun"]: handlePay,
          margin: [10],
          fontSize: 35,
          shadow: 0,
          size: "middle",
          label: "支付"
        })
      } : {}) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d945b00"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/pages/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
