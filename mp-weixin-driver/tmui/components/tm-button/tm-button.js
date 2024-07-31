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
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const tmui_tool_theme_theme = require("../../tool/theme/theme.js");
require("../../tool/lib/interface.js");
require("../../../store/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
require("../../tool/theme/colortool.js");
if (!Math) {
  tmIcon();
}
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-button",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    hoverClass: {
      type: String,
      default: "opacity-7"
    },
    /**
     * mini,small,normal,middle,large
     */
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    fontColor: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    //不是同层背景，默认是同层，为false
    //如果输入框表单与tmshee在同一层下。他们的黑白暗黑背景色是相同的。为了区分这个问题，需要单独指示，以便区分背景同层。
    //主意：它只在黑和白之间的色系才起作用，其它颜色下不起作用。
    noLevel: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    //如果为true，采用块状flex布局，自动宽和高度。
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //提供时，点击后会中转到对应页面。
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    /**
     * submit,reset 在tm-form中使用。
     */
    formType: {
      type: String,
      default: ""
    },
    //开放能力
    openType: {
      type: String,
      default: ""
    },
    //打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    },
    groupId: {
      type: String,
      default: ""
    },
    guildId: {
      type: String,
      default: ""
    },
    publicId: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: "rpx"
    },
    darkBgColor: {
      type: String,
      default: ""
    },
    /**禁用后的主题色 */
    disabledColor: {
      type: String,
      default: "grey-1"
    }
  }),
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact", "chooseavatar"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    common_vendor.ref(false);
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const formtype = common_vendor.computed(() => props.formType);
    let FormParent = null;
    let FilterParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy == null ? void 0 : proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_c = FormParent == null ? void 0 : FormParent.$parent) != null ? _c : void 0;
        }
      }
    }
    if (formtype.value == "filterCancel" || formtype.value == "filterConfirm") {
      FilterParent = proxy == null ? void 0 : proxy.$parent;
      while (FilterParent) {
        if ((FilterParent == null ? void 0 : FilterParent.FilterMenu) == "FilterMenu" || !FilterParent) {
          break;
        } else {
          FilterParent = (_d = FilterParent == null ? void 0 : FilterParent.$parent) != null ? _d : void 0;
        }
      }
    }
    const _noLevel = common_vendor.computed(() => props.noLevel);
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    let textColor = common_vendor.computed(() => {
      if (tmui_tool_theme_theme.theme.isCssColor(_fontColor.value))
        return _fontColor.value;
      if (!props.fontColor)
        return tmcomputed.value.textColor;
      return tmui_tool_theme_theme.theme.getColor(props.fontColor).value;
    });
    const customCSSStyle = common_vendor.computed(() => {
      return __spreadValues({}, tmui_tool_lib_minxs.computedStyle(props));
    });
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const _shadow = common_vendor.computed(() => {
      var _a2, _b2, _c2, _d2;
      return props.shadow || ((_d2 = (_c2 = (_b2 = (_a2 = store.tmuiConfig.themeConfig) == null ? void 0 : _a2.component) == null ? void 0 : _b2.button) == null ? void 0 : _c2.shadow) != null ? _d2 : 0);
    });
    const tmcomputed = common_vendor.computed(() => {
      let nprops = __spreadProps(__spreadValues({}, props), { shadow: _shadow.value });
      if (_disabled.value) {
        nprops.color = props.disabledColor;
      }
      return tmui_tool_lib_minxs.computedTheme(__spreadValues({}, nprops), isDark.value, tmcfg.value);
    });
    const isclickOn = common_vendor.ref(false);
    const _load = common_vendor.computed(() => props.loading);
    const _disabled = common_vendor.computed(() => props.disabled);
    const _label = common_vendor.computed(() => props.label);
    const _icon = common_vendor.computed(() => props.icon);
    common_vendor.computed(() => {
      if (props.outlined && props.border == 0)
        return 1;
      if (props.border > 0)
        return props.border;
      return 0;
    });
    const sizeObj = common_vendor.computed(() => {
      let ptest = {
        block: { w: 0, h: 80, fontSize: 28, round: 3 },
        mini: { w: 88, h: 36, fontSize: 20, round: 3 },
        small: { w: 120, h: 56, fontSize: 22, round: 3 },
        normal: { w: 220, h: 80, fontSize: 28, round: 3 },
        middle: { w: 300, h: 80, fontSize: 30, round: 3 },
        large: { w: 375, h: 80, fontSize: 32, round: 3 }
      };
      if (props.unit == "px") {
        let key = "block";
        let key2 = "w";
        for (key in ptest) {
          for (key2 in ptest[key]) {
            ptest[key][key2] = common_vendor.index.upx2px(ptest[key][key2]);
          }
        }
      }
      return ptest;
    });
    const btnSizeObj = common_vendor.computed(() => {
      var _a2, _b2, _c2, _d2, _e, _f, _g, _h;
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return {
          w: 0,
          h: props.height || sizeObj.value.block.h,
          fontSize: fontSize || sizeObj.value.block.fontSize,
          round: props.round == -1 ? 0 : props.round || ((_d2 = (_c2 = (_b2 = (_a2 = store.tmuiConfig.themeConfig) == null ? void 0 : _a2.component) == null ? void 0 : _b2.button) == null ? void 0 : _c2.round) != null ? _d2 : 0) || sizeObj.value.normal.round
        };
      }
      return {
        w: props.width || sizeObj.value[props.size].w,
        h: props.height || sizeObj.value[props.size].h,
        fontSize: fontSize || sizeObj.value[props.size].fontSize,
        round: props.round == -1 ? 0 : props.round || ((_h = (_g = (_f = (_e = store.tmuiConfig.themeConfig) == null ? void 0 : _e.component) == null ? void 0 : _f.button) == null ? void 0 : _g.round) != null ? _h : 0) || sizeObj.value[props.size].round
      };
    });
    const _fontColor = common_vendor.computed(() => props.fontColor);
    const _transprent = common_vendor.computed(() => props.transprent);
    const _margin = common_vendor.computed(() => {
      if (props.margin.length == 1)
        return [props.margin[0], props.margin[0], props.margin[0], props.margin[0]];
      if (props.margin.length == 2)
        return [props.margin[0], props.margin[1], props.margin[0], props.margin[1]];
      if (props.margin.length == 3)
        return [props.margin[0], props.margin[1], props.margin[2], 0];
      if (props.margin.length == 4)
        return [props.margin[0], props.margin[1], props.margin[2], props.margin[3]];
      return [0, 0, 0, 0];
    });
    const _padding = common_vendor.computed(() => {
      if (props.padding.length == 1)
        return [props.padding[0], props.padding[0], props.padding[0], props.padding[0]];
      if (props.padding.length == 2)
        return [props.padding[0], props.padding[1], props.padding[0], props.padding[1]];
      if (props.padding.length == 3)
        return [props.padding[0], props.padding[1], props.padding[2], 0];
      if (props.padding.length == 4)
        return [props.padding[0], props.padding[1], props.padding[2], props.padding[3]];
      return [0, 0, 0, 0];
    });
    const _bgcolor = common_vendor.computed(() => {
      var _a2;
      if (_transprent.value === true)
        return `background-color:rgba(255,255,255,0);`;
      if (props.darkBgColor !== "" && isDark.value === true) {
        return `background-color:${props.darkBgColor};`;
      }
      if (props.linearColor.length == 2) {
        return {
          "background-image": `linear-gradient(${tmcomputed.value.linearDirectionStr},${props.linearColor[0]},${props.linearColor[1]})`
        };
      }
      if (((_a2 = tmcomputed.value.gradientColor) == null ? void 0 : _a2.length) == 2) {
        return tmcomputed.value.backgroundColorCss;
      }
      if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
        return `background-color: ${tmcomputed.value.inputcolor}`;
      }
      return `background-color: ${tmcomputed.value.backgroundColor}`;
    });
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function touchcancel(e) {
      isclickOn.value = false;
      emits("touchcancel", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
        FormParent[formtype.value]();
      }
      if (FilterParent != null && typeof FilterParent != "undefined" && formtype.value && !props.loading) {
        FilterParent[formtype.value]();
      }
      if (props.loading)
        return;
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        common_vendor.index.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile") {
        common_vendor.index.getUserProfile({
          desc: "用于完善会员资料",
          success: function(userProfile) {
            if (userProfile.errMsg != "getUserProfile:ok") {
              common_vendor.index.showToast({
                title: userProfile.errMsg,
                icon: "error",
                mask: true
              });
              return;
            }
            emits("getUserInfo", userProfile);
            emits("getUserProfile", userProfile);
          },
          fail: (error) => {
            console.log(error);
            common_vendor.index.showToast({
              icon: "none",
              title: typeof error == "object" ? error.errMsg : error
            });
          }
        });
        console.warn(
          "微信小程序已收回‘getUserProfile’以及‘getUserInfo’权限，请使用open-type='chooseAvatar'使用@chooseavatar回调，详见《微信小程序用户头像昵称获取规则调整公告》https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01"
        );
      }
    }
    common_vendor.provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_icon) && !common_vendor.unref(_load)
      }, common_vendor.unref(_icon) && !common_vendor.unref(_load) ? {
        b: common_vendor.p({
          lineHeight: common_vendor.unref(btnSizeObj).fontSize * 0.9,
          userInteractionEnabled: false,
          color: common_vendor.unref(_fontColor),
          _class: common_vendor.unref(_label) ? "pr-10" : "",
          unit: props.unit,
          fontSize: common_vendor.unref(btnSizeObj).fontSize * 0.9,
          name: common_vendor.unref(_icon)
        })
      } : {}, {
        c: common_vendor.t(common_vendor.unref(_label)),
        d: common_vendor.o(onclick),
        e: common_vendor.o(touchstart),
        f: common_vendor.o(touchend),
        g: common_vendor.o(($event) => emits("longpress", $event)),
        h: common_vendor.o(touchcancel),
        i: common_vendor.o(($event) => emits("touchmove", $event)),
        j: common_vendor.o(($event) => emits("getphonenumber", $event)),
        k: common_vendor.o(($event) => emits("error", $event)),
        l: common_vendor.o(($event) => emits("opensetting", $event)),
        m: common_vendor.o(($event) => emits("launchapp", $event)),
        n: common_vendor.o(($event) => emits("contact", $event)),
        o: common_vendor.o(($event) => emits("chooseavatar", $event)),
        p: props.formType,
        q: props.openType,
        r: props.appParameter,
        s: props.sessionFrom,
        t: props.sendMessageTitle,
        v: props.sendMessagePath,
        w: props.sendMessageImg,
        x: props.sendMessageCard,
        y: common_vendor.unref(_load),
        z: common_vendor.unref(_disabled),
        A: props.groupId,
        B: props.guildId,
        C: props.publicId,
        D: common_vendor.n(isclickOn.value && !common_vendor.unref(_disabled) && !common_vendor.unref(_load) ? props.hoverClass + " bhover" : ""),
        E: common_vendor.n(!common_vendor.unref(_disabled) && !common_vendor.unref(_load) ? "webpc" : ""),
        F: common_vendor.n(common_vendor.unref(_load) || common_vendor.unref(_disabled) ? "opacity-8" : ""),
        G: common_vendor.n(!_ctx.isDisabledRoundAndriod ? `round-${common_vendor.unref(btnSizeObj).round}` : ""),
        H: common_vendor.n(common_vendor.unref(customClass)),
        I: common_vendor.s({
          marginLeft: common_vendor.unref(_margin)[0] + "rpx",
          marginTop: common_vendor.unref(_margin)[1] + "rpx",
          marginRight: common_vendor.unref(_margin)[2] + "rpx",
          marginBottom: common_vendor.unref(_margin)[3] + "rpx",
          paddingLeft: common_vendor.unref(_padding)[0] + "rpx",
          paddingTop: common_vendor.unref(_padding)[1] + "rpx",
          paddingRight: common_vendor.unref(_padding)[2] + "rpx",
          paddingBottom: common_vendor.unref(_padding)[3] + "rpx"
        }),
        J: common_vendor.s({
          height: common_vendor.unref(btnSizeObj).h + props.unit,
          fontSize: common_vendor.unref(btnSizeObj).fontSize + props.unit,
          color: common_vendor.unref(textColor),
          lineHeight: common_vendor.unref(btnSizeObj).h + props.unit
        }),
        K: common_vendor.s(common_vendor.unref(btnSizeObj).w && !props.block ? {
          width: common_vendor.unref(btnSizeObj).w + props.unit
        } : ""),
        L: common_vendor.s(common_vendor.unref(tmcomputed).borderCss),
        M: common_vendor.s(common_vendor.unref(_bgcolor)),
        N: common_vendor.s(!common_vendor.unref(_transprent) && common_vendor.unref(_shadow) > 0 && !props.text ? common_vendor.unref(tmcomputed).shadowColor : ""),
        O: common_vendor.s(common_vendor.unref(customCSSStyle))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f3634985"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-button/tm-button.vue"]]);
wx.createComponent(Component);
