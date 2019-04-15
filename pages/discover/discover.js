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
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data:{
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理-点击BANNER进入详情页面
  goToDetail(e) {
    //console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../webview/webview?url=' + url
    })
  },
  //加载BANNER数据
  onLoad(){
    let that = this;
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/mainpage?_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          imgUrls: res.data.data.bannerList
        });
      },
      fail(err) { },//请求失败
      complete() { }//请求完成后执行的函数
    });
  }
})