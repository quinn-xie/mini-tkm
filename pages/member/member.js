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
const { $Message } = require('../../dist/base/index');
var app = getApp()
Page({
  data: {
    userName: '',
    userPassword: '',
    token: '',//方便存在本地的locakStorage  
    response: '' //存取返回数据  
  },
  onReady(){
    
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  logIn: function () {
    var that = this;
    if (that.data.userName === "" || that.data.userName == null){
      $Message({ content: '请输入用户名', type: 'warning'});
      return;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(that.data.userName))) {
      $Message({ content: '用户名格式不正确', type: 'warning'});
      return;
    }
    if (that.data.userPassword === "" || that.data.userName == null) {
      $Message({ content: '请输入密码', type: 'warning'});
      return;
    }
    wx.showLoading({title: '登录中...'});
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/login?userName=' + that.data.userName + '&password=' + that.data.userPassword+'&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      data: {
        username: this.data.userName,
        password: this.data.userPassword
      },
      method: 'POST',
      success: function (res) {
        //console.log(res);
        wx.hideLoading();
        if (res.data.responseCode != 200){
          $Message({ content: res.data.responseMsg, type: 'error', duration:3});
          return;
        }else{
          console.log(res);
          that.setData({
            token: res.header.Token,
            response: res
          })
          //console.log(res.header.Token)
          //将 data 存储在本地缓存中指定的
          try {
            wx.setStorageSync('token', res.header.Token)
            wx.switchTab({
              url: '/pages/member/mainInfo/mainInfo'
            });
          } catch(e) {
          }


        }
        
      },
      fail: function (res) {
        //$Message({ content: res.data.responseMsg, type: 'error', duration:3});
      }
    })
  }
})  