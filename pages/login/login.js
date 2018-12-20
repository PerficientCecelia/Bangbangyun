
import dataTransformer from '../utils/dataTransformer.js';
import mypromise from '/pages/utils/Promise.js';
import loginData from '/testdata/login.js';

let app = getApp();

Page({
  data: {
    isDisableLoginBtn: false
  },
  onLoad() {

  },
  usernameInput(e) {
    this.setData({
      username: dataTransformer.trimString(e.detail.value)
    });
  },
  passwordInput(e) {
    this.setData({
      password: dataTransformer.trimString(e.detail.value),
    });
  },
  formSubmit() {
    let params = { "DDUserId": app.globalData.userid, "Username": this.data.username, "Password": this.data.password,"ERPUserId":"" };
    console.log(JSON.stringify(params));
    let _this=this;
    this.setData({
      isDisableLoginBtn: true
    });
    //这里向后台传送user name 和 password 和 userid 传过来成功时赋值过程中将用户验证设置为true app.globalData.isUserAuthorized
    mypromise.post("https://erpm.bb-pco.com/api/login/login", params)
      .then(function(jsondata) {
        dd.alert({ title: "获取用户数据", content: JSON.stringify(jsondata) });
        if (jsondata.status == "Success") {
          var data = jsondata.data;
          app.globalData.employeeId = data.erpUserID;
          app.globalData.employeeName = data.erpUserName;
          app.globalData.departmentId = data.departmentId;
          app.globalData.departmentName = data.departmentName;
          app.globalData.workNumber = data.workNumber;
          app.globalData.isUserAuthorized = true;
          dd.redirectTo({
            url: '/pages/index/index'
          })
        }
      }, function(err) {
        _this.setData({
          isDisableLoginBtn: false
        });
        dd.alert({ title: "用户登录失败", content: JSON.stringify(err) })
      });
  }
});
