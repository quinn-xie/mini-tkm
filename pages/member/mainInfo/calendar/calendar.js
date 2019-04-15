/*
  *======@Description:       太空马小程序======*
  *======@Version:                v1.0.0======*
  *======@Author:                  DaXia======*
  ---------------------------------------------
  ========***=============**======**===========
  ========**=============**==************======
  ===***************====**=====**=**=**========
  ======**=**=========****=****************====
  =====**===**===========**=====**==**=========
  ====**=====***=========**====**====**========
  ===**=======****=======**==***======**=======
  ---------------------------------------------
*/
var app = getApp();
Page({
  data: {
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    thisdate: [201869,2018612,2018620]
  },
  onLoad: function (options) {
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '-' + (currentObj.getMonth() + 1) + '-' + currentObj.getDate(),
      currentDay: currentObj.getDate(),
      currentObj: currentObj      
    })
    this.setSchedule(currentObj)
  },
  doDay: function (e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '-' + (currentObj.getMonth() + 1) + '-' + currentObj.getDate(),
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = []
    var f = 0
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1
          f = currentDayList[i]
          //console.log(currentDayList)
          // var dd = Y + '' + m + '' + f;
          // console.log(arr2)
          //  for (var k = 0; k < this.data.thisdate.length; k++) {
          //    if (dd == this.data.thisdate[k]){
          //     this.data.shoukuan = 1
          //    }
          //  }
          // for (var i = 0; i <= currentDayNum; i++) {
          //   currentDayList.push({ name: currentDayList[i] });
          // };
          console.log(currentDayList)

        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }

        

      }
    }
    that.setData({
      currentDayList : currentDayList
    })
    

    let daysOfMonth = [];
    let days = [];
    let fullYear = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let lastDayOfMonth = new Date(fullYear, month, 0).getDate();
    for (var i = 1; i <= lastDayOfMonth; i++) {
      daysOfMonth.push(fullYear + '' + month + ''  + i);
    };
    
    // for (let k = 0; k < daysOfMonth.length;k++){
    //   for (let j = 0; j < this.data.thisdate.length; j++) {
    //     if(daysOfMonth[k] == this.data.thisdate[1]){
    //       console.log(this.data.shoukuan)
    //     }
    //   }
    // }

    //console.log(daysOfMonth)
  }  
})  