import {dataFun} from '../util/systemTool.js';
const baseUrl = dataFun.getBaseUrl();
var whisperapp = new Vue({
    el: '#whisperapp',
    data: {
        msg: 'Hello World!',
        messages: [{}],
        whispers: [{}],
        desc: "",
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'whisper'
        }
    },
    mounted() {
        this.initDetail();
        this.initUserDate();
    },
    methods: {
        submitFrom(id) {
            const url = baseUrl + '/message/whisperSaveMsg?msg=' + this.desc
                + "&whisperId=" + id;
            this.$http.get(url).then(function (res) {
                const url = baseUrl + '/whisper/getWhisper';
                this.$http.get(url).then(function (res) {
                    this.whispers = res.data.data.whispers;
                }, function () {
                    console.log('请求失败处理');
                });
                this.desc = "";
            }, function () {
                console.log('请求失败处理');
            });
        },

        initDetail() {
            const url = baseUrl + '/whisper/getWhisper';
            this.$http.get(url).then(function (res) {
                this.whispers = res.data.data.whispers;
            }, function () {
                console.log('请求失败处理');
            });
        },
        initUserDate() {
            this.user.ip = sessionStorage.getItem('ip')
            this.user.area = sessionStorage.getItem('area')
            this.user.brower = dataFun.GetCurrentBrowser()
            this.user.os = dataFun.GetOs()
            console.log(this.user);
            const pUrl = baseUrl + "/visitor/doAdd"
            this.$http.post(pUrl, this.user, {emulateJson: true}).then(function (res) {
                // window.location.href = "";
            }, function (res) {
                console.log(res.status);
            });
        }
    },
});


