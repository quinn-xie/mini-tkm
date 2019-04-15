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
////////////////////我的奖励////////////////////
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redPackets: "红包奖励",
    invitation: "邀请奖励",
    myTKMcoin: "我的太空币",
    thisItem: "1",
    redPackList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.redPackList = [];
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.easy-mock.com/mock/5b0bbb9557fbcf7910d25380/example/myRewardredPackList', //接口地址
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            redPackList: res.data.redPackList
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
  },
  /**
   * 红包奖励点击
   */
  redPacketsTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    });
  },
  /**
   * 邀友奖励点击
   */
  invitationTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    });
  },
  /**
   * 我的太空币点击
   */
  myTKMcoinTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    });
  }
})