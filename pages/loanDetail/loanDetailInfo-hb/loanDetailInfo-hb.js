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
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadDetailInfo:{},
    loanId:''
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
      url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=1358&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      //url: 'https://qianduan-uat.taikongma.com/mobile/app/loansign/infomation?loanSignId=' + that.data.loanId +'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          let overview = res.data.data.loanDetail.overview.replace(/<br \/>|<br>/ig, "\n");
          let repaymentDescription = res.data.data.loanDetail.repaymentDescription.replace(/<br \/>|<br>/ig, "\n");
          let guaranteeDescription = res.data.data.loanDetail.guaranteeDescription.replace(/<br \/>|<br>/ig, "\n");
          let riskDescription = res.data.data.loanDetail.riskDescription.replace(/<br \/>|<br>/ig, "\n");
          let mortgageObjectDetail = that.convertHtmlToText(res.data.data.loanDetail.mortgageObjectDetail);
          console.log(res.data.data.loanDetail)
          that.setData({
            loadDetailInfo: {},
            loadDetailInfo: res.data.data.loanDetail,
            'loadDetailInfo.overview': overview,
            'loadDetailInfo.repaymentDescription': repaymentDescription,
            'loadDetailInfo.guaranteeDescription': guaranteeDescription,
            'loadDetailInfo.riskDescription': riskDescription,
            'loadDetailInfo.mortgageObjectDetail': mortgageObjectDetail,
          });
          console.log(that.data.loadDetailInfo)
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
  
  //转HTML为Text
  convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  }
})

