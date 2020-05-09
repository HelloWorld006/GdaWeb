import {dataFun} from '../util/systemTool.js';
const baseUrl = dataFun.getBaseUrl();
var detailapp = new Vue({
    el: '#detailapp',
    data: {
        msg: 'Hello World!',
        paper: {},
        messages: [{}],
        desc: "",
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'detail'
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
            const url = baseUrl + '/message/paperSaveMsg?msg=' + this.desc
                + "&paperId=" + this.paper.id;
            console.log(url);
            this.$http.get(url).then(function (res) {
                const url2 = baseUrl + '/paper/getPaperById?id=' + this.paper.id;
                this.$http.get(url2).then(function (res) {
                    this.paper = res.data.data.paper;
                    this.messages = res.data.data.message;
                }, function () {
                    console.log('请求失败处理');
                });
                this.desc = "";
            }, function () {
                console.log('请求失败处理');
            });
        },
        //前一页
        before(num) {
            const url = baseUrl + '/paper/getPaperByBeforeOrAfter?action=before&num=' + num;
            this.$http.get(url).then(function (res) {
                this.paper = res.data.data.paper;
                this.messages = res.data.data.message;
            }, function () {
                console.log('请求失败处理');
            });
        },
        //下一页
        after(num) {
            const url = baseUrl + '/paper/getPaperByBeforeOrAfter?action=after&num=' + num;
            this.$http.get(url).then(function (res) {
                this.paper = res.data.data.paper;
                this.messages = res.data.data.message;
            }, function () {
                console.log('请求失败处理');
            });
        },
        initDetail() {
            const pId = window.location.search.split("=")[1];
            const url = baseUrl + '/paper/getPaperById?id=' + pId;
            this.$http.get(url).then(function (res) {
                this.paper = res.data.data.paper;
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


