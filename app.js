App({
    onLaunch() {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (res) => {
                            this.globalData.userInfo = res.userInfo;
                        }
                    });
                }
            }
        });
        // 检查更新
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {});
        updateManager.onUpdateReady(function() {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                }
            })
        });
        updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            console.log('update error')
        })
    },
    globalData: {
        userInfo: null
    }
})