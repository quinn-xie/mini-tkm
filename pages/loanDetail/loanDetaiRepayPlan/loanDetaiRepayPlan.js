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
    repayPlan:{},
    loanId: '',
    nodata: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loanId: options.loanId
    });
    this.loadData()
  },
  
  //数据加载
  loadData() {
    let that = this;
    that.repayPlan = {};
    //console.log(that.data.loanId)
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/repayment/record?loanSignId='+that.data.loanId+'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log(res.data)
          if (res.data.data.repaymentRecordPage.length == 0) {
            that.setData({
              nodata: true
            });
          } else {
            that.setData({
              nodata: false
            });
          };
          that.setData({
            repayPlan:{},
            repayPlan: res.data.data.repaymentRecordPage
          });
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
})