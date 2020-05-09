import {dataFun} from '../util/systemTool.js'
// const baseUrl = "http://localhost:8080/blog";
// const baseUrl = "http://111.229.42.116:8080/blog";
const baseUrl = dataFun.getBaseUrl();
layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#visitorTable'
        , height: 500
        , url: baseUrl + '/visitor/goList' //数据接口
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        , cols: [[
            {field: 'ip', title: 'ip', width: 180, sort: true, fixed: true}
            , {field: 'area', title: '地区', width: 180}
            , {field: 'brower', title: '访问浏览器', width: 180}
            , {field: 'os', title: '系统', width: 180}
            , {field: 'action', title: '操作', width: 100}
            , {field: 'date', title: '创建时间', width: 180}
        ]]
        , even: true
        , page: true //是否显示分页
        , limits: [3, 5, 10, 20]
        , limit: 10 //每页默认显示的数量
    });
});
layui.use('table', function () {
    var table = layui.table;
    //第一个实例
    table.render({
        elem: '#ipActionTable'
        , height: 500
        , url: baseUrl + '/visitor/goListForIpAction' //数据接口
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        , cols: [[
            {field: 'ip', title: 'ip', width: 200, sort: true, fixed: true}
            , {field: 'action', title: '操作', width: 180}
            , {field: 'pv', title: '访问次数', width: 180}
            , {field: 'create_date', title: '创建时间', width: 180}
        ]]
        , even: true
        , page: true //是否显示分页
        , limits: [3, 5, 10, 20]
        , limit: 10 //每页默认显示的数量
    });
});

window.onload = function () {
    var visitortableapp = new Vue({
        el: '#visitortableapp',
        data: {
            user: {
                ip: '1.1.1.1',
                area: '北京市',
                brower: 'chrome',
                os: 'windows7',
                action: 'visitorTable'
            }
        },
        mounted() {
            this.initUserDate();
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
            }
        }
    });
};