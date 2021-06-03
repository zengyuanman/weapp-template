import { HOST } from '../config/config';

function fetch(opt) {
    return new Promise((resolve, reject) => {
        let isOutTime = true;

        if (opt.loading) {
            wx.showLoading();
        }
        if (!opt.url.startsWith('http')) {
            opt.url = `${HOST}` + opt.url;
        }
        const token = wx.getStorageSync('token') || '';
        wx.request({
            ...opt,
            header: {
                ...opt.header,
                token: token
            },
            success: (res) => {
                isOutTime = false;
                const { code, msg } = res.data;
                switch (code) {
                    case 1:
                    case '1':
                    case 'ok':
                        resolve(res.data);
                        break;
                    case 401:
                    case 403:
                        wx.redirectTo({
                            url: "/pages/account/index",
                        });
                        reject(res.data);
                        break;
                    default:
                        wx.showToast({
                            title: msg,
                            icon: 'none',
                            duration: 1000
                        });
                        reject(res.data);
                        break;
                }
            },
            fail: (error) => {
                wx.showModal({
                    title: '提示',
                    content: '网络异常',
                    showCancel: false,
                    success: (res) => {}
                });
                reject(error);
            },
            complete: () => {
                wx.hideLoading();
                if (isOutTime) {
                    wx.showToast({
                        title: '请求超时！',
                        icon: 'loading',
                        duration: 1000
                    });
                }
                isOutTime = true;
                wx.stopPullDownRefresh();
            }
        });
    });
}
module.exports = {
    fetch,
    uploadFile(opt) {
        const token = wx.getStorageSync('token') || '';
        opt.header = {
            ...opt.header,
            token: token
        };
        opt.url = `${HOST}${opt.url}`
        return wx.uploadFile(opt)
    }
}