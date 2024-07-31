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
const store_modules_takeCarInfo = require("../../store/modules/takeCarInfo.js");
const api_order_index = require("../../api/order/index.js");
const config_constEnums = require("../../config/constEnums.js");
require("../../common/assets.js");
require("../../class/TimerClass.js");
require("../../class/RecorderManagerClass.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
if (!Array) {
  const _easycom_theme_icon2 = common_vendor.resolveComponent("theme-icon");
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_theme_icon2 + _easycom_tm_cell2 + _easycom_uni_icons2 + _easycom_loading_button2 + _easycom_tm_sheet2 + _easycom_tm_app2)();
}
const _easycom_theme_icon = () => "../../components/theme-icon/theme-icon.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_loading_button = () => "../../components/loading-button/loading-button.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_theme_icon + _easycom_tm_cell + _easycom_uni_icons + _easycom_loading_button + _easycom_tm_sheet + ArriveAtTheDestination + _easycom_tm_app)();
}
const ArriveAtTheDestination = () => "./components/arriveAtTheDestination.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "creatOrder",
  props: {
    // 订单id
    orderId: {
      type: Number || String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const map = common_vendor.index.createMapContext("map");
    const driveMap = common_vendor.index.createMapContext("driveMap");
    const takeCarInfo = store_modules_takeCarInfo.useTakeCarInfoStore();
    function moveCurrentHandle() {
      map.moveToLocation(takeCarInfo.from);
      driveMap.moveToLocation(takeCarInfo.from);
    }
    function callPhoneHandle() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "114"
        //仅为示例
      });
      console.log("打电话callDriverPhoneHandle");
    }
    function reachTheStartingPointHandle() {
      return __async(this, null, function* () {
        console.log("到达乘客起点-reachTheStartingPointHandle");
        yield api_order_index.updateOrderStatusToDriverArrived(takeCarInfo.orderInfo.orderId);
      });
    }
    function inputCarInfoHandle() {
      console.log("录入车辆信息-inputCarInfoHandle");
      common_vendor.index.navigateTo({
        url: `/pages/collectCarInfo/collectCarInfo?orderId=${takeCarInfo.orderInfo.orderId}`
      });
    }
    function startServiceHandle() {
      return __async(this, null, function* () {
        console.log("开始服务-startServiceHandle");
        yield takeCarInfo.updateLocation(2);
        yield api_order_index.startOrderServiceByDriver(takeCarInfo.orderInfo.orderId);
      });
    }
    function reachTheEndingPointHandle() {
      console.log("到达乘客终点-reachTheEndingPointHandle");
      takeCarInfo.stopQueryOrderStatus();
      takeCarInfo.stopQuerySendRecord();
      common_vendor.index.redirectTo({
        url: `/pages/orderDetail/orderDetail?orderId=${takeCarInfo.orderInfo.orderId}`
      });
    }
    function openExternalMapHandle(params) {
      console.log("打开外部地图-openExternalMapHandle");
      common_vendor.wx$1.openLocation(__spreadProps(__spreadValues({}, params), {
        // latitude, //经度
        // longitude, //维度
        // name: '自提位置', // 位置名
        // address: '第十六届可能安防监控', // 要去的地址详情说明
        scale: 15,
        // 地图缩放级别,整形值,范围从1~28。默认为最大
        success: function(data) {
          console.log(data);
        },
        fail(res) {
          console.log(res);
        },
        complete() {
          common_vendor.wx$1.hideLoading();
        }
      }));
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
        common_vendor.index.getLocation({
          type: "gcj02",
          success: (res2) => __async(this, null, function* () {
            takeCarInfo.setCarFrom({
              address: "",
              longitude: res2.longitude,
              latitude: res2.latitude
              // longitude: 116.23128,
              // latitude: 40.22077
            });
            if (res.data.status === config_constEnums.OrderStatus.ACCEPTED) {
              console.log("司机位置->开始位置的地图");
              takeCarInfo.setCarTo({
                address: res.data.startLocation,
                longitude: res.data.startPointLongitude,
                latitude: res.data.startPointLatitude
              });
              yield takeCarInfo.driversPickUpPassengersRoutePlan();
            } else {
              console.log("出发位置->结束位置的地图");
              yield takeCarInfo.routePlan(2);
            }
          }),
          fail: (err) => {
            console.log("设置司机位置信息--getLocation", err);
          }
        });
      });
    }
    const queryOrderStatusParams = {
      WAITING_ACCEPT: () => {
        console.log("等待接单");
      },
      // 接单成功
      ACCEPTED: () => __async(this, null, function* () {
        console.log("接单成功");
      }),
      // 司机到达代驾位置
      DRIVER_ARRIVED: () => __async(this, null, function* () {
        console.log("司机已到达");
      }),
      // 更新车辆信息
      UPDATE_CART_INFO: () => {
        console.log("更新车辆信息");
      },
      // 开始服务
      START_SERVICE: () => {
        console.log("开始服务");
        takeCarInfo.querySendRecord();
      },
      // 结束服务
      END_SERVICE: () => {
        console.log("结束服务");
        reachTheEndingPointHandle();
      },
      //  代付款
      UNPAID: () => {
        reachTheEndingPointHandle();
        console.log("代付款");
      },
      // 已付款
      PAID: () => {
        console.log("已付款");
        reachTheEndingPointHandle();
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
    function reloadPageHandleByOrderId(orderId) {
      return __async(this, null, function* () {
        takeCarInfo.$reset();
        yield getOrderInfoHandleByOrderId(orderId);
        yield queryOrderStatusHandle();
      });
    }
    common_vendor.onLoad(() => {
      console.log("orderId", props.orderId);
      props.orderId && reloadPageHandleByOrderId(props.orderId);
    });
    common_vendor.onUnload(() => {
      takeCarInfo.stopQueryOrderStatus();
      takeCarInfo.stopQuerySendRecord();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      return common_vendor.e({
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditudingwei",
          size: "30"
        }),
        b: common_vendor.o(($event) => moveCurrentHandle()),
        c: ((_a = common_vendor.unref(takeCarInfo)) == null ? void 0 : _a.orderInfo.orderStatus) > common_vendor.unref(config_constEnums.OrderStatus).ACCEPTED,
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
        j: ((_b = common_vendor.unref(takeCarInfo)) == null ? void 0 : _b.orderInfo.orderStatus) <= common_vendor.unref(config_constEnums.OrderStatus).ACCEPTED,
        k: common_vendor.unref(takeCarInfo).carInfo.from.longitude,
        l: common_vendor.unref(takeCarInfo).carInfo.from.latitude,
        m: common_vendor.unref(takeCarInfo).carInfo.RouteInfo.polyline,
        n: common_vendor.unref(takeCarInfo).carInfo.RouteInfo.markers,
        o: ((_c = common_vendor.unref(takeCarInfo)) == null ? void 0 : _c.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).ACCEPTED
      }, ((_d = common_vendor.unref(takeCarInfo)) == null ? void 0 : _d.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).ACCEPTED ? {
        p: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.RouteInfo.distance),
        q: common_vendor.t(common_vendor.unref(takeCarInfo).carInfo.RouteInfo.duration),
        r: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        s: common_vendor.t(common_vendor.unref(takeCarInfo).from.address),
        t: common_vendor.o(($event) => openExternalMapHandle(common_vendor.unref(takeCarInfo).from)),
        v: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditu",
          size: "30"
        }),
        w: common_vendor.o(callPhoneHandle),
        x: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontdianhua",
          size: "30"
        }),
        y: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        z: common_vendor.p({
          block: true,
          ["click-fun"]: reachTheStartingPointHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "到达乘客起点"
        }),
        A: common_vendor.p({
          round: 3,
          shadow: 2
        })
      } : {}, {
        B: ((_e = common_vendor.unref(takeCarInfo)) == null ? void 0 : _e.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).DRIVER_ARRIVED
      }, ((_f = common_vendor.unref(takeCarInfo)) == null ? void 0 : _f.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).DRIVER_ARRIVED ? {
        C: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.distance),
        D: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.duration),
        E: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        F: common_vendor.t(common_vendor.unref(takeCarInfo).from.address),
        G: common_vendor.o(($event) => openExternalMapHandle(common_vendor.unref(takeCarInfo).from)),
        H: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditu",
          size: "30"
        }),
        I: common_vendor.o(callPhoneHandle),
        J: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontdianhua",
          size: "30"
        }),
        K: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        L: common_vendor.p({
          block: true,
          ["click-fun"]: inputCarInfoHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "录入车辆信息"
        }),
        M: common_vendor.p({
          round: 3,
          shadow: 2
        })
      } : {}, {
        N: ((_g = common_vendor.unref(takeCarInfo)) == null ? void 0 : _g.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).UPDATE_CART_INFO
      }, ((_h = common_vendor.unref(takeCarInfo)) == null ? void 0 : _h.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).UPDATE_CART_INFO ? {
        O: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.distance),
        P: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.duration),
        Q: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        R: common_vendor.t(common_vendor.unref(takeCarInfo).from.address),
        S: common_vendor.o(($event) => openExternalMapHandle(common_vendor.unref(takeCarInfo).from)),
        T: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditu",
          size: "30"
        }),
        U: common_vendor.o(callPhoneHandle),
        V: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontdianhua",
          size: "30"
        }),
        W: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        X: common_vendor.p({
          block: true,
          ["click-fun"]: startServiceHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "开始服务"
        }),
        Y: common_vendor.p({
          round: 3,
          shadow: 2
        })
      } : {}, {
        Z: ((_i = common_vendor.unref(takeCarInfo)) == null ? void 0 : _i.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).START_SERVICE
      }, ((_j = common_vendor.unref(takeCarInfo)) == null ? void 0 : _j.orderInfo.orderStatus) === common_vendor.unref(config_constEnums.OrderStatus).START_SERVICE ? {
        aa: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.distance),
        ab: common_vendor.t(common_vendor.unref(takeCarInfo).RouteInfo.duration),
        ac: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        ad: common_vendor.t(common_vendor.unref(takeCarInfo).to.address),
        ae: common_vendor.o(($event) => openExternalMapHandle(common_vendor.unref(takeCarInfo).to)),
        af: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditu",
          size: "30"
        }),
        ag: common_vendor.o(callPhoneHandle),
        ah: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontdianhua",
          size: "30"
        }),
        ai: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30
        }),
        aj: common_vendor.p({
          ["order-id"]: __props.orderId,
          callBack: reachTheEndingPointHandle
        }),
        ak: common_vendor.p({
          round: 3,
          shadow: 2
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-967b50c2"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/creatOrder/creatOrder.vue"]]);
wx.createPage(MiniProgramPage);
