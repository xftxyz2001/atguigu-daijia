"use strict";
require("../common/vendor.js");
function getCurrentPageInfo() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const returnObj = {
    route: `/${currentPage.route}`,
    pageInfo: currentPage,
    fullPath: ""
  };
  setTimeout(() => {
    returnObj.fullPath = currentPage.$page.fullPath;
  }, 0);
  return returnObj;
}
exports.getCurrentPageInfo = getCurrentPageInfo;
