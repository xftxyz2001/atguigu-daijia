"use strict";
const common_vendor = require("../../../common/vendor.js");
function preview(url = "", list = [], rangKey = "url") {
  if (!url) {
    common_vendor.index.$tm.u.toast("参数有误");
    return;
  }
  if (arguments.length == 1) {
    common_vendor.index.previewImage({
      current: url,
      urls: [url]
    });
  } else if (arguments.length === 3) {
    if (typeof list[0] === "object" && typeof list[0] !== "undefined") {
      let urls = [];
      list.forEach((item) => {
        urls.push(item[rangKey]);
      });
      common_vendor.index.previewImage({
        current: url,
        urls,
        fail: (er) => {
          console.warn(er);
        }
      });
    } else if (typeof list[0] === "string") {
      common_vendor.index.previewImage({
        current: url,
        urls: list
      });
    }
  } else {
    common_vendor.index.$tm.u.toast("参数有误");
  }
}
exports.preview = preview;
