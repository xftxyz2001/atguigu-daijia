"use strict";
const common_vendor = require("../common/vendor.js");
const useCountdown = (param) => {
  const originalParam = param || {};
  const hours = common_vendor.ref((param == null ? void 0 : param.hours) || 0);
  const minutes = common_vendor.ref((param == null ? void 0 : param.minutes) || 0);
  const seconds = common_vendor.ref((param == null ? void 0 : param.seconds) || 0);
  const timer = common_vendor.ref();
  const timeInfo = common_vendor.computed(() => {
    return {
      hours: hours.value,
      minutes: minutes.value,
      seconds: seconds.value
    };
  });
  const timeDateTypeInfo = common_vendor.computed(() => {
    return {
      hours: hours.value < 10 ? "0" + hours.value : hours.value,
      minutes: minutes.value < 10 ? "0" + minutes.value : minutes.value,
      seconds: seconds.value < 10 ? "0" + seconds.value : seconds.value
    };
  });
  const start = () => {
    timer.value = setInterval(() => {
      seconds.value--;
      if (seconds.value === -1) {
        seconds.value = 59;
        minutes.value--;
      }
      if (minutes.value === -1) {
        minutes.value = 59;
        hours.value--;
      }
      if (param && hours.value * 3600 + minutes.value * 60 + seconds.value <= 0) {
        stop();
        param.callback && param.callback();
      }
    }, 1e3);
  };
  const stop = () => {
    clearInterval(timer.value);
  };
  const reset = () => {
    hours.value = originalParam.hours || 0;
    minutes.value = originalParam.minutes || 0;
    seconds.value = originalParam.seconds || 0;
  };
  const stopAndReset = () => {
    clearInterval(timer.value);
    reset();
  };
  common_vendor.onUnmounted(() => {
    clearInterval(timer.value);
    reset();
  });
  return {
    timeInfo,
    timeDateTypeInfo,
    start,
    stop,
    reset,
    stopAndReset
  };
};
exports.useCountdown = useCountdown;
