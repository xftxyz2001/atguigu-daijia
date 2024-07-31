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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c;
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_theme_colortool = require("./colortool.js");
const tmui_tool_lib_interface = require("../lib/interface.js");
let localTheme = {};
let theme = ((_c = (_b = (_a = common_vendor.index) == null ? void 0 : _a.$tm) == null ? void 0 : _b.config) == null ? void 0 : _c.theme) ? __spreadValues({}, common_vendor.index.$tm.config.theme) : localTheme;
var colors = [];
var colorObj = common_vendor.index.getStorageSync("colorArrayList").length ? __spreadValues(__spreadValues({}, common_vendor.index.getStorageSync("colorArrayList").reduce((pre, cur) => {
  pre[cur.name] = cur.value;
  return pre;
}, {})), theme) : __spreadValues({
  red: "#FE1C00",
  pink: "#CA145D",
  purple: "#A61BC3",
  "deep-purple": "#6A0E81",
  indigo: "#652DF4",
  blue: "#0163FF",
  "light-blue": "#0889FF",
  cyan: "#11CDE8",
  teal: "#00998a",
  green: "#5DBD1F",
  "light-green": "#83D54A",
  lime: "#D4ED00",
  yellow: "#FFC400",
  amber: "#FFFB01",
  orange: "#FEA600",
  "deep-orange": "#FE5C00",
  brown: "#795548",
  "blue-grey": "#607D8B",
  grey: "#9E9E9E",
  black: "#000000",
  white: "#FFFFFF",
  primary: "#0163FF",
  "grey-5": "#fafafa",
  "grey-4": "#f5f5f5",
  "grey-3": "#eeeeee",
  "grey-2": "#e0e0e0",
  "grey-1": "#bdbdbd",
  "grey-darken-1": "#757575",
  "grey-darken-2": "#616161",
  "grey-darken-3": "#404044",
  "grey-darken-4": "#202022",
  "grey-darken-5": "#111112",
  "grey-darken-6": "#0A0A0B"
}, theme);
for (const key in colorObj) {
  if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
    const element = String(colorObj[key]);
    if (isCssColor(element)) {
      let rgba = tmui_tool_theme_colortool.colortool.cssToRgba(element);
      colors.push({
        name: key,
        value: element,
        hsva: tmui_tool_theme_colortool.colortool.rgbaToHsva(tmui_tool_theme_colortool.colortool.cssToRgba(element)),
        rgba: tmui_tool_theme_colortool.colortool.cssToRgba(element),
        hsla: tmui_tool_theme_colortool.colortool.rgbaToHsla(rgba),
        csscolor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      });
    }
  }
}
function isCssColor(color) {
  const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const reg2 = /^(rgb|RGB|rgba|RGBA)/;
  return reg1.test(color) || reg2.test(color);
}
function getColor(colorName) {
  let isHand = colors.findIndex(function(el, index) {
    return el.name == colorName;
  });
  if (isHand == -1) {
    colorName = "primary";
    isHand = colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    console.warn("主题中不存在相关名称的主题。");
  }
  return colors[isHand];
}
class themeColors {
  constructor(c = colors) {
    __publicField(this, "colors", []);
    this.colors = c;
  }
  hasColors(colorName = "") {
    let isHand = this.colors.filter(function(el, index) {
      return el.name == colorName;
    });
    return isHand.length > 0;
  }
  add(colorName = "", value = "") {
    let isHand = this.colors.filter(function(el, index) {
      return el.name == colorName;
    });
    if (isHand.length > 0) {
      return this.colors;
    }
    if (!value) {
      console.error("颜色值必填!!!");
      return this.colors;
    }
    let rgba = tmui_tool_theme_colortool.colortool.cssToRgba(value);
    let color = {
      csscolor: "",
      hsva: { h: 0, s: 0, v: 0, a: 0 },
      hsla: { h: 0, s: 0, l: 0, a: 0 },
      rgba: { r: 0, g: 0, b: 0, a: 0 },
      name: colorName,
      value
    };
    color.csscolor = tmui_tool_theme_colortool.colortool.rgbaToCss(rgba);
    color.hsva = tmui_tool_theme_colortool.colortool.rgbaToHsva(rgba);
    color.rgba = rgba;
    color.hsla = tmui_tool_theme_colortool.colortool.rgbaToHsla(rgba);
    this.colors.push(color);
    return this.colors;
  }
  del(colorName) {
    let isHand = this.colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      console.error("删除失败，主题中不存在相关名称的主题。");
      return;
    }
    this.colors.splice(isHand, 1);
  }
  getColor(colorName) {
    let isHand = this.colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      console.error("主题中不存在相关名称的主题。");
    }
    return this.colors[isHand];
  }
  /**
   * 计算主题
   * @author tmui3.0|tmzdy
   * @param config 样式的细化
   * @returns cssstyle 返回一个计算好的主题系。
   */
  getTheme(config = { colorname: "primary", dark: false }) {
    var _a2, _b2, _c2, _d;
    if (!config["colorname"]) {
      console.error("颜色名称必填");
      config.colorname = "primary";
    }
    let index = this.colors.findIndex((el) => el.name == config.colorname);
    if (index == -1) {
      console.error("主题不存在，默认为primary");
      config.colorname = "primary";
    }
    let nowColor = __spreadValues({}, this.colors[index]);
    config.borderWidth = isNaN(parseInt(String(config["borderWidth"]))) ? 0 : (_a2 = config["borderWidth"]) != null ? _a2 : 0;
    config.borderStyle = config["borderStyle"] ? config["borderStyle"] : "solid";
    config.borderColor = config["borderColor"] || "";
    config.borderDirection = config["borderDirection"] || tmui_tool_lib_interface.cssDirection.all;
    config.linearDirection = config["linearDirection"] || tmui_tool_lib_interface.linearDirection.none;
    config.linearDeep = config["linearDeep"] || tmui_tool_lib_interface.linearDeep.light;
    config.shadow = isNaN(parseInt(String(config["shadow"]))) ? 6 : config["shadow"];
    config.round = isNaN(parseInt(String(config["round"]))) ? 4 : config["round"];
    config.opaticy = isNaN(parseInt(String(config["opaticy"]))) ? 1 : config["opaticy"];
    config.outlined = typeof config["outlined"] == "boolean" ? config["outlined"] : false;
    config.text = typeof config["text"] == "boolean" ? config["text"] : false;
    config.blur = typeof config["blur"] == "boolean" ? config["blur"] : false;
    function isDarkColorFun(r, g, b) {
      const yiq = (r * 2126 + g * 7152 + b * 722) / 1e4;
      return yiq < 180;
    }
    let isBlack = false;
    let isWhite = false;
    let isBlackAndWhite = false;
    let isGrey = false;
    let isDarkColor = false;
    isDarkColor = isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b);
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
      isBlack = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
      isWhite = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
      isGrey = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
      isBlackAndWhite = true;
    }
    let css = {};
    css.color = nowColor.value;
    css.config = __spreadValues({}, config);
    css.isBlackAndWhite = isBlackAndWhite;
    css.gradientColor = [];
    css.colorname = config.colorname;
    let borderhsl = __spreadValues({}, nowColor.hsla);
    css.borderCss = {};
    let bghsl = __spreadValues({}, nowColor.hsla);
    if (config.dark && !isBlackAndWhite) {
      bghsl.l = 40;
    }
    if (config.blur) {
      bghsl.a = 0.85;
    }
    css.backgroundColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadValues({}, bghsl)));
    if (isBlackAndWhite && config.dark) {
      css.backgroundColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { h: 240, s: 3, l: 8 })));
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { h: 240, s: 3, l: 12 })));
    }
    if (isWhite && !config.dark) {
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
    }
    if (isBlack && !config.dark) {
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
    }
    css.backgroundColorCss = { "background-color": css.backgroundColor };
    let txcolor = __spreadValues({}, nowColor.hsla);
    if (config.dark) {
      txcolor.l = 95;
    } else {
      if (isDarkColor) {
        txcolor.l = 95;
      } else {
        if (isGrey) {
          txcolor.l = 10;
        } else {
          txcolor.l = 20;
        }
      }
    }
    if (config.outlined) {
      txcolor.l = nowColor.hsla.l;
      if (config.dark) {
        txcolor.l = 55;
      } else {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0 && !isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b)) {
          txcolor.l = 20;
        }
      }
      if ((isBlack || isWhite) && config.dark) {
        txcolor.l = 100;
      }
      config.borderWidth = config["borderWidth"] || 2;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
      let o_bgcss = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_bgcss;
      css.backgroundColorCss = { "background-color": o_bgcss };
      css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
    }
    if (config.text) {
      txcolor.l = nowColor.hsla.l;
      if (isGrey) {
        txcolor.l = 15;
      } else {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0 && !isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b)) {
          txcolor.l = 20;
        }
      }
      if (config.dark) {
        txcolor.l = 60;
        if (!isBlackAndWhite) {
          txcolor.s = 100;
        }
      }
      if (isBlack) {
        txcolor.l = 90;
      }
      if (isWhite) {
        txcolor.l = 15;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
        txcolor.l = 90;
      }
      css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
      css.border = css.textColor;
      let o_now_bgColor = nowColor.csscolor;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          n_hsl.l = 12;
          n_hsl.s = 35;
        } else {
          n_hsl.l = 12;
          n_hsl.s = 0;
        }
      }
      if (config.blur) {
        n_hsl.a = 0.85;
      }
      o_now_bgColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_now_bgColor;
      css.backgroundColorCss = { "background-color": o_now_bgColor };
    }
    if (config.shadow) {
      let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
      }
      let o_bgcss = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.shadowColor = {
        boxShadow: `0rpx ${config.shadow * 2.5}rpx ${config.shadow * 6}rpx ${o_bgcss}`
      };
    }
    if (config.linearDirection) {
      let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let dir_str = tmui_tool_lib_interface.linearDirection[config.linearDirection];
      let addling = 0;
      if (nowColor.hsla.h < 180 && nowColor.hsla.h > 0) {
        addling = 20;
      } else {
        addling = -37;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 80;
          liner_color_2.l = 20;
        } else {
          liner_color_1.l = 50;
          liner_color_2.l = 40;
        }
      } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 40;
          liner_color_2.l = 10;
        } else {
          liner_color_1.l = 30;
          liner_color_2.l = 0;
        }
      } else {
        liner_color_2.h = nowColor.hsla.h;
        liner_color_2.s = nowColor.hsla.s;
        liner_color_1.h = nowColor.hsla.h;
        liner_color_1.s = nowColor.hsla.s;
        if (config.linearDeep == "light") {
          liner_color_1.h = liner_color_1.h;
          liner_color_1.s = 90;
          liner_color_1.l = 70;
          liner_color_2.l = 44;
        } else if (config.linearDeep == "dark") {
          liner_color_2.s = 90;
          liner_color_2.l = 26;
          liner_color_1.s = 90;
          liner_color_1.l = 50;
        } else if (config.linearDeep == "accent") {
          liner_color_1.h -= 0;
          liner_color_1.s = 90;
          liner_color_1.l = 54;
          liner_color_2.h -= addling;
          liner_color_2.s = 90;
          liner_color_2.l = 54;
        }
      }
      if (config.dark) {
        liner_color_1.l = 40;
        liner_color_2.l = 40;
        txcolor.l = 90;
      }
      let color_t_1 = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(liner_color_1));
      let color_t_2 = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(liner_color_2));
      if (!config.text && !config.outlined) {
        css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
        let newBgcolor = {
          h: (liner_color_1.h + liner_color_2.h) / 2,
          s: (liner_color_1.s + liner_color_2.s) / 2,
          l: (liner_color_1.l + liner_color_2.l) / 2,
          a: (liner_color_1.a + liner_color_2.a) / 2
        };
        let newBgcolorRgb = tmui_tool_theme_colortool.colortool.hslaToRgba(newBgcolor);
        if (!config.dark) {
          if (!isDarkColorFun(newBgcolorRgb.r, newBgcolorRgb.g, newBgcolorRgb.b) && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        css.backgroundColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(newBgcolor));
        css.gradientColor = [color_t_1, color_t_2];
        css.linearDirectionStr = dir_str;
      }
    }
    if (config.dark == true) {
      css = __spreadValues(__spreadValues({}, css), (_d = (_c2 = (_b2 = common_vendor.index.$tm.config) == null ? void 0 : _b2.themeConfig) == null ? void 0 : _c2.dark) != null ? _d : {});
    }
    css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
    if (config.dark) {
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 12 })));
      } else {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
      }
    } else {
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
      } else {
        if (config.text && config.outlined) {
          css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
        } else if (!config.text && config.outlined) {
          css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadValues({}, txcolor)));
        } else if (!config.text && !config.outlined && config.borderWidth > 0) {
          css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 3 })));
        }
      }
      css.border = config.borderColor || css.border;
    }
    let bcss = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    if (config.borderDirection == "all") {
      css.borderCss[`border`] = bcss;
    } else if (config.borderDirection == "x" || config.borderDirection == "leftright") {
      css.borderCss[`border-left`] = bcss;
      css.borderCss[`border-right`] = bcss;
    } else if (config.borderDirection == "y" || config.borderDirection == "topbottom") {
      css.borderCss[`border-top`] = bcss;
      css.borderCss[`border-bottom`] = bcss;
    } else if (config.borderDirection == "bottomleft") {
      css.borderCss[`border-left`] = bcss;
      css.borderCss[`border-bottom`] = bcss;
    } else if (config.borderDirection == "bottomright") {
      css.borderCss[`border-right`] = bcss;
      css.borderCss[`border-bottom`] = bcss;
    } else if (config.borderDirection == "topleft") {
      css.borderCss[`border-left`] = bcss;
      css.borderCss[`border-top`] = bcss;
    } else if (config.borderDirection == "topright") {
      css.borderCss[`border-right`] = bcss;
      css.borderCss[`border-top`] = bcss;
    } else {
      let str = "-" + config.borderDirection;
      css.borderCss[`border${str}`] = bcss;
    }
    return css;
  }
}
const theme$1 = {
  isCssColor,
  themeColors,
  getColor
};
exports.theme = theme$1;
