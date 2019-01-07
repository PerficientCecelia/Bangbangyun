import presentData from '/pages/utils/presentData.js';

Page({
  data: {},
  onLoad(options) {
    var day=options.day;
    var data = JSON.parse(options.detail);
    var orderList = this.processPresentableData(data);
    this.setData({
      "presentTableData.orderList": orderList,
      "presentTableData.focus":false,
      "presentTableData.disabled": true,
      "presentTableData.inputValue": day + data.projectName,
      "presentTableData.showHeadInput":true
    });
    var listTable = [{ key: '区域', value: '厨房' }, { key: '使用药剂', value: '三合一' }, { key: '使用器械', value: '/' }, { key: '药剂数量', value: '25g' }, { key: '现场照片', value: '/' }];
    this.setData({
      "listTableData.orderList": listTable,
      "listTableData.focus": false,
      "listTableData.disabled": true,
      "listTableData.inputValue": data.date + data.location,
      "listTableData.showHeadInput": false
    });
    console.log(orderList);
  },
  processPresentableData(valueList){
    var presentKey=presentData.orderDetail;
    var keyvalueList=[];
    for(var k in presentKey){
      let key = presentKey[k];
      let value = valueList[k];
      keyvalueList.push({key,value});
    }
    return keyvalueList;
  },
  convertToKeyValueList(data){
    let keyValueList=[];
     for(var item in data){
        let key=item;
        let value=data[item];
        if(Array.isArray(value))
         continue;
        keyValueList.push({key,value});
     }
    return keyValueList;
  },
  bindKeyInput(event){

  },
  bindConfirm(event){

  }
});
