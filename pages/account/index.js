import { fetch } from "../../utils/request";
const app = getApp();
Page({
    data: {
        isAuth: false
    },
    onLoad() {
        wx.getSetting({
            success: ({ authSetting }) => {
                if (authSetting["scope.userInfo"]) {
                    this.setData({
                        isAuth: true,
                    });
                }
            },
        });
    },
    getUserInfoFun(e) {
        const { userInfo } = e.detail;
        if (userInfo) {
            app.globalData.userInfo = userInfo;
            this.loginFun();
        }
    },
    loginFun() {
        wx.login({
            success: res => {
                if (res.code) {
                    fetch({
                        url: '/api/demo',
                        data: {
                            code: res.code,
                            userInfo: app.globalData.userInfo
                        }
                    }).then(({ data }) => {
                        wx.setStorageSync("userInfo", data);
                        wx.setStorageSync("token", token);
                    });
                }
            }
        });
    }
});