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
////////////////////出借管理////////////////////
Page({
  /**
   * 页面的初始数据
   */
  data: {
    payment:"回款中",
    investment:"投标中",
    completed:"已完成",
    thisItem:"1",
    paymentList:[],
    investmentList: [],
    completedList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.loanList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementPaymentList', //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type':'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            paymentList: res.data.paymentList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /**
   * 回款中点击
  */
  paymentTap(e){
    this.setData({
      thisItem: e.target.dataset.num
    });
    let that = this;
    that.paymentList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementPaymentList', //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            paymentList: res.data.paymentList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });

  },
  /**
   * 投标中点击
  */
  investmentTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    });
    let that = this;
    that.investmentList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementInvestmentList', //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            investmentList: res.data.investmentList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /**
   * 已完成点击
  */
  completedTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    });
    let that = this;
    that.completedList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementCompletedList', //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            completedList: res.data.completedList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /***下拉刷新***/
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    if (this.data.thisItem == 1) {
      let that = this;
      that.paymentList = [];
      //数据加载
      wx.showLoading({
        title: "加载中...",
        icon: "loading"
      }),
        wx.request({
          url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementPaymentList', //接口地址
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              paymentList: res.data.paymentList
            });
            wx.hideLoading();
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        });
    } else if (this.data.thisItem == 2) {
      let that = this;
      that.investmentList = [];
      //数据加载
      wx.showLoading({
        title: "加载中...",
        icon: "loading"
      }),
        wx.request({
          url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementInvestmentList', //接口地址
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              investmentList: res.data.investmentList
            });
            wx.hideLoading();
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        });
    } else if (this.data.thisItem == 3) {
      let that = this;
      that.completedList = [];
      //数据加载
      wx.showLoading({
        title: "加载中...",
        icon: "loading"
      }),
        wx.request({
          url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/loanManagementCompletedList', //接口地址
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              completedList: res.data.completedList
            });
            wx.hideLoading();
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        });
    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})