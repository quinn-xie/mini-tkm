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
// 项目详情
Page({

  /**
   * 页面的初始数据
   */
  data: {
      baseInfo:{},
      loanId:'',
      clock: '',
      endTime: '',
      currentTime: ''
  },
  /**
   * 数据接口调用
  */
  loadData() {
    let that = this;
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      //url:'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanDetails',
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loanPacket/loanPacketDatail?loanSignPacketId='+that.data.loanId+'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data:{},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log(res)
          var loanPacketList = res.data.data;
          loanPacketList.yearRate = returnFloat(res.data.data.yearRate * 100);
          loanPacketList.increasedRate = returnFloat(res.data.data.increasedRate * 100);
          loanPacketList.restInvestAmount = formatMoney(res.data.data.restInvestAmount / 10000);
          loanPacketList.borrowedMoney = formatMoney(res.data.data.borrowedMoney / 10000);
          that.setData({
            baseInfo: loanPacketList,
            endTime: new Date(res.data.data.publishTime).getTime(),
            currentTime: new Date(res.data.data.currentTime).getTime(),
          });
          console.log(that.data.baseInfo)
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
    countdown(that)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loanId: options.loanId
    })
    console.log(options.loanId)
    this.loadData();
  },
  /***下拉刷新***/
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.loadData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  /**
   * 项目详情点击
   */
  loanDetailMsg(e){
    //console.log(e)
    var loanId = e.currentTarget.dataset.loanid;
    wx.navigateTo({
      url: '/pages/loanPacketDetail/loanPacketMsg/loanPacketMsg?loanId=' + loanId
    })
  },
  /**
   * 优选介绍点击
   */
  loanDetailInfo(e){
    var loanId = e.currentTarget.dataset.loanid;
    wx.navigateTo({
      url: '/pages/loanPacketDetail/loanPacketInfo/loanPacketInfo?loanId=' + loanId
    })
  },
  /**
   * 项目列表点击
   */
  loanDetailInvestRecord(e){
    var loanId = e.currentTarget.dataset.loanid;
    wx.navigateTo({
      url: '/pages/loanPacketDetail/loanPacketList/loanPacketList?loanId=' + loanId
    })
  }
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
      value = value.toString() + "0";
    }
    return value;
  }
};

//倒计时效果
function countdown(that) {
  var EndTime = that.data.endTime;
  var CurrentTime = that.data.currentTime;
  var total_micro_second = EndTime - CurrentTime;
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }, 1000)
  if (that.data.baseInfo.loanState == '6'){
    if (total_micro_second > 0) {
      that.setData({
        currentTime: parseInt(CurrentTime) + parseInt(1000),
        clock: dateformat(total_micro_second)
      });
    } else {
      that.setData({
        'baseInfo.loanState': "2",
        'baseInfo.loanStateString': "投标中"
      });
    }
  }
  
}

// 时间格式化输出，每1s都会调用一次
function dateformat(micro_second) {
  function formatTime(m) { return m < 10 ? '0' + m : m }
  var second = Math.floor(micro_second / 1000);// 总秒数
  var day = Math.floor(second / 3600 / 24);// 天数
  var hr = Math.floor(second / 3600 % 24);// 小时
  var min = Math.floor(second / 60 % 60);// 分钟
  var sec = Math.floor(second % 60);// 秒
  return day + "天" + formatTime(hr) + ":" + formatTime(min) + ":" + formatTime(sec);
}