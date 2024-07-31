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
const config_constEnums = require("../../config/constEnums.js");
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
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_scrolly2 = common_vendor.resolveComponent("tm-scrolly");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_segtab2 + _easycom_tm_text2 + _easycom_tm_cell2 + _easycom_tm_sheet2 + _easycom_tm_scrolly2 + _easycom_tm_app2)();
}
const _easycom_tm_segtab = () => "../../tmui/components/tm-segtab/tm-segtab.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_scrolly = () => "../../tmui/components/tm-scrolly/tm-scrolly.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_segtab + _easycom_tm_text + _easycom_tm_cell + _easycom_tm_sheet + _easycom_tm_scrolly + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderList",
  setup(__props) {
    const { themeColor } = hooks_useTheme.useTheme();
    const currentIndex = common_vendor.ref(0);
    const navList = common_vendor.ref([
      {
        id: 111,
        text: "订单"
      }
      // {
      //   id: 1,
      //   text: '行程中'
      // },
      // {
      //   id: 2,
      //   text: '已完成'
      // },
      // {
      //   id: 3,
      //   text: '已取消'
      // }
    ]);
    function navChangeHandle(index) {
      console.log(index);
      console.log("currentIndex", currentIndex.value);
    }
    const refreshStatus = common_vendor.ref(false);
    const refreshBottomStatus = common_vendor.ref(false);
    function refresh() {
      return __async(this, null, function* () {
        refreshStatus.value = true;
        console.log("下拉刷新");
        pageInfo.value.page = 1;
        yield getOrderListHandle();
        refreshStatus.value = false;
      });
    }
    function refreshBottom() {
      return __async(this, null, function* () {
        console.log("上拉加载");
        refreshBottomStatus.value = true;
        if (pageInfo.value.page >= pageInfo.value.pages) {
          refreshBottomStatus.value = false;
          return;
        }
        pageInfo.value.page++;
        yield getOrderListHandle();
        refreshBottomStatus.value = false;
      });
    }
    const pageInfo = common_vendor.ref({
      page: 1,
      limit: 10,
      pages: 0,
      total: 0
    });
    const orderList = common_vendor.ref([]);
    function getOrderListHandle() {
      return __async(this, null, function* () {
        const res = yield api_order_index.getOrderListPage(pageInfo.value);
        pageInfo.value = {
          page: res.data.page,
          limit: res.data.limit,
          pages: res.data.pages,
          total: res.data.total
        };
        if (res.data.page === 1) {
          orderList.value = res.data.records;
        } else {
          orderList.value = [...orderList.value, ...res.data.records];
        }
      });
    }
    function goToOtherPage(item) {
      if (item.status === config_constEnums.OrderStatus.CANCEL_ORDER) {
        common_vendor.index.showToast({
          title: "该订单已取消",
          icon: "none"
        });
      } else if (item.status >= config_constEnums.OrderStatus.UNPAID) {
        common_vendor.index.navigateTo({
          url: "/pages/orderDetail/orderDetail?orderId=" + item.id
        });
      } else {
        console.log("跳转正在进行的订单");
        common_vendor.index.navigateTo({
          url: "/pages/creatOrder/creatOrder?orderId=" + item.id
        });
      }
    }
    common_vendor.onLoad(() => {
      getOrderListHandle();
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.o(navChangeHandle),
        b: common_vendor.o(($event) => common_vendor.isRef(currentIndex) ? currentIndex.value = $event : null),
        c: common_vendor.p({
          height: 54,
          width: 750,
          gutter: 0,
          color: common_vendor.unref(themeColor),
          activeColor: "white",
          list: common_vendor.unref(navList),
          defaultValue: ((_a = common_vendor.unref(navList)[0]) == null ? void 0 : _a.id) || 0,
          modelValue: common_vendor.unref(currentIndex)
        }),
        d: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return {
            a: "66a042e0-5-" + i0 + "," + ("66a042e0-4-" + i0),
            b: common_vendor.p({
              _class: "text-weight-b",
              color: "red",
              label: (item.status < common_vendor.unref(config_constEnums.OrderStatus).UNPAID ? "预估:" : "总共:") + ((item == null ? void 0 : item.amount.toFixed(2)) || 0) + "元"
            }),
            c: common_vendor.t(common_vendor.unref(config_constEnums.getLabelByValue)(common_vendor.unref(config_constEnums.OrderStatusMap), item.status)),
            d: "66a042e0-4-" + i0 + "," + ("66a042e0-3-" + i0),
            e: common_vendor.t(item.startLocation),
            f: "66a042e0-6-" + i0 + "," + ("66a042e0-3-" + i0),
            g: common_vendor.t(item.endLocation),
            h: "66a042e0-7-" + i0 + "," + ("66a042e0-3-" + i0),
            i: "66a042e0-9-" + i0 + "," + ("66a042e0-8-" + i0),
            j: common_vendor.p({
              color: "grey",
              label: item.createTime
            }),
            k: "66a042e0-8-" + i0 + "," + ("66a042e0-3-" + i0),
            l: common_vendor.o(($event) => goToOtherPage(item), index),
            m: "66a042e0-3-" + i0 + ",66a042e0-2",
            n: index
          };
        }),
        e: common_vendor.p({
          margin: [0, 0]
        }),
        f: common_vendor.t(""),
        g: common_vendor.p({
          margin: [0, 0]
        }),
        h: common_vendor.t(""),
        i: common_vendor.p({
          margin: [0, 0]
        }),
        j: common_vendor.p({
          margin: [0, 0]
        }),
        k: common_vendor.p({
          margin: [25],
          round: 3,
          shadow: 2,
          _class: "text-size-m"
        }),
        l: common_vendor.o(refresh),
        m: common_vendor.o(refreshBottom),
        n: common_vendor.o(($event) => common_vendor.isRef(refreshStatus) ? refreshStatus.value = $event : null),
        o: common_vendor.o(($event) => common_vendor.isRef(refreshBottomStatus) ? refreshBottomStatus.value = $event : null),
        p: common_vendor.p({
          _style: "height: 90vh",
          modelValue: common_vendor.unref(refreshStatus),
          ["bottom-value"]: common_vendor.unref(refreshBottomStatus)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/orderList/orderList.vue"]]);
wx.createPage(MiniProgramPage);
