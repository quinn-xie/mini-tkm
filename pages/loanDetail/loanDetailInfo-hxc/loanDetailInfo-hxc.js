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
    sfzzmPreviewImage: [],
    sfzfmPreviewImage: [],
    jksqbPreviewImage: [],
    jydPreviewImage: [],
    wcxgxxPreviewImage: [],
    zxbgPreviewImage: [],
    qyzpPreviewImage: [],
    yhkPreviewImage: [],
    hzxyPreviewImage: [],
    yyzzPreviewImage: []
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
  /*** 决议单点击预览大图*/
  jydPreviewImage(e) {
    var imgList = this.data.jydPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 网查相关信息点击预览大图*/
  wcxgxxPreviewImage(e) {
    var imgList = this.data.wcxgxxPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 征信报告点击预览大图*/
  zxbgPreviewImage(e) {
    var imgList = this.data.zxbgPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 签约照片点击预览大图*/
  qyzpPreviewImage(e) {
    var imgList = this.data.qyzpPreviewImage;
    wx.previewImage({
      urls: imgList,            //所有要预览的图片的地址集合 数组形式
    })
  },
  /*** 银行卡点击预览大图*/
  yhkPreviewImage(e) {
    var imgList = this.data.yhkPreviewImage;
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
  /*** 营业执照点击预览大图*/
  yyzzPreviewImage(e) {
    var imgList = this.data.yyzzPreviewImage;
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
      //url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=4771&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', 
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=' + that.data.loanId +'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          //console.log(res.data.data.hxylDetailVo)
          var attachmentList = res.data.data.hxylDetailVo.attachment;
          let sfzzm = attachmentList.attachmentSMIdentitycardPositiveImages;
          let sfzfm = attachmentList.attachmentSMIdentitycardNegativeImages;
          let jksqb = attachmentList.attachmentSMloanformImages;
          let jyd = attachmentList.attachment_RESOLUTION_SINGLE;
          let wcxgxx = attachmentList.attachment_CHECK_NET;
          let zxbg = attachmentList.attachment_CREDIT_REPORT;
          let qyzp = attachmentList.attachment_SIGNING_PHOTOS;
          let yhk = attachmentList.attachment_BANK_CARD;
          let hzxy = attachmentList.attachmentSMCooperationAgreementImages;
          let yyzz = attachmentList.attachmentSMBusinessLicenseImages;
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
          if (jyd != null) {
            for (let i = 0; i < jyd.length; i++) {
              that.data.jydPreviewImage.push(jyd[i].remoteAccessLocation)
            };
          }
          if (wcxgxx != null) {
            for (let i = 0; i < wcxgxx.length; i++) {
              that.data.wcxgxxPreviewImage.push(wcxgxx[i].remoteAccessLocation)
            };
          }
          if (zxbg != null) {
            for (let i = 0; i < zxbg.length; i++) {
              that.data.zxbgPreviewImage.push(zxbg[i].remoteAccessLocation)
            };
          }
          if (qyzp != null) {
            for (let i = 0; i < qyzp.length; i++) {
              that.data.qyzpPreviewImage.push(qyzp[i].remoteAccessLocation)
            };
          }
          if (yhk != null) {
            for (let i = 0; i < yhk.length; i++) {
              that.data.yhkPreviewImage.push(yhk[i].remoteAccessLocation)
            };
          }
          if (hzxy != null) {
            for (let i = 0; i < hzxy.length; i++) {
              that.data.hzxyPreviewImage.push(hzxy[i].remoteAccessLocation)
            };
          }
          if (yyzz != null) {
            for (let i = 0; i < yyzz.length; i++) {
              that.data.yyzzPreviewImage.push(yyzz[i].remoteAccessLocation)
            };
          }

          that.setData({
            loadDetailInfo: {},
            loadDetailInfo: res.data.data.hxylDetailVo
          });

          //console.log(that.data.imglist)
          
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
  /***加载附件***/
})