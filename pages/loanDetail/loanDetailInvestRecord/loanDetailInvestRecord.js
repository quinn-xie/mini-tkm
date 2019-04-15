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
    investRecord:{},
    loanId: '',
    onReachBottom:false,
    page:"1",
    nodata:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      loanId: options.loanId
    });
    this.loadData()
  },

  //数据加载
  loadData() {
    let that = this;
    that.investRecord = {};
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/invest/record?loanSignId='+that.data.loanId+'&pageNumber=1&pageSize=10&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.data.investRecordPage.length == 0) {
            that.setData({
              nodata: true
            });
          } else {
            that.setData({
              nodata: false
            });
          };
          that.setData({
            investRecord: {},
            investRecord: res.data.data.investRecordPage
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


  //上拉加载更多
  onReachBottom() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.page++
    wx.request({
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/invest/record?loanSignId=' + that.data.loanId +'&pageNumber='+that.data.page+'&pageSize=10&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var moment_list = that.data.investRecord;
        if (res.data.data.investRecordPage.length == 0) {
          that.setData({
            onReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.investRecordPage.length; i++) {
          moment_list.push(res.data.data.investRecordPage[i]);
        }
        // 设置数据  
        that.setData({
          investRecord: that.data.investRecord
        })
        // 隐藏加载框  
        wx.hideLoading();
      }
    })    
    wx.hideNavigationBarLoading() //完成停止加载
  },
})