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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealRecordsList:[]
  },
 /**
  * 数据加载
  */
  loadDate(){
    let that = this;
    that.dealRecordsList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
        url: "https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/dealRecordsList", //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            dealRecordsList: [],
            dealRecordsList: res.data.dealRecordsList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDate();
  },
  /***下拉刷新***/
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadDate();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
})