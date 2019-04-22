//app.js
App({
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
    //获取设备信息
    this.getSystemInfo();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
  },
  hidetabbar1() {
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#808080",
      "selectedColor": "#2994E6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "../images/index.png",
          "selectedIconPath": "../images/index-selected.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/customer/customer",
          "iconPath": "../images/customer.png",
          "selectedIconPath": "icon/icon_home_HL.png",
          "text": "客服"
        },
        {
          "pagePath": "/pages/delivery/delivery",
          "iconPath": "../images/delivery.png",
          "isSpecial": true,
          "text": "信息发布"
        },
        {
          "pagePath": "/pages/shop/shop",
          "iconPath": "../images/shop.png",
          "selectedIconPath": "../images/shop-selected.png",
          "text": "商城"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "../images/mine.png",
          "selectedIconPath": "../images/mine-selected.png",
          "text": "我的"
        },
      ]
    }
  }
})