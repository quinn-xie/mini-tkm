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
    //只支持 http 或者 https 协议的网络图片地址,否则本地打不开预览图片
    imgList: ['../../../../images/commitmentLetter.jpg'] 
  },
  /**
   * 点击预览大图
   */
  previewImage:function (e) {
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
  onLoad: function (options) {
  
  }
})