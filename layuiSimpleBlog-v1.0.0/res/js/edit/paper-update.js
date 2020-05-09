import {dataFun} from '../util/systemTool.js';
// const baseUrl = "http://localhost:8080/blog";
// const baseUrl = "http://111.229.42.116:8080/blog";
const baseUrl = dataFun.getBaseUrl();
var paperupdate = new Vue({
    el: '#paperupdate',
    data: {
        msg: 'Hello World!',
        paper: {},
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'paperUpdate'
        }
    },
    mounted() {
        this.initDetail();
        this.initUserDate();
    },
    methods: {
        initDetail() {
            console.log(window.location.search);
            const pId = window.location.search.split("=")[1];
            const url = baseUrl + '/paper/getPaperById?id=' + pId;
            this.$http.get(url).then(function (res) {
                this.paper = res.data.data.paper;
            }, function () {
                console.log('请求失败处理');
            });
        },
        submit() {
            const pUrl = baseUrl + "/paper/goUpdate"
            this.$http.post(pUrl, this.paper, {emulateJson: true}).then(function (res) {
                document.write(res.body);
                window.location.href = "../table/paperTable.html"
            }, function (res) {
                console.log(res.status);
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
    }
});

