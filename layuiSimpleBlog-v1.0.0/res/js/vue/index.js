import {dataFun} from '../util/systemTool.js'
const baseUrl = dataFun.getBaseUrl();
window.onload = function () {
    var paperapp = new Vue({
        el: '#paperapp',
        data: {
            msg: 'Hello World!',
            papers: [{}],
            user: {
                ip: '1.1.1.1',
                area: '北京市',
                brower: 'chrome',
                os: 'windows7',
                action: 'paper'
            },
            title: null,
            pv: 0,
            uv: 0,
            paperSize: 0,
            loginUser: "user"
        },
        mounted() {
            this.initPaper();
            this.initUserDate();
            this.getInitPvUv();
            this.getLoginUser();
        },
        methods: {
            initPaper() {
                //发送get请求
                let url = "";
                if (this.title == null) {
                    url = baseUrl + "/paper/getPaper";
                } else {
                    url = baseUrl + "/paper/getPaper?title=" + this.title;
                }

                this.$http.get(url).then(function (res) {
                    this.papers = res.data;
                    const date = new Date();
                    const year = date.getFullYear();
                    const mon = change(date.getMonth() + 1);
                    const day = change(date.getDate());
                    const dateStr = year + "-" + mon + "-" + day;
                    console.log(dateStr);
                    for (let paper of res.data) {
                        if (paper.createDate.indexOf(dateStr) != -1) {
                            paper.createDate = 'new';
                        } else {
                            paper.createDate = 'old';
                        }
                    }
                    function change(t) {
                        if (t < 10) {
                            return "0" + t;
                        } else {
                            return t;
                        }
                    }
                }, function () {
                    console.log('请求失败处理');
                });
            },
            getLoginUser() {
                const loginUserUrl = baseUrl + "/user/loginUser";
                this.$http.get(loginUserUrl).then(function (re) {
                    console.log(re.data);
                    this.loginUser = re.data.loginUser;
                },function () {
                    console.log("失败");
                });

            },
            getUrl(id) {
                return "details.html?id=" + id;
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
            },
            getInitPvUv() {
                const url = baseUrl + "/paper/getPaperCount"
                this.$http.get(url).then(function (res) {
                    this.paperSize = res.data.data[0].pv;
                    console.log(res.data);
                }, function () {
                    console.log('请求失败处理');
                });

                const url2 = baseUrl + "/visitor/getPvUv"
                this.$http.get(url2).then(function (res) {
                    this.pv = res.data.data[0].pv;
                    this.uv = res.data.data[0].uv;
                    console.log(res.data);
                }, function () {
                    console.log('请求失败处理');
                });
            }
        }
    });
}