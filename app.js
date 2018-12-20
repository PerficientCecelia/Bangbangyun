
import loginData from '/testdata/login.js';
App({
  globalData: {
    appKey: "dingdajn17seowhnh0iw",
    appValue: "q8KjRIRJTBYzDcvbu5tbdLIjMKTp6wczXzo3ZwyZ0D7wOwhrLvF6tZtM_9ixSwJf",
    userid: "",
    authcode: "",
    access_token: "",
    deviceId: "",
    employeeId: "",
    employeeName: "",
    departmentId: "",
    departmentName: "",
    workNumber:"",
    isUserAuthorized:false
  },
  clearGlobalData(){
    this.globalData.employeeId="";
    this.globalData.employeeName="";
    this.globalData.departmentId="";
    this.globalData.departmentName="";
    this.globalData.workNumber="";
    this.globalData.isUserAuthorized=false;
  }
  
});
