// import { fetch } from '../../utils/request';
Page({
    data: {
        formData: {
            mobile: '',
            code: '',
        },
        count: 0
    },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        });
    },
    sendCodeHandle() {
        this.setData({
            count: 60
        }, this.setCountFun);
    },
    setCountFun() {
        if (this.data.count > 0) {
            setTimeout(() => {
                this.setData({
                    count: this.data.count - 1
                }, this.setCountFun)
            }, 1000);
        }
    },
    submitHandleFun() {  }
});