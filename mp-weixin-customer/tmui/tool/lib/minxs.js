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
const tmui_tool_theme_theme = require("../theme/theme.js");
const tmui_tool_lib_interface = require("./interface.js");
require("../../../store/index.js");
const custom_props = {
  /**
   * 自定义的样式属性
   */
  _style: {
    type: [Array, String, Object],
    default: () => []
  },
  /**
   * 自定义类名
   */
  _class: {
    type: [Array, String],
    default: ""
  },
  /**
   * 当前组件的主题。可以是颜色值，也可以是主题名称。
   */
  color: {
    type: String,
    default: "primary"
  },
  /**
   * 是否跟随全局主题的变换而变换
   */
  followTheme: {
    type: [Boolean, String],
    default: false
  },
  /**
   * 暗黑
   */
  dark: {
    type: [Boolean, String],
    default: false
  },
  /**
   * 是否跟随主题全局切换暗黑模式。
   */
  followDark: {
    type: [Boolean, String],
    default: true
  },
  /**
   * 圆角
   */
  round: {
    type: [Number, Array],
    default: 0
  },
  /**
   * 投影，安卓上只有黑灰投影。
   */
  shadow: {
    type: [Number],
    default: 0
    //4
  },
  /**
   * 是否镂空背景。
   */
  outlined: {
    type: [Boolean],
    default: false
  },
  /**
   * 边线
   */
  border: {
    type: [Number],
    default: 0
  },
  /**
   * 边线样式
   * @field solid|dashed|dotted
   * @default solid
   */
  borderStyle: {
    type: String,
    default: tmui_tool_lib_interface.borderStyle.solid
  },
  /**
   * 边线的方向。
   */
  borderDirection: {
    type: String,
    default: tmui_tool_lib_interface.cssDirection.all
  },
  /**
   * 是否浅色背景
   */
  text: {
    type: [Boolean, String],
    default: false
  },
  /**
   * 是否透明背景
   */
  transprent: {
    type: [Boolean, String],
    default: true
  },
  /**
   * 是否透明背景,等同transprent,因单词拼写错误，现在写一个正确的。
   */
  transparent: {
    type: [Boolean, String],
    default: true
  },
  /**
   * 渐变背景方向,
   * left:右->左，right:左->右。top:下->上，bottom:上->下。
   */
  linear: {
    type: String,
    default: ""
  },
  /** 渐变的亮浅 light,dark,accent亮系渐变和深色渐变。 */
  linearDeep: {
    type: String,
    default: "light"
  },
  /**当开启渐变时，如果提供些数组属性将产生自定义颜色的渐变值。 */
  linearColor: {
    type: [Array],
    default: () => []
  },
  //是否禁用圆角功能 ，针对安卓的特别处理。
  isDisabledRoundAndriod: {
    type: [Boolean, String],
    default: false
  },
  //是否开启磨砂背景。
  blur: {
    type: Boolean,
    default: false
  },
  /**线的边线颜色,如果不提供自动从color中匹配计算。 */
  borderColor: {
    type: String,
    default: ""
  }
};
const computedDark = (props, tmcfg) => {
  const followDark = props.followDark;
  const dark = props.dark;
  const glboalDark = tmcfg.dark;
  if (followDark) {
    return glboalDark;
  }
  return dark;
};
const computedClass = (props) => {
  const _class = props._class;
  if (typeof _class == "string") {
    return _class;
  }
  if (Array.isArray(_class)) {
    return _class.join(" ");
  }
  return "";
};
const computedStyle = (props) => {
  const _style = props._style;
  if (typeof _style == "string") {
    let p = _style.split(";");
    let k = p.map((el) => {
      el = el.replace(";", "");
      let node = {};
      let idx = el.split(":");
      node[idx[0]] = idx[1];
      return node;
    });
    let kl = {};
    k.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  if (typeof _style == "object" && !Array.isArray(_style)) {
    return _style;
  }
  if (typeof _style == "object" && Array.isArray(_style)) {
    let kl = {};
    _style.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  return {};
};
const computedTheme = (props, dark, store) => {
  var _a;
  const color = props.color;
  const border = props.border;
  const shadow = props.shadow;
  const round = props.round;
  const outlined = props.outlined;
  const text = props.text;
  const borderStyle2 = props.borderStyle;
  const borderDirection = props.borderDirection;
  const linear = props.linear;
  const linearDeep2 = props.linearDeep;
  const blur = props.blur;
  var borderColor = (_a = props == null ? void 0 : props.borderColor) != null ? _a : "";
  var theme = new tmui_tool_theme_theme.theme.themeColors(store.colorList);
  if (tmui_tool_theme_theme.theme.isCssColor(color) && !theme.hasColors(color)) {
    theme = new tmui_tool_theme_theme.theme.themeColors(theme.add(color, color));
  }
  let defaultColorName = color || "primary";
  if ((props == null ? void 0 : props.followTheme) == true && store.color) {
    defaultColorName = store.color;
    borderColor = "";
  }
  let c = theme.getTheme({
    colorname: defaultColorName,
    dark,
    borderWidth: border,
    shadow: parseInt(String(shadow)),
    round: parseInt(String(round)),
    outlined: outlined ? true : false,
    text: text ? true : false,
    borderStyle: borderStyle2,
    borderDirection,
    linearDirection: linear,
    linearDeep: linearDeep2,
    blur,
    borderColor
  });
  return c;
};
exports.computedClass = computedClass;
exports.computedDark = computedDark;
exports.computedStyle = computedStyle;
exports.computedTheme = computedTheme;
exports.custom_props = custom_props;
