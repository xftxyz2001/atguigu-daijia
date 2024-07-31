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
const hooks_useTheme = require("../../hooks/useTheme.js");
const api_order_index = require("../../api/order/index.js");
require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
require("../../store/modules/tabBarNav.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
if (!Array) {
  const _easycom_tm_segtab2 = common_vendor.resolveComponent("tm-segtab");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_coupon2 = common_vendor.resolveComponent("tm-coupon");
  const _easycom_tm_scrolly2 = common_vendor.resolveComponent("tm-scrolly");
  const _easycom_tabbar_nav2 = common_vendor.resolveComponent("tabbar-nav");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_segtab2 + _easycom_tm_text2 + _easycom_tm_coupon2 + _easycom_tm_scrolly2 + _easycom_tabbar_nav2 + _easycom_tm_app2)();
}
const _easycom_tm_segtab = () => "../../tmui/components/tm-segtab/tm-segtab.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_coupon = () => "../../tmui/components/tm-coupon/tm-coupon.js";
const _easycom_tm_scrolly = () => "../../tmui/components/tm-scrolly/tm-scrolly.js";
const _easycom_tabbar_nav = () => "../../components/tabbar-nav/tabbar-nav.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_segtab + _easycom_tm_text + _easycom_tm_coupon + _easycom_tm_scrolly + _easycom_tabbar_nav + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "coupon",
  setup(__props) {
    const { themeColor } = hooks_useTheme.useTheme();
    const currentIndex = common_vendor.ref(0);
    const navList = common_vendor.ref([
      {
        id: 0,
        text: "未使用"
      },
      {
        id: 1,
        text: "未领取"
      },
      {
        id: 2,
        text: "已使用"
      }
    ]);
    function itemClick(item) {
      return __async(this, null, function* () {
        if (currentIndex.value === 0) {
          yield common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        } else if (currentIndex.value === 1) {
          yield api_order_index.receiveCoupon(item.id);
          yield common_vendor.index.showToast({
            title: "领取成功",
            icon: "none"
          });
          noReceiveCouponList.value = noReceiveCouponList.value.filter((coupon) => coupon.id !== item.id);
        } else if (currentIndex.value === 2)
          ;
      });
    }
    const refreshStatus = common_vendor.ref(false);
    const refreshBottomStatus = common_vendor.ref(false);
    function refresh() {
      return __async(this, null, function* () {
        refreshStatus.value = true;
        console.log("下拉刷新");
        if (currentIndex.value === 0) {
          noUseCouponPageInfo.value.page = 1;
          yield findCustomerCouponExpiredPageHandle();
        } else if (currentIndex.value === 1) {
          noReceivePageInfo.value.page = 1;
          yield findCustomerCouponNotReceivePageHandle();
        } else if (currentIndex.value === 2) {
          usedPageInfo.value.page = 1;
          yield findCustomerCouponUsedPageHandle();
        }
        refreshStatus.value = false;
      });
    }
    function refreshBottom() {
      return __async(this, null, function* () {
        console.log("上拉加载");
        refreshBottomStatus.value = true;
        if (currentIndex.value === 0) {
          if (noUseCouponPageInfo.value.page >= noUseCouponPageInfo.value.pages) {
            refreshBottomStatus.value = false;
            return;
          }
          noUseCouponPageInfo.value.page++;
          yield findCustomerCouponExpiredPageHandle();
        } else if (currentIndex.value === 1) {
          if (noReceivePageInfo.value.page >= noReceivePageInfo.value.pages) {
            refreshBottomStatus.value = false;
            return;
          }
          noReceivePageInfo.value.page++;
          yield findCustomerCouponNotReceivePageHandle();
        } else if (currentIndex.value === 2) {
          if (usedPageInfo.value.page >= usedPageInfo.value.pages) {
            refreshBottomStatus.value = false;
            return;
          }
          usedPageInfo.value.page++;
          yield findCustomerCouponUsedPageHandle();
        }
        refreshBottomStatus.value = false;
      });
    }
    const noUseCouponList = common_vendor.ref([]);
    const noUseCouponPageInfo = common_vendor.ref({
      page: 1,
      limit: 10,
      pages: 0,
      total: 0
    });
    function findCustomerCouponExpiredPageHandle() {
      return __async(this, null, function* () {
        const res = yield api_order_index.findCustomerCouponExpiredPage(noUseCouponPageInfo.value);
        noUseCouponPageInfo.value = {
          page: res.data.page,
          limit: res.data.limit,
          pages: res.data.pages,
          total: res.data.total
        };
        if (res.data.page === 1) {
          noUseCouponList.value = res.data.records;
        } else {
          noUseCouponList.value = [...noUseCouponList.value, ...res.data.records];
        }
      });
    }
    const noReceiveCouponList = common_vendor.ref([]);
    const noReceivePageInfo = common_vendor.ref({
      page: 1,
      limit: 10,
      pages: 0,
      total: 0
    });
    function findCustomerCouponNotReceivePageHandle() {
      return __async(this, null, function* () {
        const res = yield api_order_index.findCustomerCouponNotReceivePage(noUseCouponPageInfo.value);
        noReceivePageInfo.value = {
          page: res.data.page,
          limit: res.data.limit,
          pages: res.data.pages,
          total: res.data.total
        };
        if (res.data.page === 1) {
          noReceiveCouponList.value = res.data.records;
        } else {
          noReceiveCouponList.value = [...noReceiveCouponList.value, ...res.data.records];
        }
      });
    }
    const usedCouponList = common_vendor.ref([]);
    const usedPageInfo = common_vendor.ref({
      page: 1,
      limit: 10,
      pages: 0,
      total: 0
    });
    function findCustomerCouponUsedPageHandle() {
      return __async(this, null, function* () {
        const res = yield api_order_index.findCustomerCouponUsedPage(noUseCouponPageInfo.value);
        usedPageInfo.value = {
          page: res.data.page,
          limit: res.data.limit,
          pages: res.data.pages,
          total: res.data.total
        };
        if (res.data.page === 1) {
          usedCouponList.value = res.data.records;
        } else {
          usedCouponList.value = [...usedCouponList.value, ...res.data.records];
        }
      });
    }
    common_vendor.watch(
      currentIndex,
      (val) => __async(this, null, function* () {
        var _a, _b, _c;
        if (val === 0) {
          if (!((_a = noUseCouponList == null ? void 0 : noUseCouponList.value) == null ? void 0 : _a.length) || noUseCouponPageInfo.value.page === 1) {
            noUseCouponPageInfo.value.page = 1;
            yield findCustomerCouponExpiredPageHandle();
          }
        } else if (val === 1) {
          if (!((_b = noReceiveCouponList == null ? void 0 : noReceiveCouponList.value) == null ? void 0 : _b.length) || noReceivePageInfo.value.page === 1) {
            noReceivePageInfo.value.page = 1;
            yield findCustomerCouponNotReceivePageHandle();
          }
        } else if (val === 2) {
          if (!((_c = usedCouponList == null ? void 0 : usedCouponList.value) == null ? void 0 : _c.length) || usedPageInfo.value.page === 1) {
            usedPageInfo.value.page = 1;
            yield findCustomerCouponUsedPageHandle();
          }
        }
      }),
      { immediate: true }
    );
    common_vendor.onShow(() => {
      common_vendor.index.hideTabBar();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.isRef(currentIndex) ? currentIndex.value = $event : null),
        b: common_vendor.p({
          height: 54,
          width: 750,
          gutter: 0,
          color: common_vendor.unref(themeColor),
          activeColor: "white",
          list: common_vendor.unref(navList),
          defaultValue: 0,
          modelValue: common_vendor.unref(currentIndex)
        }),
        c: common_vendor.unref(currentIndex) === 0
      }, common_vendor.unref(currentIndex) === 0 ? {
        d: common_vendor.f(common_vendor.unref(noUseCouponList), (item, k0, i0) => {
          return {
            a: "2204acec-4-" + i0 + "," + ("2204acec-3-" + i0),
            b: common_vendor.p({
              ["font-size"]: 22,
              _class: "opacity-7",
              label: item.description
            }),
            c: common_vendor.o(($event) => itemClick(item), item.id),
            d: "2204acec-3-" + i0 + ",2204acec-2",
            e: common_vendor.p({
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
            f: item.id
          };
        })
      } : {}, {
        e: common_vendor.unref(currentIndex) === 1
      }, common_vendor.unref(currentIndex) === 1 ? {
        f: common_vendor.f(common_vendor.unref(noReceiveCouponList), (item, k0, i0) => {
          return {
            a: "2204acec-6-" + i0 + "," + ("2204acec-5-" + i0),
            b: common_vendor.p({
              ["font-size"]: 22,
              _class: "opacity-7",
              label: item.description
            }),
            c: common_vendor.o(($event) => itemClick(item), item.id),
            d: "2204acec-5-" + i0 + ",2204acec-2",
            e: common_vendor.p({
              priceDetail: {
                price: item.couponType === 1 ? item.amount : item.discount * 1,
                //价格金额
                suffix: item.couponType === 1 ? "元" : "折",
                //后缀文本
                prefix: "",
                //前缀文本
                subtext: ""
                //小文本
              },
              rightDetail: {
                title: item.couponType === 1 ? item.amount + "元" : item.discount * 1 + "折",
                //标题
                subtitle: item.name,
                //副标题
                time: item.expireTime
                //有效期时间文本
              },
              ["btn-label"]: "立即领取",
              color: "pink",
              linear: "right",
              ["linear-deep"]: "accent",
              mainColor: "yellow",
              ["font-color"]: "",
              extra: true
            }),
            f: item.id
          };
        })
      } : {}, {
        g: common_vendor.unref(currentIndex) === 2
      }, common_vendor.unref(currentIndex) === 2 ? {
        h: common_vendor.f(common_vendor.unref(usedCouponList), (item, k0, i0) => {
          return {
            a: "2204acec-8-" + i0 + "," + ("2204acec-7-" + i0),
            b: common_vendor.p({
              ["font-size"]: 22,
              _class: "opacity-7",
              label: item.description
            }),
            c: common_vendor.o(($event) => itemClick(item), item.id),
            d: "2204acec-7-" + i0 + ",2204acec-2",
            e: common_vendor.p({
              priceDetail: {
                price: item.couponType === 1 ? item.amount : item.discount * 1,
                //价格金额
                suffix: item.couponType === 1 ? "元" : "折",
                //后缀文本
                prefix: "",
                //前缀文本
                subtext: ""
                //小文本
              },
              rightDetail: {
                title: item.couponType === 1 ? item.amount + "元" : item.discount * 1 + "折",
                //标题
                subtitle: item.name,
                //副标题
                time: item.expireTime
                //有效期时间文本
              },
              disable: true,
              ["btn-label"]: "已使用",
              extra: true
            }),
            f: item.id
          };
        })
      } : {}, {
        i: common_vendor.o(refresh),
        j: common_vendor.o(refreshBottom),
        k: common_vendor.o(($event) => common_vendor.isRef(refreshStatus) ? refreshStatus.value = $event : null),
        l: common_vendor.o(($event) => common_vendor.isRef(refreshBottomStatus) ? refreshBottomStatus.value = $event : null),
        m: common_vendor.p({
          _style: "height: 85vh",
          modelValue: common_vendor.unref(refreshStatus),
          ["bottom-value"]: common_vendor.unref(refreshBottomStatus)
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/pages/coupon/coupon.vue"]]);
wx.createPage(MiniProgramPage);
