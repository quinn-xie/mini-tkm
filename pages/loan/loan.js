Page({
  data: {
    "tkmYX": "小马优选",
    "tkmYC": "小马有财",
    "tkmJS": "小马集市",
    "loanYXList":[{
      currentTime: '',
      endTime: '',
      clock: ''
    }],
    "loanYCList": [{
      currentTime: '',
      endTime: '',
      clock: ''
    }],
    "loanJSList": [{
      currentTime: '',
      endTime: '',
      clock: ''
    }],
    "thisItem":"1",
    jsnodata:false,
    jshavedata:false,
    loanYXpage:'1',
    loanYCpage: '1',
    loanJSpage: '1',
    YXonReachBottom: false,
    YConReachBottom: false,
    JSonReachBottom: false
  },
  onLoad(options){
    let that = this;
    that.loanPacket();
    wx.getStorage({
      key: 'id',
      success: function (res) {
        that.setData({
          thisItem: res.data
        });
        if (res.data == 1){
          that.loanPacket();
        } else if (res.data == 2){
          that.loansign();
        } else if (res.data == 3) {
          that.transfer();
        }
      }
    })      
  },
  tkmyxTap(e){
    this.loanPacket();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  tkmycTap(e) {
    this.loansign();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  tkmjsTap(e) {
    this.transfer();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  /***下拉刷新***/
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //console.log(this.data.thisItem);
    //模拟加载
    if (this.data.thisItem == 1) {
      this.loanPacket();
    } else if (this.data.thisItem == 2) {
      this.loansign();
    } else if (this.data.thisItem == 3) {
      this.transfer();
    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  //上拉加载更多
  onReachBottom() {   
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (this.data.thisItem == 1) {
      this.loadPacketUpdateMore();
    } else if (this.data.thisItem == 2) {
      this.loansignUpdateMore();
    } else if (this.data.thisItem == 3) {
      this.transferUpdateMore();
    }
    wx.hideNavigationBarLoading() //完成停止加载
  },  


  toDetail(e){
    console.log(e)
    var loanId = e.currentTarget.dataset.loansignid
    wx.navigateTo({
      url: "/pages/loanDetail/loanDetail?loanId=" + loanId
    })
  },
  toPacketDetail(e){
    var loanId = e.currentTarget.dataset.loanid
    wx.navigateTo({
      url: "/pages/loanPacketDetail/loanPacketDetail?loanId=" + loanId
    })
  },
  //小马优选数据加载
  loanPacket() {
    let that = this;
    that.loanYXList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
    wx.request({
        //url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanList-yx',
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loanPacket/list?pageNumber=1&pageSize=10&projectStatus=null&projectDuration=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log(res.data)
          var loanPacketList = res.data.data.loanPacketList;
          for (let i = 0; i < res.data.data.loanPacketList.length; i++) {
            loanPacketList[i].yearRate = returnFloat(res.data.data.loanPacketList[i].yearRate * 100);
            loanPacketList[i].increasedRate = returnFloat(res.data.data.loanPacketList[i].increasedRate * 100);
            loanPacketList[i].restInvestAmount = formatMoney(res.data.data.loanPacketList[i].restInvestAmount / 10000);
            loanPacketList[i].borrowedMoney = formatMoney(res.data.data.loanPacketList[i].borrowedMoney / 10000);
            loanPacketList[i].endTime = new Date(res.data.data.loanPacketList[i].publishTime).getTime();
            loanPacketList[i].currentTime = new Date(res.data.data.loanPacketList[i].currentTime).getTime();
          }
          that.setData({
            loanYXList: loanPacketList,
          });       
          wx.hideLoading();
          loanYXListCountdown(that);//调用倒计时     
        },
        fail: function (err) {},//请求失败
        complete: function () {}//请求完成后执行的函数
      });
    
  },
  //小马优选加载更多
  loadPacketUpdateMore(){
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.loanYXpage++
    wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loanPacket/list?pageNumber=' + that.data.loanYXpage + '&pageSize=10&projectStatus=null&projectDuration=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var moment_list = that.data.loanYXList;
        if (res.data.data.loanPacketList.length == 0) {
          that.setData({
            YXonReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.loanPacketList.length; i++) {
          res.data.data.loanPacketList[i].yearRate = returnFloat(res.data.data.loanPacketList[i].yearRate * 100);
          res.data.data.loanPacketList[i].increasedRate = returnFloat(res.data.data.loanPacketList[i].increasedRate * 100);
          res.data.data.loanPacketList[i].restInvestAmount = formatMoney(res.data.data.loanPacketList[i].restInvestAmount / 10000);
          res.data.data.loanPacketList[i].borrowedMoney = formatMoney(res.data.data.loanPacketList[i].borrowedMoney / 10000);
          res.data.data.loanPacketList[i].endTime = new Date(res.data.data.loanPacketList[i].publishTime).getTime();
          res.data.data.loanPacketList[i].currentTime = new Date(res.data.data.loanPacketList[i].currentTime).getTime();
          moment_list.push(res.data.data.loanPacketList[i]);
        }
        // 设置数据  
        that.setData({
          loanYXList: that.data.loanYXList
        })
        // 隐藏加载框  
        wx.hideLoading();
        loanYXListCountdown(that);//调用倒计时
      }
    })
  },

  //小马有财数据加载
  loansign() {
    let that = this;
    that.loanYCList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
      wx.request({
      //url:'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanList-yc',
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/list?pageNumber=1&pageSize=10&projectStatus=null&projectDuration=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data)
          var loanSignList = res.data.data.loanSignList;
          for (let i = 0; i < res.data.data.loanSignList.length; i++) {
            loanSignList[i].yearRate = returnFloat(res.data.data.loanSignList[i].yearRate * 100)
            loanSignList[i].increasedRate = returnFloat(res.data.data.loanSignList[i].increasedRate * 100)
            loanSignList[i].restInvestAmount = formatMoney(res.data.data.loanSignList[i].restInvestAmount / 10000)
            loanSignList[i].borrowedMoney = formatMoney(res.data.data.loanSignList[i].borrowedMoney / 10000)
            loanSignList[i].endTime = new Date(res.data.data.loanSignList[i].publishTime).getTime();
            loanSignList[i].currentTime = new Date(res.data.data.loanSignList[i].currentTime).getTime();
          }
          that.setData({
            loanYCList: [],
            loanYCList: loanSignList
          });
          loanYCListCountdown(that);//调用倒计时 
          wx.hideLoading();
        },
        fail: function (err) {},//请求失败
        complete: function () {}//请求完成后执行的函数
      });
    
  },

  //小马有财加载更多
  loansignUpdateMore() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.loanYCpage++
    wx.request({
      url:'https://qianduan-uat.taikongma.com/mobile/app/loansign/list?pageNumber='+ that.data.loanYCpage+'&pageSize=10&projectStatus=null&projectDuration=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data)
        var moment_list = that.data.loanYCList;
        if (res.data.data.loanSignList.length == 0) {
          that.setData({
            YConReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.loanSignList.length; i++) {
          res.data.data.loanSignList[i].yearRate = returnFloat(res.data.data.loanSignList[i].yearRate * 100);
          res.data.data.loanSignList[i].increasedRate = returnFloat(res.data.data.loanSignList[i].increasedRate * 100);
          res.data.data.loanSignList[i].restInvestAmount = formatMoney(res.data.data.loanSignList[i].restInvestAmount / 10000);
          res.data.data.loanSignList[i].borrowedMoney = formatMoney(res.data.data.loanSignList[i].borrowedMoney / 10000);
          res.data.data.loanSignList[i].endTime = new Date(res.data.data.loanSignList[i].publishTime).getTime();
          res.data.data.loanSignList[i].currentTime = new Date(res.data.data.loanSignList[i].currentTime).getTime();
          moment_list.push(res.data.data.loanSignList[i]);
        }
        // 设置数据  
        that.setData({
          loanYCList: that.data.loanYCList
        })
        // 隐藏加载框  
        wx.hideLoading();
        loanYCListCountdown(that);//调用倒计时
      }
    })
  },

  //小马集市数据加载
  transfer() {
    let that = this;
    that.loanJSList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/transfer/list?pageNumber=1&pageSize=10&leftDay=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data:{},
        header: {
         'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log(res.data)
          var transferVoList = res.data.data.transferVoList;
          if (transferVoList.length == 0) {
            that.setData({
              jsnodata: true
            });
          } else {
            that.setData({
              jshavedata: true
            });
          };
          for (let i = 0; i < res.data.data.transferVoList.length; i++) {
            transferVoList[i].yearRate = returnFloat(res.data.data.transferVoList[i].yearRate * 100);
            transferVoList[i].increasedRate = returnFloat(res.data.data.transferVoList[i].increasedRate * 100);
            transferVoList[i].surplusMoney = formatMoney(res.data.data.transferVoList[i].surplusMoney / 10000);
          };
          that.setData({
            loanJSList: [],
            loanJSList: transferVoList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },

  //小马集市加载更多
  transferUpdateMore() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.loanJSpage++
    wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/transfer/list?pageNumber=' + that.data.loanJSpage + '&pageSize=10&leftDay=0&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-TEST',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data)
        var moment_list = that.data.loanJSList;
        if (res.data.data.transferVoList.length == 0) {
          that.setData({
            JSonReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.transferVoList.length; i++) {
          res.data.data.transferVoList[i].yearRate = returnFloat(res.data.data.transferVoList[i].yearRate * 100);
          res.data.data.transferVoList[i].increasedRate = returnFloat(res.data.data.transferVoList[i].increasedRate * 100);
          res.data.data.transferVoList[i].surplusMoney = formatMoney(res.data.data.transferVoList[i].surplusMoney / 10000);
          moment_list.push(res.data.data.transferVoList[i]);
        }
        // 设置数据  
        that.setData({
          loanJSList: that.data.loanJSList
        })
        // 隐藏加载框  
        wx.hideLoading();
      }
    })
  },

})

//格式化年利率
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".0";
    return value;
  } else if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString();
    }
    return value;
  }
};

