"use strict";
var __defProp = Object.defineProperty;
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
const store_modules_takeCarInfo = require("../../store/modules/takeCarInfo.js");
const hooks_useTimeIncrease = require("../../hooks/useTimeIncrease.js");
const api_order_index = require("../../api/order/index.js");
const config_constEnums = require("../../config/constEnums.js");
require("../../common/assets.js");
require("../../class/timerClass.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
if (!Array) {
  const _easycom_theme_icon2 = common_vendor.resolveComponent("theme-icon");
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_avatar2 = common_vendor.resolveComponent("tm-avatar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_theme_icon2 + _easycom_loading_button2 + _easycom_tm_sheet2 + _easycom_tm_avatar2 + _easycom_uni_icons2 + _easycom_tm_cell2 + _easycom_tm_app2)();
}
const _easycom_theme_icon = () => "../../components/theme-icon/theme-icon.js";
const _easycom_loading_button = () => "../../components/loading-button/loading-button.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_avatar = () => "../../tmui/components/tm-avatar/tm-avatar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_theme_icon + _easycom_loading_button + _easycom_tm_sheet + _easycom_tm_avatar + _easycom_uni_icons + _easycom_tm_cell + tmDrawer + _easycom_tm_app)();
}
const tmDrawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "creatOrder",
  setup(__props) {
    const map = common_vendor.index.createMapContext("map");
    const driveMap = common_vendor.index.createMapContext("driveMap");
    const takeCarInfo = store_modules_takeCarInfo.useTakeCarInfoStore();
    const showDriversPickUpPassengersRoutePlan = common_vendor.ref(false);
    const isHaveReceiveOrders = common_vendor.ref(false);
    function moveCurrentHandle() {
      map.moveToLocation(takeCarInfo.from);
      driveMap.moveToLocation(takeCarInfo.carInfo.from);
    }
    common_vendor.ref(null);
    const timeIncrease = hooks_useTimeIncrease.useTimeIncrease({
      duration: 15 * 60 * 1e3,
      callback: () => {
        console.log("时间到了");
        cancelGetOrderHandle();
      },
      startSeconds: 0
    });
    function callTaxiHandle() {
      return __async(this, null, function* () {
        console.log("呼叫代驾callTaxiHandle");
        yield takeCarInfo.submitOrderHandle();
        openPopupHandle();
        timeIncrease.start();
        yield queryOrderStatusHandle();
      });
    }
    const queryOrderStatusParams = {
      WAITING_ACCEPT: () => {
        console.log("等待接单");
      },
      // 接单成功
      ACCEPTED: () => __async(this, null, function* () {
        showDriversPickUpPassengersRoutePlan.value = true;
        isHaveReceiveOrders.value = true;
        closePopupHandle();
        yield takeCarInfo.getDriverInfoHandle();
        yield takeCarInfo.queryCarLocationToStartPosition(() => {
          console.log("getCarLocationHandle:", takeCarInfo.carInfo.RouteInfo.markers);
        });
      }),
      // 司机到达代驾位置
      DRIVER_ARRIVED: () => __async(this, null, function* () {
        takeCarInfo.stopQueryCarLocationToStartPosition();
        console.log("司机已到达");
        showDriversPickUpPassengersRoutePlan.value = false;
        takeCarInfo.queryCarLocationToEndPosition(() => {
          console.log("queryCarLocationToEndPosition:", takeCarInfo.RouteInfo.markers);
        });
      }),
      // 更新车辆信息
      UPDATE_CART_INFO: () => {
        console.log("更新车辆信息");
      },
      // 开始服务
      START_SERVICE: () => {
        showDriversPickUpPassengersRoutePlan.value = false;
        takeCarInfo.queryCarLocationToEndPosition(() => {
          console.log("queryCarLocationToEndPosition:", takeCarInfo.RouteInfo.markers);
        });
        console.log("开始服务");
      },
      // 结束服务
      END_SERVICE: () => {
        takeCarInfo.stopQueryCarLocationToEndPosition();
        console.log("结束服务");
      },
      //  代付款
      UNPAID: () => {
        takeCarInfo.stopQueryOrderStatus();
        common_vendor.index.redirectTo({
          url: `/pages/orderDetail/orderDetail?orderId=${takeCarInfo.orderInfo.orderId}`
        });
        takeCarInfo.$reset();
        console.log("takeCarInfo", takeCarInfo);
        console.log("代付款");
      },
      // 已付款
      PAID: () => {
        console.log("已付款");
      },
      // 取消订单
      CANCEL_ORDER: () => {
        console.log("取消订单");
      }
    };
    function queryOrderStatusHandle() {
      return __async(this, null, function* () {
        yield takeCarInfo.queryOrderStatus(__spreadValues({}, queryOrderStatusParams));
      });
    }
    function cancelGetOrderHandle() {
      console.log("取消订单cancelOrderHandle");
      closePopupHandle();
      timeIncrease.stopAndReset();
      showDriversPickUpPassengersRoutePlan.value = false;
      takeCarInfo.stopQueryOrderStatus();
      api_order_index.customerCancelNoAcceptOrder(takeCarInfo.orderInfo.orderId);
    }
    const popRef = common_vendor.ref();
    function openPopupHandle() {
      var _a;
      (_a = popRef.value) == null ? void 0 : _a.open();
      console.log("打开弹出层openPopupHandle");
    }
    function closePopupHandle() {
      var _a;
      (_a = popRef.value) == null ? void 0 : _a.close();
      console.log("关闭弹出层closePopupHandle");
    }
    function cancelOrderHandle() {
      isHaveReceiveOrders.value = false;
      takeCarInfo.stopQueryCarLocationToStartPosition();
      console.log("取消订单cancelOrderHandle");
    }
    function callDriverPhoneHandle() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "114"
        //仅为示例
      });
      console.log("打电话callDriverPhoneHandle");
    }
    function getOrderInfoHandleByOrderId(orderId) {
      return __async(this, null, function* () {
        const res = yield api_order_index.getOrderDetail(orderId);
        res.data.driverInfoVo && takeCarInfo.setCarDriverInfo(res.data.driverInfoVo);
        res.data.orderId && takeCarInfo.setOrderId(res.data.orderId);
        takeCarInfo.setFrom({
          address: res.data.startLocation,
          longitude: res.data.startPointLongitude,
          latitude: res.data.startPointLatitude
        });
        takeCarInfo.setTo({
          address: res.data.endLocation,
          longitude: res.data.endPointLongitude,
          latitude: res.data.endPointLatitude
        });
        takeCarInfo.setOrderStatus(res.data.status);
        if (res.data.status < config_constEnums.OrderStatus.ACCEPTED) {
          showDriversPickUpPassengersRoutePlan.value = false;
          isHaveReceiveOrders.value = false;
          openPopupHandle();
          timeIncrease.stopAndReset();
          timeIncrease.setStartTime(Math.floor(((/* @__PURE__ */ new Date()).getTime() - new Date(res.data.createTime).getTime()) / 1e3));
          timeIncrease.start();
        } else if (res.data.status < config_constEnums.OrderStatus.START_SERVICE) {
          showDriversPickUpPassengersRoutePlan.value = true;
          isHaveReceiveOrders.value = true;
          closePopupHandle();
          yield takeCarInfo.getDriverInfoHandle();
          yield takeCarInfo.queryCarLocationToStartPosition(() => {
            console.log("getCarLocationHandle:", takeCarInfo.carInfo.RouteInfo.markers);
          });
        } else {
          showDriversPickUpPassengersRoutePlan.value = false;
          isHaveReceiveOrders.value = true;
        }
        console.log("showDriversPickUpPassengersRoutePlan", showDriversPickUpPassengersRoutePlan);
        console.log("isHaveReceiveOrders", isHaveReceiveOrders);
        yield queryOrderStatusHandle();
      });
    }
    function reloadPageHandleByOrderId(orderId) {
      return __async(this, null, function* () {
        takeCarInfo.stopQueryOrderStatus();
        takeCarInfo.stopQueryCarLocationToEndPosition();
        takeCarInfo.stopQueryCarLocationToStartPosition();
        takeCarInfo.$reset();
        yield getOrderInfoHandleByOrderId(orderId);
      });
    }
    common_vendor.onLoad((options) => __async(this, null, function* () {
      console.log("options", options);
      if (options == null ? void 0 : options.orderId) {
        yield reloadPageHandleByOrderId(options == null ? void 0 : options.orderId);
      }
      yield takeCarInfo.routePlan();
    }));
    common_vendor.onUnload(() => {
      timeIncrease.stopAndReset();
      takeCarInfo.stopQueryOrderStatus();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditudingwei",
          size: "30"
        }),
        b: common_vendor.o(($event) => moveCurrentHandle()),
        c: !showDriversPickUpPassengersRoutePlan.value,
        d: common_vendor.unref(takeCarInfo).from.longitude,
        e: common_vendor.unref(takeCarInfo).from.latitude,
        f: common_vendor.unref(takeCarInfo).RouteInfo.polyline,
        g: common_vendor.unref(takeCarInfo).RouteInfo.markers,
        h: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditudingwei",
          size: "30"
        }),
        i: common_vendor.o(($event) => moveCurrentHandle()),
        j: showDriversPickUpPassengersRoutePlan.value,
        k: common_vendor.unref(takeCarInfo).carInfo.from.longitude,
        l: common_vendor.unref(takeCarInfo).carInfo.from.latitude,
        m: common_vendor.unref(takeCarInfo).carInfo.RouteInfo.polyline,
        n: common_vendor.unref(takeCarInfo).carInfo.RouteInfo.markers,
        o: !isHaveReceiveOrders.value
      }, !isHaveReceiveOrders.value ? {
        p: common_vendor.t((_a = common_vendor.unref(takeCarInfo)) == null ? void 0 : _a.RouteInfo.distance),
        q: common_vendor.t((_b = common_vendor.unref(takeCarInfo)) == null ? void 0 : _b.RouteInfo.duration),
        r: common_vendor.t((_c = common_vendor.unref(takeCarInfo)) == null ? void 0 : _c.RouteInfo.totalAmount),
        s: common_vendor.p({
          block: true,
          ["click-fun"]: callTaxiHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "呼叫代驾"
        }),
        t: common_vendor.p({
          round: 3,
          shadow: 2
        })
      } : {}, {
        v: isHaveReceiveOrders.value
      }, isHaveReceiveOrders.value ? common_vendor.e({
        w: common_vendor.p({
          size: 150,
          round: 26,
          img: common_vendor.unref(takeCarInfo).carInfo.driverInfo.avatarUrl
        }),
        x: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.driverInfo.name),
        y: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.driverInfo.driverLicenseAge),
        z: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontdianhua",
          size: "30"
        }),
        A: common_vendor.o(callDriverPhoneHandle),
        B: ((_d = common_vendor.unref(takeCarInfo)) == null ? void 0 : _d.orderInfo.orderStatus) < common_vendor.unref(config_constEnums.OrderStatus).DRIVER_ARRIVED
      }, ((_e = common_vendor.unref(takeCarInfo)) == null ? void 0 : _e.orderInfo.orderStatus) < common_vendor.unref(config_constEnums.OrderStatus).DRIVER_ARRIVED ? {
        C: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.RouteInfo.distance),
        D: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.RouteInfo.duration),
        E: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        })
      } : {
        F: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.distance),
        G: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.duration),
        H: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        })
      }, {
        I: common_vendor.p({
          block: true,
          disabled: true,
          ["click-fun"]: cancelOrderHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "取消订单"
        }),
        J: common_vendor.p({
          round: 3,
          shadow: 2
        })
      }) : {}, {
        K: common_vendor.t(`${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.hours}:${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.minutes}:${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.seconds}`),
        L: common_vendor.p({
          width: 500,
          ["click-fun"]: cancelGetOrderHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "取消接单"
        }),
        M: common_vendor.sr(popRef, "967b50c2-11,967b50c2-0", {
          "k": "popRef"
        }),
        N: common_vendor.p({
          width: 300,
          height: 700,
          hideHeader: true,
          overlayClick: false,
          placement: "bottom"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-967b50c2"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/pages/creatOrder/creatOrder.vue"]]);
wx.createPage(MiniProgramPage);
