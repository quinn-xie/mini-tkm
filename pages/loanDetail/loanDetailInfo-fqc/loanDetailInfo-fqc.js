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
    loanId:'',
    sfzzmPreviewImage:[],
    sfzfmPreviewImage: [],
    jksqbPreviewImage: [],
    dzqmsqsPreviewImage: [],
    jkfwxyPreviewImage: [],
    hzxyPreviewImage: [],
    ldbzcnsAPreviewImage: [],
    ldbzcnsBPreviewImage: []
  },
  
  /*** 身份证正面点击预览大图*/
  sfzzmPreviewImage(e) {
    var imgList = this.data.sfzzmPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 身份证反面点击预览大图*/
  sfzfmPreviewImage(e) {
    var imgList = this.data.sfzfmPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 借款申请表点击预览大图*/
  jksqbPreviewImage(e) {
    var imgList = this.data.jksqbPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 电子签名授权书点击预览大图*/
  dzqmsqsPreviewImage(e) {
    var imgList = this.data.dzqmsqsPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 借款服务协议点击预览大图*/
  jkfwxyPreviewImage(e) {
    var imgList = this.data.jkfwxyPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 合作协议点击预览大图*/
  hzxyPreviewImage(e) {
    var imgList = this.data.hzxyPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 连带保证承诺书1点击预览大图*/
  ldbzcnsAPreviewImage(e) {
    var imgList = this.data.ldbzcnsAPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 连带保证承诺书2点击预览大图*/
  ldbzcnsBPreviewImage(e) {
    var imgList = this.data.ldbzcnsBPreviewImage;
    wx.previewImage({
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
      //url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=4088&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=' + that.data.loanId +'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          var attachmentList = res.data.data.shenMaDetailVo.attachment;
          let sfzzm = attachmentList.attachmentSMIdentitycardPositiveImages;
          let sfzfm = attachmentList.attachmentSMIdentitycardNegativeImages;
          let jksqb = attachmentList.attachmentSMloanformImages;
          let dzqmsqs = attachmentList.attachmentSMEmpowermentofelectronicsignatureImages;
          let jkfwxy = attachmentList.attachmentSMLoanserviceAgreementImages;
          let hzxy = attachmentList.attachmentSMCooperationAgreementImages;
          let ldbzcnsA = attachmentList.attachmentSMSerialguarantee01Images;
          let ldbzcnsB = attachmentList.attachmentSMSerialguarantee02Images;
          //console.log(aa.length)
          if (sfzzm != null) {
            for (let i = 0; i < sfzzm.length; i++) {
              that.data.sfzzmPreviewImage.push(sfzzm[i].remoteAccessLocation)
            }
          }
          if (sfzfm != null) {
            for (let i = 0; i < sfzfm.length; i++) {
              that.data.sfzfmPreviewImage.push(sfzfm[i].remoteAccessLocation)
            };
          }
          if (jksqb != null) {
            for (let i = 0; i < jksqb.length; i++) {
              that.data.jksqbPreviewImage.push(jksqb[i].remoteAccessLocation)
            };
          }
          if (dzqmsqs != null) {
            for (let i = 0; i < dzqmsqs.length; i++) {
              that.data.dzqmsqsPreviewImage.push(dzqmsqs[i].remoteAccessLocation)
            };
          }
          if (jkfwxy != null) {
            for (let i = 0; i < jkfwxy.length; i++) {
              that.data.jkfwxyPreviewImage.push(jkfwxy[i].remoteAccessLocation)
            };
          }
          if (hzxy != null) {
            for (let i = 0; i < hzxy.length; i++) {
              that.data.hzxyPreviewImage.push(hzxy[i].remoteAccessLocation)
            };
          }
          if (ldbzcnsA != null) {
            for (let i = 0; i < ldbzcnsA.length; i++) {
              that.data.ldbzcnsAPreviewImage.push(ldbzcnsA[i].remoteAccessLocation)
            };
          }
          if (ldbzcnsB != null) {
            for (let i = 0; i < ldbzcnsB.length; i++) {
              that.data.ldbzcnsBPreviewImage.push(ldbzcnsB[i].remoteAccessLocation)
            };
          }
          that.setData({
            loadDetailInfo: {},
            loadDetailInfo: res.data.data.shenMaDetailVo
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