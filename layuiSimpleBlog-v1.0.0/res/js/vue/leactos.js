import {dataFun} from '../util/systemTool.js';
const baseUrl = dataFun.getBaseUrl();
var leacotsapp = new Vue({
    el: '#leacotsapp',
    data: {
        msg: 'Hello World!',
        messages: [{}],
        desc: "",
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'message'
        }
    },
    mounted() {
        this.initDetail();
        this.initUserDate();
    },
    computed: {
        msgSize: function () {
            const num = this.messages.length;
            return num;
        }
    },
    methods: {
        submitFrom() {
            const url = baseUrl + '/message/saveMsg?msg=' + this.desc;
            this.$http.get(url).then(function (res) {
                const urls = baseUrl + '/message/getMessage';
                this.$http.get(urls).then(function (res) {
                    this.messages = res.data.data.message;
                }, function () {
                    console.log('请求失败处理');
                });
                this.desc = "";
            }, function () {
                console.log('请求失败处理');
            });
        },

        initDetail() {
            const url = baseUrl + '/message/getMessage';
            this.$http.get(url).then(function (res) {
                this.messages = res.data.data.message;
            }, function () {
                console.log('请求失败处理');
            });
        },
        initUserDate() {
            this.user.ip = sessionStorage.getItem('ip')
            this.user.area = sessionStorage.getItem('area')
            this.user.brower = dataFun.GetCurrentBrowser()
            this.user.os = dataFun.GetOs()
            const pUrl = baseUrl + "/visitor/doAdd"
            this.$http.post(pUrl, this.user, {emulateJson: true}).then(function (res) {
                // window.location.href = "";
            }, function (res) {
                console.log(res.status);
            });
        }
    },
});


