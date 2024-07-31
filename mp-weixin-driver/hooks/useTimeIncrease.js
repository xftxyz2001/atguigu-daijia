"use strict";
const common_vendor = require("../common/vendor.js");
const useTimeIncrease = (param) => {
  const hours = common_vendor.ref(0);
  const minutes = common_vendor.ref(0);
  const seconds = common_vendor.ref(0);
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
      seconds.value++;
      if (seconds.value === 60) {
        seconds.value = 0;
        minutes.value++;
      }
      if (minutes.value === 60) {
        minutes.value = 0;
        hours.value++;
      }
      if (param && param.duration && hours.value * 3600 + minutes.value * 60 + seconds.value >= param.duration) {
        stop();
        param.callback && param.callback();
      }
    }, 1e3);
  };
  const stop = () => {
    clearInterval(timer.value);
  };
  const reset = () => {
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
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
exports.useTimeIncrease = useTimeIncrease;