//格式化金额
function formatMoney(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  } else if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString()+"0";
    }
    return value;
  }
};

//小马优选倒计时效果
function loanYXListCountdown(that) {
  var loanData = that.data.loanYXList;
  var count = 0;
  for (let i = 0; i < loanData.length; i++) {
    var loan = loanData[i];
    var EndTime = loan.endTime;
    var CurrentTime = loan.currentTime;
    var total_micro_second = EndTime - CurrentTime;
    if (loan.loanState=='6'){
      if (total_micro_second > 0) {
        total_micro_second -= 1000;
        loan.clock = dateformat(total_micro_second);
        loan.currentTime = parseInt(CurrentTime) + parseInt(1000);
      } else {
        loan.loanState = "2";
        loan.loanStateString = "投标中";
        count += 1;
      }
    }
  }
  that.setData({
    loanYXList: [],
    loanYXList: loanData
  });
  if (count < loanData.length) {
    setTimeout(function () {
      loanYXListCountdown(that);
    }, 1000)
  }
};

//小马优选倒计时效果
function loanYCListCountdown(that) {
  var loanData = that.data.loanYCList;
  var count = 0;
  for (let i = 0; i < loanData.length; i++) {
    var loan = loanData[i];
    var EndTime = loan.endTime;
    var CurrentTime = loan.currentTime;
    var total_micro_second = EndTime - CurrentTime;
    if (loan.loanState == '6'){
      if (total_micro_second > 0) {
        total_micro_second -= 1000;
        loan.clock = dateformat(total_micro_second);
        loan.currentTime = parseInt(CurrentTime) + parseInt(1000);
      } else {
        loan.loanState = "2";
        loan.loanStateString = "投标中";
        count += 1;
      }
    }    
  }
  that.setData({
    loanYCList: [],
    loanYCList: loanData
  });
  if (count < loanData.length) {
    setTimeout(function () {
      loanYCListCountdown(that);
    }, 1000)
  }
};

// 时间格式化输出，每1s都会调用一次
function dateformat(micro_second) {
  function formatTime(m) { return m < 10 ? '0' + m : m }
  var second = Math.floor(micro_second / 1000);// 总秒数
  var day = Math.floor(second / 3600 / 24);// 天数
  var hr = Math.floor(second / 3600 % 24);// 小时
  var min = Math.floor(second / 60 % 60);// 分钟
  var sec = Math.floor(second % 60);// 秒
  return day + "天" + formatTime(hr) + ":" + formatTime(min) + ":" + formatTime(sec);
};