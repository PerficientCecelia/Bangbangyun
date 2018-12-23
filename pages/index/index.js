let app = getApp();
import mypromise from '/pages/utils/Promise.js';

Page({
  data: {
   
  },
  onLoad(query) {
   
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh', new Date())
    dd.stopPullDownRefresh();
  }
});
