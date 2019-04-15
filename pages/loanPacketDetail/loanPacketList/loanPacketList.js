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
// 项目详情---还款计划
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repayPlan:[],
    loanId: '',
    loanSignId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loanId: options.loanId
    })
    this.loadData();
  },
  //点击进入详情
  toDetail(e) {
    //console.log(e)
    var loanId = e.currentTarget.dataset.loansignid
    wx.navigateTo({
      url: "/pages/loanDetail/loanDetail?loanId=" + loanId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //数据加载
  loadData() {
    let that = this;
    that.loanList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loanPacket/loanPacketDatail?loanSignPacketId=' + that.data.loanId+'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          var investmentList = res.data.data.investmentList;
          for (let i = 0; i < res.data.data.investmentList.length; i++) {
            investmentList[i].restInvestAmount = formatMoney(res.data.data.investmentList[i].restInvestAmount / 10000);
            investmentList[i].borrowedMoney = formatMoney(res.data.data.investmentList[i].borrowedMoney / 10000);
            that.setData({
              repayPlan: investmentList,
            });
          }          

          // that.setData({
          //   repayPlan: [],
          //   repayPlan: res.data.data.investmentList
          // });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /***下拉刷新***/
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //console.log(this.data.thisItem);
    //模拟加载
    this.loadData()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
});

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