
var calendarConfig = {

  /* 要实现一个日历 要知道3点
   1：这个月有多少天
   2：这个月第一天星期几
   3：这个月第一天之前有多少天
  */
  /* 根据需求 我们要考虑几种情况
   1：当到这个月第一天或者最后一天的时候，是否需要显示前几天和后几天
      如果需要，在计算calculateEmptyGrids 第一天是星期天时，emptyGridsCount=7
               并且在这个月最后一天加上lastEmptyGridCount
   2：
   3：
  */
  /**
    * 计算指定月份共多少天
    * @param {number} year 年份
    * @param {number} month  月份
    */
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },

  /**
  * 计算指定月份第一天星期几
  * @param {number} year 年份
  * @param {number} month  月份
  */
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  /**
   * 计算指定日期星期几
	 * @param {number} year 年份
	 * @param {number} month  月份
   * @param {number} date 日期
   */
  getDayOfWeek(year, month, date) {
    return new Date(Date.UTC(year, month - 1, date)).getDay();
  },

  /**
   * 这个月第一天之前有多少天
	 * @param {number} year 年份
	 * @param {number} month  月份
   */
  calculateEmptyGrids(year, month) {
    let emptyGrids = [];
    let firstDayOfWeek = calendarConfig.getFirstDayOfWeek(year, month);
    let emptyGridsCount;
    if (firstDayOfWeek != 7) {
      emptyGridsCount = firstDayOfWeek;
    } else {
      emptyGridsCount = 0;
    }
    var daysOfLastMonth = calendarConfig.getThisMonthDays(year, month - 1);
    for (var i = emptyGridsCount; i > 0; i--) {
      emptyGrids.push(daysOfLastMonth - i + 1);
    }
    return emptyGrids;
  },
  calculateThisMonthDays(year, month, curDate) {
    let days = [];
    let daysofThisMonth = calendarConfig.getThisMonthDays(year, month);
    for (var i = 1; i <= daysofThisMonth; i++) {
      let thisday = { day: i, "showTodoLabel": true, "toDoCount": 2 };
      if (i == curDate) {
        thisday["choosed"]="choosed";
      }
      days.push(thisday);
    }
    return days;
  },
  initiateDays(year, month, curDate) {
    let days = calendarConfig.calculateThisMonthDays(year, month, curDate);
    let emptyDays = calendarConfig.calculateEmptyGrids(year, month);
    let lastEmptyGrids = calendarConfig.calculateLastEmpltyDays(year, month);
    days.splice(0, 0, ...emptyDays);
    days = days.concat(...lastEmptyGrids);
    let dayObject = [];
    for (var j = 0; j < days.length - 1; j++) {
      if (j % 7 == 0) {
        let thispart = days.slice(j, j + 7);
        dayObject.push(thispart);
      }
    }
    // for (var i = 0; i < daysofThisMonth; i++) {

    //   var day = { "day": i + 1, "showTodoLabel": true, "toDoCount": 2, "todoList": [
    //     { "date": "2015/08/25", "location": "东山大酒店", "projectNumber": "XMD-201809889034", "projectName": "东山大酒店", "projectType": "鼠、蜂、蚊蝇", "projectPlanedStartTime": "2018/09/25 15:30", "projectPlanedEndTime": "2018/09/25 18:30", "report": "", "serviceDetail": ["区域: 厨房 三合一 投放25g","区域: 客厅 粘鼠板 布放 2张"]},
    //     { "date": "2015/08/26", "location": "东里巴巴办公大楼 服务处", "projectNumber": "XMD-2018902834904", "projectName": "阿里巴巴办公大楼", "projectType": "鼠、蜂、蚊蝇", "projectPlanedStartTime": "2018/09/25 15:30", "projectPlanedEndTime": "2018/09/25 18:30", "report": "", "serviceDetail": ["区域: 厨房 三合一 投放25g", "区域: 客厅 粘鼠板 布放 2张"] }
    //   ] };
    //   if (i + 1 == curDate) {
    //      day["choosed"]="choosed";
    //   }
    //   days.push(day);
    // } 
    return dayObject;
  },
  calculateLastEmpltyDays(year, month) {
    let firstDayOfNextMonth = calendarConfig.getFirstDayOfWeek(year, month + 1);
    let nextMonthDays = [];
    let emptyGridsCount;
    if (firstDayOfNextMonth != 7) {
      emptyGridsCount = 7 - firstDayOfNextMonth;
    } else {
      emptyGridsCount = 0;
    }
    for (var i = 0; i < emptyGridsCount; i++) {
      nextMonthDays.push("");
    }
    return nextMonthDays;
  },
  calculateTime: function() {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const curDate = date.getDate();
    const h = date.getHours();
    const m = checkTime(date.getMinutes());
    const s = checkTime(date.getSeconds());
    const timestamp = new Date(curYear, curMonth, curDate).getTime();
    function checkTime(i) {
      if (i < 10) { i = "0" + i }
      return i
    }

    return {
      curYear: curYear,
      curDate: curDate,
      curMonth: curMonth,
      curTimeStamp: timestamp,
      curHour: h,
      curMinite: m,
      curSeconds: s
    }
  },

  calculateToday() {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const curDate = date.getDate();
    return {
      curYear: curYear,
      curDate: curDate,
      curMonth: curMonth
    }
  },

  initDays: function(url, data, success, fail) {


  }



}

export default calendarConfig;