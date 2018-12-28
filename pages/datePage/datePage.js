import calendarConfig from "../templates/calendar/calendar.js";
import mypromise from '/pages/utils/Promise.js';

Page({
  data: {
    calendarData:{
      weeksCh:["日","一","二","三","四","五","六"],
      days: [],  
    },
    choosedTodoList: []
  },
  onLoad() {
     
    // var today=calendarConfig.calculateToday();
    // this.setData(today);
    // //这里改为异步方法  todolater
    // var days = calendarConfig.initiateDays(today.curYear, today.curMonth,today.curDate);
    // this.setData({
    //   "calendarData.days":days,
    //   "calendarData.curYear": today.curYear,
    //   "calendarData.curMonth": today.curMonth
    // })
    // this.findTodayTodoList();
    // console.log(this.data.calendarData);
  },
  findTodayTodoList(){
    for (var i = 0; i < this.data.calendarData.days.length;i++){
      var day = this.data.calendarData.days[i];
      if (day["day"] == this.data.curDate){
          this.setData({
            "choosedTodoList": day["todoList"]
          }
        );
      }
    }
  },
  handleListItemClick(event){
      var idx=event.target.dataset.idx;
      
    dd.navigateTo({
      url: '/pages/orderdetail/orderdetail?detail=' + JSON.stringify(this.data.choosedTodoList[idx])
    })
  }
});
