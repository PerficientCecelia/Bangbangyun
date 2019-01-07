let app = getApp();
import mypromise from '/pages/utils/Promise.js';

Component({
  mixins: [],
  data: {
    weeksCh: ["日", "一", "二", "三", "四", "五", "六"],
    curDayObj: {}
  },
  props: {
    onChangeDay:(day)=>{console.log(day);}
  },
  didMount() {
    let today = this.calculateToday("2018", "09", "03");
    this.setData({
      curDayObj: today
    });

    this.initDaysView("2018", "09", "03");
  },
  didUpdate(prevProps, prevData) {
  },
  didUnmount() { },
  methods: {
    onTapDay(e) {
      let columnIndex = e.currentTarget.dataset.idx;
      let lineIndex = e.currentTarget.dataset.parentidx;
      let oldLineIndex = this.data.curDayObj.lineIndex;
      let oldColumnIndex = this.data.curDayObj.columnIndex;
      let oldChoosedKey = 'days[' + oldLineIndex + '][' + oldColumnIndex + '].choosed';
      let newChoosedKey = 'days[' + lineIndex + '][' + columnIndex + '].choosed';
      let choosedDayViewObj = this.data.days[lineIndex][columnIndex];
      let choosedDay = this.calculateToday(this.data.curDayObj.curYear, this.data.curDayObj.curMonth, choosedDayViewObj.day);
      this.props.onChangeDay(choosedDayViewObj,choosedDay);
      this.setData({
        [oldChoosedKey]: "",
        [newChoosedKey]: "choosed",
        curDayObj: choosedDay
      });
    },
    initDaysView(year, month, day) {
      let _this = this;
      let thisMonthLastDay = this.getThisMonthDays(year, parseInt(month));
      let thisMonthFirstDateString = year + "-" + month + "-" + "01";
      let thisMonthLastDateString = year + "-" + month + "-" + thisMonthLastDay;

      let getOrderDataUrl = "https://erpm.bb-pco.com/api/ordercalendar/orders?ERPUserId="
        + app.globalData.employeeId
        + "&TimeFrom=" + thisMonthFirstDateString
        + "&TimeTo=" + thisMonthLastDateString;

      let dayObj;
      let dayList;
      mypromise.get(getOrderDataUrl)
        .then(function(jsondata) {
          if (jsondata.status == "Success") {
            dayList = jsondata.data;
            dayObj = _this.initiateDays(year, month, day, dayList, true);
          } else {
            dayObj = _this.initiateDays(year, month, day, dayList, false);
          }
          _this.setData({
            "days": dayObj,
          }
          );
        });
    },
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
      let firstDayOfWeek = this.getFirstDayOfWeek(year, parseInt(month));
      let emptyGridsCount;
      if (firstDayOfWeek != 7) {
        emptyGridsCount = firstDayOfWeek;
      } else {
        emptyGridsCount = 0;
      }
      var daysOfLastMonth = this.getThisMonthDays(year, parseInt(month) - 1);
      for (var i = emptyGridsCount; i > 0; i--) {
        emptyGrids.push(daysOfLastMonth - i + 1);
      }
      return emptyGrids;
    },
    calculateThisMonthDays(year, month, curDate, dayList, hasDayList) {
      let days = [];
      let daysofThisMonth = this.getThisMonthDays(year, parseInt(month));
      for (var i = 1; i <= daysofThisMonth; i++) {
        let thisday = this.calculateDayObj(year, month, curDate, dayList, hasDayList, i);
        days.push(thisday);
      }
      return days;
    },
    calculateDayObj(year, month, curDate, dayList, hasDayList, i) {
      let thisday;
      if (hasDayList) {
        let key = year + "-" + this.checkTime(month) + "-" + this.checkTime(i);
        let thisDayObj = dayList.find(d => d.day == key);
        let isShowTodoLabel = false;
        let todoCount = 0;
        let thisDayList = [];
        if (thisDayObj != undefined) {
          isShowTodoLabel = true;
          todoCount = thisDayObj.todoCount;
          thisDayList = thisDayObj.list;
        }
        thisday = { day: i, "showTodoLabel": isShowTodoLabel, "toDoCount": todoCount, "todoList": thisDayList };
      } else {
        thisday = { day: i, "showTodoLabel": false };
      }

      if (i == curDate) {
        thisday["choosed"] = "choosed";
        if (hasDayList)
          this.props.onChangeDay(thisday,{"curYear":year,"curMonth":month,"curDate":curDate});
      }
      return thisday;
    },
    initiateDays(year, month, curDate, dayList, hasDayList) {
      let days = this.calculateThisMonthDays(year, month, curDate, dayList, hasDayList);
      let emptyDays = this.calculateEmptyGrids(year, month);
      let lastEmptyGrids = this.calculateLastEmpltyDays(year, month);
      days.splice(0, 0, ...emptyDays);
      days = days.concat(...lastEmptyGrids);
      let dayObject = [];
      for (var j = 0; j < days.length - 1; j++) {
        if (j % 7 == 0) {
          let thispart = days.slice(j, j + 7);
          dayObject.push(thispart);
        }
      }
      return dayObject;
    },
    calculateLastEmpltyDays(year, month) {
      let firstDayOfNextMonth = this.getFirstDayOfWeek(year, parseInt(month) + 1);
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
    calculateToday(setYear, setMonth, setDay) {
      const date = new Date(setYear, parseInt(setMonth) - 1, setDay);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const weekDay = date.getDay();
      const lineIndex = this.calculateLineIndex(year, month, day);
      return {
        curYear: year,
        curMonth: month,
        curDate: day,
        curWeekDay: weekDay,
        lineIndex: lineIndex,
        columnIndex: weekDay
      }
    },
    calculateLineIndex(year, month, day) {
      let firstDayOfWeek = this.getFirstDayOfWeek(year, parseInt(month));
      let emptyGridsCount;
      if (firstDayOfWeek != 7) {
        emptyGridsCount = firstDayOfWeek;
      } else {
        emptyGridsCount = 0;
      }
      var totalDay = parseInt(day) + emptyGridsCount;
      var lineIndex = totalDay / 7;
      if (parseInt(lineIndex) == lineIndex) {
        lineIndex = lineIndex - 1;
      } else {
        lineIndex = parseInt(lineIndex);
      }
      return lineIndex;
    },
    checkTime(i) {
      if (parseInt(i) < 10) { i = "0" + parseInt(i) }
      return i
    }
  }
});
