import {dataFun} from '../util/systemTool.js'
const baseUrl = dataFun.getBaseUrl();
var aboutapp = new Vue({
    el: '#aboutapp',
    data: {
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'about'
        },
        loginUser: "user"
    },
    mounted() {
        this.initUserDate();
        this.getLoginUser();
    },
    methods: {
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
        getLoginUser() {
            const loginUserUrl = baseUrl + "/user/loginUser";
            this.$http.get(loginUserUrl).then(function (re) {
                console.log(re.data);
                this.loginUser = re.data.loginUser;
            },function () {
                console.log("失败");
            });

        },
        loginOut() {
            const loginOut = baseUrl + "/user/loginOut";
            this.$http.get(loginOut).then(function (res) {
                window.location.href = "about.html";
            },function () {

            })
        }
    },


});


