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
// 项目详情---项目信息
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadDetailInfo:{},
    imgList: [],
    loanId:''
  },
  /**
   * 点击预览大图
   */
  previewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgList = this.data.imgList;
    wx.previewImage({
      current: imgList[index],  //当前图片地址
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      loanId: options.loanId
    });
    this.loadData();
  },
  //数据加载
  loadData() {
    let that = this;
    that.loadDetailInfo = {};
    //数据加载
    wx.showLoading({
      title: "加载中...",
      icon: "loading"
    }),
      wx.request({
      //url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=1370&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=' + that.data.loanId +'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {'content-type': 'application/json'},
        success: function(res) {
          console.log(res.data.data)
          that.setData({
            loadDetailInfo: {},
            loadDetailInfo: res.data.data.billDetail,
            imgList: [res.data.data.billDetail.attachmentBillFrontImage]
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
  }
})