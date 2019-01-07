let app = getApp();
import mypromise from '/pages/utils/Promise.js';

Component({
  mixins: [],
  data: {
    username: "登录",
    showDropdown: false,
    cantapLoginButton: false,
    dropdownData:
    {
      data:
        [
          { title: '注销' }
        ],
      selectedItem: ''
    }
  },
  props: {
    title:""
  },
  didMount() {
    let username = app.globalData.employeeName;
    let userid = app.globalData.userid;
    let isAuthorized = app.globalData.isUserAuthorized;
    if (!isAuthorized) {
      this.getUserInfoFromBackEnd();
    }
    if (username != "" && isAuthorized) {
      this.setData({
        "username": app.globalData.employeeName,
        "cantapLoginButton": true
      });
    }
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    login(e) {
      var canLogin = this.data.cantapLoginButton;
      if (canLogin) {
        if (e.currentTarget.id == "headtext") {
          let _this = this;
          if (app.globalData.userid != "" && (!app.globalData.isUserAuthorized)) {
            dd.redirectTo({
              url: '/pages/login/login'
            })
          } else {
            this.setData({
              "showDropdown": true
            });
          }
        }
      }
    },
    getUserInfoFromBackEnd() {
      let _this = this;
      _this.getUserDDId()
        .then(
          function(data) {
            let requestUserInfoUrl = "https://erpm.bb-pco.com/api/login?DDUserId=" + app.globalData.userid;
            return mypromise.get(requestUserInfoUrl);
          },
          function(err) {
            dd.alert({ title: "钉钉账号获取失败", content: JSON.stringify(err) });
            _this.setData({
              "cantapLoginButton": true
            });
          })
        .then(
          function(jsondata) {
            if (jsondata.status == "Success") {
              var data = jsondata.data;
              app.globalData.employeeId = data.erpUserID;
              app.globalData.employeeName = data.erpUserName;
              app.globalData.departmentId = data.departmentId;
              app.globalData.departmentName = data.departmentName;
              app.globalData.workNumber = data.workNumber;
              app.globalData.isUserAuthorized = true;
              _this.setData({
                "username": app.globalData.employeeName,
                "cantapLoginButton": true
              });
            }
            else {
              dd.alert({ title: "用钉钉账号获取用户信息失败，请点击左上角的登录按钮以密码登录", content: JSON.stringify(jsondata) });
              console.log("get uesr info by dd user id not success----" + JSON.stringify(jsondata));
            }
            _this.setData({
              "cantapLoginButton": true
            });
          },
          function(err) {
            console.log("get user info exception----" + JSON.stringify(err));
            _this.setData({
              "cantapLoginButton": true
            });
          });
    },
    getUserDDId() {
      let _this = this;
      const p = new Promise(function(resolve, reject) {
        dd.getAuthCode({
          success: (res) => {
            app.globalData.authcode = res.authCode;
            let authCodeUrl = "https://oapi.dingtalk.com/gettoken?appkey=" + app.globalData.appKey + "&appsecret=" + app.globalData.appValue;
            return mypromise.get(authCodeUrl)
              .then(function(data) {
                if (data.access_token) {
                  app.globalData.access_token = data.access_token;
                  let userIdUrl = "https://oapi.dingtalk.com/user/getuserinfo?access_token=" + app.globalData.access_token + "&code=" + app.globalData.authcode;
                  return mypromise.get(userIdUrl);
                }
              })
              .then(function(data) {
                app.globalData.userid = data.userid;//钉钉号ID
                app.globalData.deviceId = data.deviceId;//钉钉系统存储的设备ID
                resolve(data);
              })
          },
          fail: (err) => {
            console.log("get auth code failed----" + JSON.stringify(err));
            dd.alert({ title: "获取用户免登验证码失败", content: JSON.stringify(err) });
            reject(err);
          }
        });
      });
      return p;
    },
    _catchListItemTap: function(e) {
      let _this = this;
      const { index, title } = e.currentTarget.dataset;
      if (index == 0 && title == "注销") {
        let logoutUrl = "https://erpm.bb-pco.com/api/login/logout";
        let logoutPostData = { "DDUserId": app.globalData.userid, "ERPUserId": app.globalData.employeeId, "Username": "", "Password": "" };
        if (app.globalData.userid != "" && app.globalData.employeeId != "") {
          mypromise.post(logoutUrl, logoutPostData).then(function(data) {
            if (data.data.statusCode == "1") {
              app.clearGlobalData();
              _this.setData({
                "showDropdown": false,
                "username": "登录"
              });
              dd.alert({ title: "注销成功", content: "请点击左上角按钮重新登录" });
            } else {
              dd.alert({ title: "注销失败", content: "请检查网络设置或联系IT部门" });
            }
          });
        }
      }
    },
    _catchBgTap: function() {
      this.setData({
        "showDropdown": false
      });
    },
  },
});
