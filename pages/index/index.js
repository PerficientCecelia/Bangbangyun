let app = getApp();
import mypromise from '/pages/utils/Promise.js';

Page({
  data: {
    isPageActive: false
  },
  onLoad(query) {

  },
  GoToOrderDetail(e) {
    let erpId = app.globalData.employeeId;
    let isAuthorized = app.globalData.isUserAuthorized;
    if (e.currentTarget.id == "datePage") {
      if (erpId != "" && isAuthorized) {
        dd.redirectTo({
          url: '/pages/datePage/datePage'
        })
      }
    }
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh', new Date())
    dd.stopPullDownRefresh();
  }
});
