import mypromise from '/pages/utils/Promise.js';

Page({
  data: {
    choosedTodoList: []
  },
  onLoad() {
 
  },
  onChangeDay(dayData,dayObj){
    let choosedTodoList = dayData.todoList;
    this.setData({
      'choosedTodoList': choosedTodoList,
      'specificDay':dayObj.curYear+'-'+dayObj.curMonth+'-'+dayObj.curDate
    });
  },
  handleListItemClick(event){
    var idx=event.target.dataset.idx;
      
    dd.navigateTo({
      url: '/pages/orderdetail/orderdetail?detail=' + JSON.stringify(this.data.choosedTodoList[idx]) + '&day=' + this.data.specificDay
    })
  }
});
